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
    const [appliForPet, setAppliForPet] = useState([]);
    const [singlePetId, setSinglePetId] = useState('');
    const [appliIdForPet, setAppliIdForPet] = useState('');

    const formatDueDate = (dueDate) => {
        const formattedDate = dueDate.slice(0, 16).replace('T', ' / ');
        return formattedDate;
    };

    console.log('Day la appliforpet', appliForPet);
    console.log('Day la appli ID forpet', appliIdForPet);

    const handleUpdatePetAdopted = async () => {
        try {
            const response = await api.put(
                `pets/status/${singlePetId}`,
                {
                    petStatus: 'Adopted',
                },
                {
                    headers: {
                        Authorization: 'No Auth',
                    },
                },
            );
            console.log('update pet adopted', response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateTaskLastStepApprove = async () => {
        const token = localStorage.getItem('token');
        console.log('appli id', appliIdForPet);

        try {
            const response = await api.put(
                `applications/status/${appliIdForPet}`,
                {
                    status: 3,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log('update last step', response.data);
            await handleUpdatePetAdopted();
            toast.success('Update Application To Approved Successfully');
            setUpdateSuccess(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateTaskLastStepDenied = async () => {
        const token = localStorage.getItem('token');
        console.log('appli id', appliIdForPet);

        try {
            const response = await api.put(
                `applications/status/${appliIdForPet}`,
                {
                    status: 4,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log('update last step', response.data);
            toast.success('Update Application To Denied Successfully');
            setUpdateSuccess(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetAllAppliForPet = async (petName) => {
        const token = localStorage.getItem('token');

        try {
            const response = await api.get(`feedbacks/search?sortBy=Rating&sortDir=DESC&petName=${petName}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('get all appli of pet', response.data.result);
            setAppliForPet(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        handleGetAllAppliForPet();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className={cx('content')}>
                {currentFeedback.map((feedback) => (
                    <>
                        <div key={feedback.petId}>
                            <div className={cx('content-item')}>
                                <p className={cx('id')}>#{feedback.petId}</p>
                                <p className={cx('petName')}>{feedback.petName}</p>
                                <p className={cx('totalAppli')}>{feedback.feedbackCount}</p>
                                <div className={cx('status')}>
                                    <p
                                        className={cx(
                                            `${
                                                feedback.petStatus == 'Adopted' || feedback.petStatus == 'adopted'
                                                    ? 'adopted'
                                                    : feedback.petStatus == 'Available'
                                                    ? 'available'
                                                    : ''
                                            }`,
                                        )}
                                    >
                                        {capitalizeFirstLetter(feedback.petStatus)}
                                    </p>
                                </div>
                                <div className={cx('action')}>
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className={cx('view-icon')}
                                        onClick={() => {
                                            setSinglePetId(feedback.petId === singlePetId ? '' : feedback.petId);
                                            setAppliForPet([]);
                                            handleGetAllAppliForPet(feedback.petName);
                                        }}
                                    />
                                </div>
                            </div>

                            {singlePetId === feedback.petId ? (
                                <div className={cx('show-all-appli')}>
                                    <div className={cx('show-all-appli-content')}>
                                        <div className={cx('show-all-appli-header')}>
                                            <p style={{ width: '10%', marginBottom: 0 }}>
                                                <b>Task ID</b>
                                            </p>
                                            <p style={{ width: '10%', marginBottom: 0 }}>
                                                <b>Adopter</b>
                                            </p>
                                            <p style={{ width: '5%', marginBottom: 0 }}>
                                                <b>Rating</b>
                                            </p>
                                            <p style={{ width: '13%', marginBottom: 0 }}>
                                                <b>Task Create At</b>
                                            </p>
                                            <p style={{ width: '13%', marginBottom: 0 }}>
                                                <b>Feedback Finish At</b>
                                            </p>
                                            <p style={{ width: '15%', marginBottom: 0 }}>
                                                <b>Action</b>
                                            </p>
                                        </div>
                                        {appliForPet.map((item) => (
                                            <div className={cx('appli-rating')} key={item.taskId}>
                                                <p style={{ width: '10%', marginBottom: 0, overflow: 'hidden' }}>
                                                    #{item.taskId}
                                                </p>
                                                <p style={{ width: '10%', marginBottom: 0, overflow: 'hidden' }}>
                                                    {item.adopterName}
                                                </p>
                                                <p style={{ width: '5%', marginBottom: 0 }}>{item.rating}</p>
                                                <p style={{ width: '13%', marginBottom: 0 }}>
                                                    {formatDueDate(item.taskCreatedAt)}
                                                </p>
                                                <p style={{ width: '13%', marginBottom: 0 }}>
                                                    {formatDueDate(item.feedbackFinishedAt)}
                                                </p>

                                                <div style={{ width: '15%', display: 'flex' }}>
                                                    {feedback.petStatus === 'Available' ? (
                                                        <>
                                                            <Button
                                                                primary
                                                                small
                                                                mgRight10
                                                                onClick={() => {
                                                                    console.log('id appli ne', item.applicationId);
                                                                    setAppliIdForPet(item.applicationId);
                                                                    setSinglePetId(feedback.petId);
                                                                    setTimeout(() => {
                                                                        handleUpdateTaskLastStepApprove();
                                                                    }, 1000);
                                                                }}
                                                            >
                                                                Approve
                                                            </Button>
                                                            <Button
                                                                primary
                                                                small
                                                                className={cx('denied-btn')}
                                                                onClick={() => {
                                                                    console.log('id ne: ', item.applicationId);
                                                                    setAppliIdForPet(item.applicationId);
                                                                    setSinglePetId(feedback.petId);
                                                                    handleUpdateTaskLastStepDenied();
                                                                }}
                                                            >
                                                                Denied
                                                            </Button>
                                                        </>
                                                    ) : null}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </>
                ))}
            </div>
        </>
    );
}

export default FeedbackContent;
