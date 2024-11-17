import { Button, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';
import api from '~/config/axios';
import './AdoptStep2FormWait.scss';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const AdoptStep2FormWait = ({ id, setStep }) => {
    const [appliData, setAppliData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    console.log('Day la applidata: ', appliData);

    const checkApprovalStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const applicationId = localStorage.getItem(`applicationId_${id}_${userId}`);
            const response = await api.get(`applications/${applicationId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAppliData(response.data);
            const { status } = response.data;

            if (status === 1) {
                toast.info('Your application has been approved!');
                setStep(4); // Chuyển đến bước 4 khi đơn được phê duyệt
            } else if (status === 2) {
                toast.warn('Your application has been denied.');
                setStep(0); // Quay về bước đầu nếu đơn bị từ chối
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
        }
    };

    useEffect(() => {
        // Loading 1 giây trước khi thực hiện kiểm tra trạng thái
        setTimeout(() => {
            checkApprovalStatus();
            setLoading(false);
        }, 5000); // Chờ 1 giây trước khi kết thúc loading

        const interval = setInterval(() => {
            checkApprovalStatus();
        }, 1000); // Kiểm tra trạng thái mỗi 10 giây

        return () => clearInterval(interval);
    }, []);

    const handleUpdate = () => {
        navigate(`/my-application-update/${appliData.applicationId}`);
    };

    const notifyApprovalStatus = () => {
        if (appliData.status === 1) {
            toast.info('Your application has been approved!');
        } else if (appliData.status === 2) {
            toast.warn('Your application has been denied.');
        } else {
            toast.error('You cannot update once your application has been checked.');
        }
    };

    return (
        <div className="applicationDetail">
            <ToastContainer />
            {loading ? (
                <Spin tip="Loading..." />
            ) : (
                <div className="adoptstep2wait_box">
                    <ScrollToTop />

                    <p className="adoptstep2wait_box_header">
                        Your application has been submitted. Please wait for us to approve your application. Now let's
                        check the information again!
                    </p>
                    <div className="adoptstep2wait_box_content">
                        <div className="applicationDetail_box_content_name_phone">
                            <p className="applicationDetail_box_content_name">
                                <strong>Full Name: </strong>
                                {appliData.fullName}
                            </p>
                            <p>
                                <strong>Phone Number: </strong>
                                {appliData.phone}
                            </p>
                        </div>
                        <div className="adoptStep2_box_content_yob_gender">
                            <p className="adoptStep2_gender">
                                <strong>Gender: </strong>
                                {appliData.gender}
                            </p>
                            <p>
                                <strong>Year of Birth: </strong>
                                {appliData.yob}
                            </p>
                        </div>
                        <p>
                            <strong>Address: </strong>
                            {appliData.address}
                        </p>
                        <p>
                            <strong>City: </strong>
                            {appliData.city}
                        </p>
                        <p>
                            <strong>Job: </strong>
                            {appliData.job}
                        </p>
                        <p>
                            <strong>Who do you live with?: </strong>
                            {appliData.liveWith}
                        </p>
                        <p>
                            <strong>Reference Person #1: </strong>
                            {appliData.firstPerson} - {appliData.firstPhone}
                        </p>
                        <p>
                            <strong>Reference Person #2: </strong>
                            {appliData.secondPerson} - {appliData.secondPhone}
                        </p>
                        <div className="AdoptStep2Wait_line"></div>
                        <div className="AdoptStep2_notification">
                            <h5>
                                If your application is approved, could you let me know which day you would like the
                                volunteer to visit your home ?
                            </h5>
                            <p>Please choose a date 7-10 days from now. Thank you!</p>
                        </div>
                        <div className="adoptStep2Wait_3input">
                            <p>
                                <strong>Date: </strong>
                                {new Date(appliData.dateIn).toLocaleDateString('vi-VN', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })}
                            </p>
                            <p>
                                <strong>From: </strong>
                                {appliData.timeIn}
                            </p>
                            <p className="adoptStep2Wait_3input_to">
                                <strong>To: </strong>
                                {appliData.timeOut}
                            </p>
                        </div>
                        <div className="AdoptStep2Wait_line"></div>
                        <div className="applicationDetail_box_content_petDetail_wrap">
                            <h2>Pet Details</h2>
                            <div className="applicationDetail_box_content_petDetail">
                                <div>
                                    <img src={appliData.pet.petImage} alt='pet image'/>
                                </div>
                                <div className="applicationDetail_box_content_petDetail_devideCol">
                                    <div className="applicationDetail_box_content_petDetail_4left">
                                        <p>
                                            <strong>Name: </strong>
                                            {appliData.pet.petName}
                                        </p>
                                        <p>
                                            <strong>Type: </strong>
                                            {appliData.pet.petType}
                                        </p>
                                        <p>
                                            <strong>Breed: </strong>
                                            {appliData.pet.petBreed}
                                        </p>
                                        <p>
                                            <strong>Age: </strong>
                                            {appliData.pet.petAge}
                                        </p>
                                    </div>
                                    <div className="applicationDetail_box_content_petDetail_3right">
                                        <p>
                                            <strong>Gender: </strong>
                                            {appliData.pet.petGender}
                                        </p>
                                        <p>
                                            <strong>Size: </strong>
                                            {appliData.pet.petSize}
                                        </p>
                                        <p>
                                            <strong>Weight: </strong>
                                            {appliData.pet.petWeight}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="applicationDetail_box_btn_wrap">
                        {appliData.status === 0 ? (
                            <div className="applicationDetail_box_btn">
                                <Button onClick={handleUpdate}>Update</Button>
                            </div>
                        ) : (
                            <div className="applicationDetail_box_btn">
                                <Button onClick={notifyApprovalStatus}>Update</Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdoptStep2FormWait;
