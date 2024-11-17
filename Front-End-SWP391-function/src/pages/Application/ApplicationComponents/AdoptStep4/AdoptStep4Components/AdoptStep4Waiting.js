import React, { useEffect, useState } from 'react';
import Button from '~/components/Button';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';
import api from '~/config/axios';
import './AdoptStep4Waiting.scss';
import IMAGES from '~/assets/images';

const AdoptStep4Waiting = ({ id, setStep }) => {
    const [statusMessage, setStatusMessage] = useState('Đang chờ admin duyệt...');
    const userID = localStorage.getItem('userId');
    useEffect(() => {
        getPetData();
        const interval = setInterval(() => {
            checkApprovalStatus();
        }, 1000); // Kiểm tra mỗi 5 giây

        return () => clearInterval(interval); // Dọn dẹp khi component unmount
    }, []);

    const checkApprovalStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const applicationId = localStorage.getItem(`applicationId_${id}_${userID}`);
            const response = await api.get(`applications/${applicationId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const { status } = response.data;
            if (status === 3) {
                setStatusMessage('Đơn của bạn đã được duyệt!');
                setStep(7); // Chuyển sang bước tiếp theo
            } else if (status === 4) {
                setStatusMessage('Đơn của bạn đã bị từ chối.');
                setStep(0); // Quay về bước đầu
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
        }
    };

    const getPetData = async () => {
        try {
            const response = await api.get(`pets/${id}`, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            const petStatus = response.data.petStatus;
            console.log(petStatus);
            if (petStatus === 'Adopted') {
                setStep(0);
            }
        } catch (error) {}
    };

    return (
        <div className="adoptStep2_waiting">
            <ScrollToTop />
            <div className="adoptStep2_waiting_container">
                <div className="adoptStep4_waiting_container_content">
                    {/* <img src={IMAGES.iconDecorate_2} /> */}
                    <p>We will schedule a volunteer to your house as soon as possible</p>
                </div>
            </div>
        </div>
    );
};

export default AdoptStep4Waiting;
