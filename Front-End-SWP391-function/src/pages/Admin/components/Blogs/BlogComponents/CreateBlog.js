import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '~/config/axios';
import { storage } from '~/config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './CreateBlog.scss';
import AddTag from '../../VolunteerTask/components/AddTag/AddTag';
import Select from 'react-select';

const CreateBlog = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        nickname: '', // Add nickname to formData
        category: 'ADOPTION',
        tags: [{ name: 'Post' }], // Mặc định có tag "post"
        images: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRoles');
    const [tagData, setTagData] = useState([]);
    const [showAddTag, setShowAddTag] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Lấy tag từ API
    const getAllTags = async () => {
        try {
            const response = await api.get('tags', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const tags = response.data.result.map((tag) => ({
                value: tag.name,
                label: tag.name,
            }));
            setTagData(tags);
        } catch (error) {
            toast.error('Failed to load tags');
        }
    };

    const handleEditorChange = (content) => {
        setFormData((prevData) => ({
            ...prevData,
            content: content,
        }));
    };

    const handleTagsChange = (selectedOptions) => {
        setFormData((prevData) => ({
            ...prevData,
            tags: selectedOptions.map((option) => ({
                name: option.value,
            })),
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prevData) => ({
            ...prevData,
            images: files,
        }));
    };

    const uploadImagesToFirebase = async () => {
        const urls = await Promise.all(
            formData.images.map(async (image) => {
                const imageRef = ref(storage, `blogs/${image.name}`);
                await uploadBytes(imageRef, image);
                return getDownloadURL(imageRef);
            }),
        );
        return urls;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error('You need to log in first');
            return;
        }

        setIsSubmitting(true);

        try {
            // Upload images to Firebase and get URLs
            const imageUrls = await uploadImagesToFirebase();

            // Prepare JSON object to send
            const dataToSend = {
                title: formData.title,
                description: formData.description,
                content: formData.content,
                nickname: formData.nickname,
                category: formData.category,
                tags: formData.tags,
                images: imageUrls,
            };

            // Send data to backend
            const response = await api.post('/posts', dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.code === 201) {
                toast.success('Create post successfully');
            } else {
                toast.error('Failed to create post');
            }
        } catch (error) {
            toast.error(`Error: ${error.message || 'Something went wrong'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleToggleAddTag = () => {
        setShowAddTag((prev) => !prev); // Chuyển đổi trạng thái hiển thị popup
    };

    const handleClosePopup = () => {
        setShowAddTag(false); // Đóng popup
    };

    useEffect(() => {
        getAllTags();
    }, []);

    return (
        <div className="create-blog-container">
            <h2>Create a New Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="createBlog_form_input_tag">
                    <label htmlFor="tags">Tags</label>
                    <Select
                        id="tags"
                        name="tags"
                        isMulti
                        onChange={handleTagsChange}
                        value={formData.tags.map((tag) => ({
                            value: tag.name,
                            label: tag.name,
                        }))}
                        options={tagData}
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                width: '100%', // Thiết lập chiều dài cho select
                                minWidth: '300px', // Chiều dài tối thiểu nếu cần
                            }),
                            menu: (provided) => ({
                                ...provided,
                                zIndex: 9999,
                            }),
                            multiValue: (provided) => ({
                                ...provided,
                                backgroundColor: '#e0e0e0', // Thay đổi màu nền của các giá trị đã chọn (tùy chọn)
                            }),
                        }}
                    />
                </div>
                <div className="createBlog_form_input_title">
                    <label>Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="createBlog_form_input_description">
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="createBlog_form_input_nickname">
                    <label>Nickname</label>
                    <input
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        placeholder="Enter your nickname"
                    />
                </div>
                {/* <div className="createBlog_form_input_tag">
                    <label>Tags</label>
                    <input
                        type="text"
                        placeholder="Comma separated tags"
                        value={formData.tags.map((tag) => tag.name).join(', ')}
                        onChange={handleTagsChange}
                    />
                </div> */}

                <div className="createBlog_form_input_images">
                    <label>Images</label>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
                </div>
                <div className="createBlog_form_input_content">
                    <Editor
                        apiKey="llhl5dg6g4afdo293thlykxzzhwr3tf0vt2padr5bze8bnst"
                        value={formData.content}
                        onEditorChange={handleEditorChange}
                        init={{
                            height: 500,
                            menubar: false,
                        }}
                    />
                </div>

                <button className="blogCreate_btn" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Create Post'}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CreateBlog;
