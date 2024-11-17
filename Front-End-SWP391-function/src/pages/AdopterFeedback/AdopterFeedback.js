import classNames from 'classnames/bind';
import styles from './AdopterFeedback.module.scss';
import React, { useEffect, useState } from 'react';
import api from '~/config/axios';
import { Image, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import uploadFile from '~/utils/Upload';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function AdopterFeedback() {
    const [singlePet, setSinglePet] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        petStatus: 'GREAT_ADJUSTING_WELL',
        challenges: 'NO_CHALLENGES',
        medicalRecommendation: 'NO_CONCERNS',
        behavioralChanges: 'CALM',
        activityLevel: 'LOW',
        foodType: 'DRY_FOOD',
        additionalNotes: '',
        petName: '',
    });
    const [selectedValues, setSelectedValues] = useState({});

    const handleTakePetById = async () => {
        try {
            const response = await api.get(`pets/${id}`, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            console.log('pet info', response.data);
            setSinglePet(response.data);
            setFormData((prev) => ({
                ...prev,
                petName: response.data.petName,
            }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log('id lay dc ne', id);
        handleTakePetById();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token');
        e.preventDefault();

        const submissionData = { ...formData };
        console.log(submissionData);

        try {
            const response = await api.post('adoptionFeedbacks', submissionData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('adopter send feedback', response.data);
            toast.success('Send feedback successfully');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div className={cx('wrapper-form')}>
                {singlePet !== null ? (
                    <p className={cx('title')}>
                        <b>Adopter Feedback for {singlePet.petName}</b>
                    </p>
                ) : null}

                <form onSubmit={handleSubmit}>
                    <p>
                        <b>Do you have any challenges with your pet? Let us know!</b>
                    </p>
                    <div className={cx('form-item')}>
                        <label htmlFor="petStatus">Pet Status</label>
                        <select id="petStatus" name="petStatus" value={formData.petStatus} onChange={handleChange}>
                            <option value="GREAT_ADJUSTING_WELL">Great Adjusting Well</option>
                            <option value="GOOD_ADJUSTING">Good Adjusting</option>
                            <option value="NEUTRAL">Neutral</option>
                            <option value="POOR_NOT_ADJUSTING">Poor Not Adjusting</option>
                        </select>
                    </div>
                    <div className={cx('form-item')}>
                        <label htmlFor="challenges">Challenges</label>
                        <select id="challenges" name="challenges" value={formData.challenges} onChange={handleChange}>
                            <option value="NO_CHALLENGES">No Challenges</option>
                            <option value="AGGRESSION_TOWARD_PEOPLE">Aggression Toward People</option>
                            <option value="ANIMAL_AGGRESSION">Animal Aggression</option>
                            <option value="BARKING">Barking</option>
                            <option value="DESTRUCTIVE_CHEWING">Destructive Chewing</option>
                            <option value="FEAR_TIMIDITY">Fear Timidity</option>
                            <option value="FOOD_GUARDING">Food Guarding</option>
                            <option value="FURNITURE_SCRATCHING">Furniture Scratching</option>
                        </select>
                    </div>
                    <div className={cx('form-item')}>
                        <label htmlFor="medicalRecommendation">Medical Recommendation</label>
                        <select
                            id="medicalRecommendation"
                            name="medicalRecommendation"
                            value={formData.medicalRecommendation}
                            onChange={handleChange}
                        >
                            <option value="NO_CONCERNS">No Concerns</option>
                            <option value="BASIC_CARE_QUESTIONS">Basic Care Questions</option>
                            <option value="MONITOR_AT_HOME">Monitor At Home</option>
                            <option value="SCHEDULE_SHELTER_VET">Schedule Shelter Vet</option>
                            <option value="SCHEDULE_ALTERNATIVE_VET">Schedule Alternative Vet</option>
                        </select>
                    </div>
                    <div className={cx('form-item')}>
                        <label htmlFor="behavioralChanges">Behavior Changes</label>
                        <select
                            id="behavioralChanges"
                            name="behavioralChanges"
                            value={formData.behavioralChanges}
                            onChange={handleChange}
                        >
                            <option value="CALM">Calm</option>
                            <option value="AGGRESSIVE">Aggressive</option>
                            <option value="ANXIOUS">Anxious</option>
                            <option value="PLAYFUL">Playful</option>
                            <option value="SHY">Shy</option>
                            <option value="NEUTRAL">Neutral</option>
                        </select>
                    </div>
                    <div className={cx('form-item')}>
                        <label htmlFor="activityLevel">Activity Level</label>
                        <select
                            id="activityLevel"
                            name="activityLevel"
                            value={formData.activityLevel}
                            onChange={handleChange}
                        >
                            <option value="LOW">Low</option>
                            <option value="MODERATE">Moderate</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>
                    <div className={cx('form-item')}>
                        <label htmlFor="foodType">Food Type</label>
                        <select id="foodType" name="foodType" value={formData.foodType} onChange={handleChange}>
                            <option value="DRY_FOOD">Dry Food</option>
                            <option value="WET_FOOD">Wet Food</option>
                            <option value="RAW_FOOD">Raw Food</option>
                            <option value="HOMEMADE">Homemade</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    <div className={cx('form-text')}>
                        <label htmlFor="content">
                            <b>Tell us more!</b>
                        </label>
                        <textarea
                            id="additionalNotes"
                            name="additionalNotes"
                            value={formData.additionalNotes}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div style={{ display: 'flex' }}>
                        <Button mgRight10 primary medium type="submit">
                            Submit
                        </Button>
                        <Button
                            outline
                            medium
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdopterFeedback;
{
    /* <div className={cx('home-check-input-wrap')}>
                        <div className={cx('form-rating')}>
                            {[
                                'How would you rate the pet’s health?',
                                'Is the pet happy and friendly?',
                                'Any challenges in caring for the pet?',
                                'Has the pet brought joy to your life?',
                                'Has the pet adapted well to the new home?',
                                'How likely are you to recommend adoption?',
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
                            <div className={cx('form-input')}>
                                <label htmlFor="content">
                                    <b>How satisfied are you with the adoption? Let us know more!</b>
                                </label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className={cx('form-image')}>
                                <div className={cx('upload-image')}>
                                    <label htmlFor="images">
                                        <b>Images</b> (3-5 images)
                                    </label>
                                    <Upload
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleFileChange}
                                    >
                                        {fileList.length >= 8 ? null : uploadButton}
                                    </Upload>
                                </div>
                            </div>
                        </div>
                    </div> */
}

//image
// const [previewOpen, setPreviewOpen] = useState(false);
// const [previewImage, setPreviewImage] = useState('');
// const [fileList, setFileList] = useState([]);

// const getBase64 = (file) =>
//     new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = (error) => reject(error);
//     });

// const handlePreview = async (file) => {
//     if (!file.url && !file.preview) {
//         file.preview = await getBase64(file.originFileObj);
//     }
//     setPreviewImage(file.url || file.preview);
//     setPreviewOpen(true);
// };

// const handleFileChange = ({ fileList: newFileList }) => {
//     if (newFileList.length <= 5) {
//         setFileList(newFileList);
//     } else {
//         alert('You can only upload a maximum of 5 images.');
//     }
// };

// const uploadButton = (
//     <button
//         style={{
//             border: 0,
//             background: 'none',
//         }}
//         type="button"
//     >
//         <PlusOutlined />
//         <div
//             style={{
//                 marginTop: 8,
//             }}
//         >
//             Upload
//         </div>
//     </button>
// );
// end image

// const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name in formData.rating) {
//         setFormData((prevData) => ({
//             ...prevData,
//             rating: {
//                 ...prevData.rating,
//                 [name]: value,
//             },
//         }));
//     } else {
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     }
// };

// const handleStarClick = (field, star) => {
//     setFormData((prevData) => ({
//         ...prevData,
//         [field]: star,
//     }));
// };

// const handleUpdateTaskStatusUndertake = async () => {
//     const token = localStorage.getItem('token');

//     try {
//         const response = await api.put(`tasks/taskID/status/DONE`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         console.log('update after undertake', response.data);
//     } catch (error) {
//         console.log(error);
//     }
// };

// const handleCreateFeedback = async (e) => {
//     e.preventDefault();

//     if (fileList.length < 3) {
//         alert('You must upload at least 3 images.');
//         return;
//     }

//     const uploadedUrls = await Promise.all(
//         fileList.map(async (file) => {
//             if (file.originFileObj) {
//                 const url = await uploadFile(file.originFileObj);
//                 console.log('Uploaded URL:', url);
//                 return url;
//             }
//             return null;
//         }),
//     );

//     const validUrls = uploadedUrls.filter(Boolean);

//     const updatedData = {
//         content: formData.content,
//         images: validUrls,
//         rating: formData.rating,
//     };
//     console.log('update form data', updatedData);

//     const token = localStorage.getItem('token');

//     try {
//         const response = await api.post(`feedbacks/task/taskID`, updatedData, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         console.log('send homecheck', response.data);
//         await handleUpdateTaskStatusUndertake();
//         setOpenHomeCheck(false);
//         toast.success('Send homecheck successfully');
//     } catch (error) {
//         console.error(error);
//     }
// };

// const formatLabel = (string) => {
//     return string.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
// };

{
    /* {previewImage && (
                    <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )} */
}
