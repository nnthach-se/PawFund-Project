import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '~/config/axios';
import './ApplicationDetails.scss';
import IMAGES from '~/assets/images';
import Button from '~/components/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplicationDetails = () => {
    const [appliData, setAppliData] = useState([]);
    const appliId = useParams();
    const appliIdUse = appliId.id;
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    console.log('Day la applidata: ', appliData);
    //lay appli data
    const getApplication = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (appliId !== null) {
                const response = await api.get(`applications/${appliIdUse}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setAppliData(response.data); // Lưu dữ liệu vào state
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
        } finally {
            setLoading(false); // Hoàn tất quá trình tải
        }
    };

    const handleUpdate = () => {
        navigate(`/my-application-update/${appliIdUse}`); // Điều hướng đến trang cập nhật với applicationId
    };

    const notify = () => {
        toast.error('You cannot update once your application has been checked');
    };

    useEffect(() => {
        getApplication();
    }, []);

    return (
        <div className="applicationDetail">
            {loading ? (
                <p>Loading pet information...</p> // Hiển thị khi đang tải
            ) : appliData ? (
                <>
                    {/* <div className="applicationDetail_box_wrap"> */}
                    <div className="applicationDetail_box">
                        <img className="applicationDetail_box_img" src={IMAGES.logo} />
                        <div className="applicationDetail_box_h3_wrap_wrap">
                            <div className="applicationDetail_box_h3_wrap">
                                <h3>PET ADOPTION APPLICATION FORM</h3>
                            </div>
                        </div>

                        <div className="applicationDetail_box_content">
                            <div className="applicationDetail_box_content_name_phone">
                                <p>
                                    <strong>Full Name: </strong>
                                    {appliData.fullName}
                                </p>
                                <p>
                                    <strong>Phone Number: </strong>
                                    {appliData.phone}
                                </p>
                            </div>
                            <div className="applicationDetail_box_content_yob_gender">
                                <p>
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
                                <strong>Who do you live with ?: </strong>
                                {appliData.liveWith}
                            </p>
                            <p>
                                <strong>Reference Person #1: </strong>
                                {appliData.firstPerson}
                            </p>
                            <p>
                                <strong>Phone Number #1: </strong>
                                {appliData.firstPhone}
                            </p>
                            <p>
                                <strong>Reference Person #2: </strong>
                                {appliData.secondPerson}
                            </p>
                            <p>
                                <strong>Phone Number #2: </strong>
                                {appliData.secondPhone}
                            </p>
                        </div>
                        <div className="applicationDetail_box_content_petDetail_wrap">
                            <h3>Pet Details</h3>
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

                        <div className="applicationDetail_box_btn_wrap">
                            {appliData.status === 0 ? (
                                <div className="applicationDetail_box_btn">
                                    <Button onClick={handleUpdate}>Update</Button> {/* Add a label or text here */}
                                </div>
                            ) : (
                                <div className="applicationDetail_box_btn">
                                    <Button onClick={notify}>Update</Button> {/* Add a label or text here */}
                                </div>
                            )}
                        </div>
                    </div>
                    <ToastContainer />
                </>
            ) : (
                <p>Pet data not available</p> // Hiển thị nếu không có dữ liệu
            )}
        </div>
    );
};

export default ApplicationDetails;
