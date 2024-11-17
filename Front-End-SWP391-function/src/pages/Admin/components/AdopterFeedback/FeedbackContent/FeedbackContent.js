import styles from './FeedbackContent.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import api from '~/config/axios';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function FeedbackContent({ currentFeedback, setUpdateSuccess }) {
    const [openPopup, setOpenPopup] = useState(false);
    const [popupData, setPopupData] = useState(null);

    const formatDueDate = (dueDate) => {
        const formattedDate = dueDate.slice(0, 16).replace('T', ' / ');
        return formattedDate;
    };

    const handleSingleFeedback = async (id) => {
        const token = localStorage.getItem('token');

        try {
            const response = await api.get(`adoptionFeedbacks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('handleSingleFeedback', response.data.result);
            setPopupData(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    const formatValue = (str) => {
        return str
            .toLowerCase()
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <>
            <ToastContainer />
            <div className={cx('content')}>
                {currentFeedback.map((feedback) => (
                    <>
                        <div key={feedback.id}>
                            <div className={cx('content-item')}>
                                <p className={cx('id')}>#{feedback.id}</p>
                                <p className={cx('petName')}>{feedback.adopterName}</p>
                                <p className={cx('totalAppli')}>{feedback.petName}</p>
                                <p className={cx('date')}>{formatDueDate(feedback.createdAt)}</p>
                                <div className={cx('action')}>
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className={cx('view-icon')}
                                        onClick={() => {
                                            handleSingleFeedback(feedback.id);
                                            setOpenPopup(true);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>

            {openPopup && popupData !== null ? (
                <div className={cx('popup')}>
                    <p
                        className={cx('close-btn')}
                        onClick={() => {
                            setOpenPopup(false);
                        }}
                    >
                        &times;
                    </p>

                    <div className={cx('content')}>
                        <p>
                            <b>Adopter Name:</b> {popupData.adopterName}
                        </p>
                        <p>
                            <b>Pet Status:</b> {formatValue(popupData.petStatus)}
                        </p>
                        <p>
                            <b>Challenges:</b> {formatValue(popupData.challenges)}
                        </p>
                        <p>
                            <b>Medical Recommendation:</b> {formatValue(popupData.medicalRecommendation)}
                        </p>
                        <p>
                            <b>Behavioral Changes:</b> {formatValue(popupData.behavioralChanges)}
                        </p>
                        <p>
                            <b>Activity Level:</b> {formatValue(popupData.activityLevel)}
                        </p>
                        <p>
                            <b>Food Type:</b> {formatValue(popupData.foodType)}
                        </p>
                        <div className={cx('des-content')}>
                            <p>
                                <b>Additional Notes:</b>
                            </p>
                            <p className={cx('des-wrap')}>{formatValue(popupData.additionalNotes)}</p>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default FeedbackContent;
