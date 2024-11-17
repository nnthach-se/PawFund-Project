import React, { useEffect, useState } from 'react';
import './AdoptStep3.scss';
import Button from '~/components/Button';
import api from '~/config/axios';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import IMAGES from '~/assets/images';

const AdoptStep3 = ({ id, setStep }) => {
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false); // State cho pop-up
    const userId = localStorage.getItem('userId');
    const applicationId = localStorage.getItem(`applicationId_${id}_${userId}`);
    const navigate = useNavigate();

    const handlePetData = async () => {
        try {
            setLoading(true);
            const response = await api.get(`pets/${id}`, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            setPet(response.data);
            localStorage.setItem('petuData', JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Hoàn tất quá trình tải
        }
    };
    // console.log(pet);
    const handleAdoptionCancel = async () => {
        const token = localStorage.getItem('token');
        try {
            // Cập nhật trạng thái đơn đăng ký thành 2
            const response = await api.put(
                `applications/status/${applicationId}`,
                {
                    status: 2,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            // Điều hướng về trang chính với thông báo
            navigate('/', { state: { message: `You have cancelled your application for ${pet.petName}` } });
        } catch (error) {
            console.log('Error updating application status:', error);
        }
    };

    useEffect(() => {
        handlePetData();
    }, []);

    return (
        <div className="AdoptStep3">
            <ScrollToTop />
            {loading ? (
                <p>Loading pet information...</p> // Hiển thị khi đang tải
            ) : pet ? (
                <>
                    <div className="AdopStep3-board">
                        <div className="AdoptStep3-first2-wrap">
                            <div className="AdoptStep3-first2">
                                <div className="meet_greet">Meet & Greet</div>
                                <div className="your-profile">
                                    Your profile is valid and eligible to be adopted. Right now you can go to our center
                                    to see {pet.petName}
                                </div>
                            </div>
                        </div>
                        <div className="aftermeet">
                            After meeting {pet.petName} do you want to raise
                            {pet.petGender === 'Male' ? <> him</> : <> her</>} ?
                        </div>

                        <div className="AdoptStep3-button">
                            <Button onClick={() => setShowPopup(true)} className="btn-2">
                                No
                            </Button>
                            <Button className="btn-1" onClick={() => setStep((prevStep) => prevStep + 1)}>
                                Yes
                            </Button>
                        </div>
                    </div>
                    {showPopup && (
                        <div className={`popupStep3 ${showPopup ? 'show' : ''}`}>
                            <div className="popupStep3-content">
                                <div className="popupStep3-content-wrap">
                                    <img src={IMAGES.warningIcon} />
                                    <h2>Are you sure you don't want to adopt {pet.petName}?</h2>
                                    <div className="popupStep3-buttons">
                                        <Button
                                            onClick={() => {
                                                handleAdoptionCancel(); // Gọi hàm hủy đơn đăng ký
                                                setShowPopup(false); // Ẩn pop-up
                                            }}
                                        >
                                            Yes
                                        </Button>
                                        <Button onClick={() => setShowPopup(false)}>No</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <ToastContainer />
                </>
            ) : (
                <p>Pet data not available</p> // Hiển thị nếu không có dữ liệu
            )}
        </div>
    );
};

export default AdoptStep3;