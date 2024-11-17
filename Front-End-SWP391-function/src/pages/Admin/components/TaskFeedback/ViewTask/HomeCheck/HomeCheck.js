import classNames from 'classnames/bind';
import styles from './HomeCheck.module.scss';
import React, { useState } from 'react';
import api from '~/config/axios';
import { Image, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import uploadFile from '~/utils/Upload';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function HomeCheck({ taskID }) {
    const [starHover, setStarHover] = useState({});
    const [openHomeCheck, setOpenHomeCheck] = useState(false);
    const [formData, setFormData] = useState({
        content: '',
        images: [],
        rating: {
            livingSpace: '',
            familyIncome: '',
            petExperience: '',
            familyStability: '',
            timeCommitment: '',
        },
    });

    //image
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleFileChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    // end image

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.rating) {
            setFormData((prevData) => ({
                ...prevData,
                rating: {
                    ...prevData.rating,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };


    const handleCreateFeedback = async (e) => {
        e.preventDefault();

        const uploadedUrls = await Promise.all(
            fileList.map(async (file) => {
                if (file.originFileObj) {
                    const url = await uploadFile(file.originFileObj);
                    console.log('Uploaded URL:', url);
                    return url;
                }
                return null;
            }),
        );

        const validUrls = uploadedUrls.filter(Boolean);

        const updatedData = {
            content: formData.content,
            images: validUrls,
            rating: formData.rating,
        };
        console.log('update form data', updatedData);

        const token = localStorage.getItem('token');

        try {
            const response = await api.post(`feedbacks/task/${taskID}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('send homecheck', response.data);
            toast.success('Submit Home Check Form Successfully');
        } catch (error) {
            console.error(error);
            toast.error('Fail To Submit Home Check Form');
        }
    };

    const formatLabel = (string) => {
        return string.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    };

    return (
        <>
            {!openHomeCheck ? (
                <Button
                    primary
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenHomeCheck(true);
                    }}
                >
                    Home Check
                </Button>
            ) : (
                <>
                    <ToastContainer />
                    <div className={cx('wrapper')}>
                        <p className={cx('title')}>
                            <b>Home Check</b>
                        </p>
                        <form onSubmit={handleCreateFeedback}>
                            <div className={cx('home-check-input-wrap')}>
                                <div className={cx('form-rating')}>
                                    {[
                                        'livingSpace',
                                        'familyIncome',
                                        'petExperience',
                                        'familyStability',
                                        'timeCommitment',
                                    ].map((field) => (
                                        <div className={cx('living-item')} key={field}>
                                            <label htmlFor={field}>
                                                <b>{formatLabel(field)}</b>
                                            </label>
                                            <div className={cx('stars')}>
                                                {[...Array(5)].map((star, index) => {
                                                    const currentRating = index + 1;
                                                    return (
                                                        <label key={index}>
                                                            <input
                                                                type="radio"
                                                                name={field}
                                                                value={currentRating}
                                                                onChange={() => {
                                                                    setFormData((prevData) => ({
                                                                        ...prevData,
                                                                        rating: {
                                                                            ...prevData.rating,
                                                                            [field]: currentRating,
                                                                        },
                                                                    }));
                                                                }}
                                                                style={{ display: 'none' }}
                                                            />
                                                            <FontAwesomeIcon
                                                                icon={faStar}
                                                                className={cx('star-icon')}
                                                                color={
                                                                    currentRating <=
                                                                    (starHover[field] || formData.rating[field])
                                                                        ? 'gold'
                                                                        : 'grey'
                                                                }
                                                                onMouseEnter={() =>
                                                                    setStarHover((prev) => ({
                                                                        ...prev,
                                                                        [field]: currentRating,
                                                                    }))
                                                                }
                                                                onMouseLeave={() =>
                                                                    setStarHover((prev) => ({ ...prev, [field]: null }))
                                                                }
                                                            />
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className={cx('home-check-right')}>
                                    <div className={cx('form-image')}>
                                        <div className={cx('upload-image')}>
                                            <label htmlFor="images">
                                                <b>Images</b>
                                            </label>
                                            <Upload
                                                listType="picture-card"
                                                fileList={fileList}
                                                onPreview={handlePreview}
                                                onChange={handleFileChange}
                                            >
                                                {fileList.length >= 5 ? null : uploadButton}
                                            </Upload>
                                        </div>
                                    </div>

                                    <div className={cx('form-input')}>
                                        <label htmlFor="content">
                                            <b>Content</b>
                                        </label>
                                        <textarea
                                            id="content"
                                            name="content"
                                            value={formData.content}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex' }}>
                                <Button mgRight10 primary medium type="submit">
                                    Submit
                                </Button>
                                <Button
                                    outline
                                    medium
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpenHomeCheck(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>

                        {previewImage && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default HomeCheck;

{
    /* <div className={cx('form-rating')}>
                    <div className={cx('living-item')}>
                        <label htmlFor="livingSpace">Living Space</label>
                        <input
                            type="number"
                            id="livingSpace"
                            name="livingSpace"
                            max="5"
                            value={formData.livingSpace}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('living-item')}>
                        <label htmlFor="familyIncome">Family Income</label>
                        <input
                            type="number"
                            id="familyIncome"
                            name="familyIncome"
                            max="5"
                            value={formData.familyIncome}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('living-item')}>
                        <label htmlFor="petExperience">Pet Experience</label>
                        <input
                            type="number"
                            id="petExperience"
                            name="petExperience"
                            max="5"
                            value={formData.petExperience}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('living-item')}>
                        <label htmlFor="familyStability">Family Stability</label>
                        <input
                            type="number"
                            id="familyStability"
                            name="familyStability"
                            max="5"
                            value={formData.familyStability}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('living-item')}>
                        <label htmlFor="timeCommitment">Time Commitment</label>
                        <input
                            type="number"
                            id="timeCommitment"
                            name="timeCommitment"
                            max="5"
                            value={formData.timeCommitment}
                            onChange={handleChange}
                        />
                    </div>
                </div> */
}
