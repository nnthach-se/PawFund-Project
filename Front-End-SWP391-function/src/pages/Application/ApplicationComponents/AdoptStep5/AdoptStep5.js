import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IMAGES from '~/assets/images';
import api from '~/config/axios';
import './AdoptStep5.scss';
import Button from '~/components/Button';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';

const AdoptStep5 = ({ id, setStep }) => {
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Hàm để lấy dữ liệu thú cưng
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

    // Hàm để cập nhật trạng thái thú cưng
    const updatePetStatus = async () => {
        if (!pet) return; // Nếu không có dữ liệu thú cưng, không làm gì cả

        try {
            setLoading(true);
            const updatedPet = { ...pet, petStatus: 'adopted' }; // Cập nhật trạng thái thú cưng
            await api.put(`pets/${id}`, updatedPet, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            console.log('Trạng thái thú cưng đã được cập nhật thành công!');
            setStep((prevStep) => prevStep + 1); // Chuyển sang bước tiếp theo
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handlePetData();
    }, []);
    console.log(pet);
    // console.log(pet);

    const handleFindPet = () => {
        navigate('/find-a-pet');
    };

    const handleAdoptPet = async () => {
        await updatePetStatus(); // Cập nhật trạng thái thú cưng
        navigate('/find-a-pet'); // Điều hướng đến trang tìm thú cưng
    };

    return (
        <div className="AdoptStep5">
            <ScrollToTop />
            {loading ? (
                <p>Loading pet information...</p> // Hiển thị khi đang tải
            ) : pet ? (
                <>
                    <div className="AdoptStep5_container">
                        <div className="AdoptStep5_container_header">
                            <h3>Thank you for applying to adopt !</h3>
                            <p>
                                We are so excited that you have chosen to bring {pet.petName} into your family. Not only
                                will your actions change a pet's life, but you will also help make the world a better
                                place.
                            </p>
                        </div>
                        <div className="AdoptStep5_container_petDetail">
                            <div className="AdoptStep1-container-content-wrap">
                                {/* hình ảnh bên trái */}
                                <div className="AdoptStep1-container-content-image-wrap">
                                    <img
                                        className="AdoptStep1-container-content-image"
                                        alt="image"
                                        src={pet.petImage}
                                    />
                                    <div>
                                        <img alt="image" src={IMAGES.adoptStep1_3} />
                                        <p>Vaccination Status: {pet.petVaccin}</p>
                                    </div>
                                </div>
                                <div className="AdoptStep1-container-content-info">
                                    <h3>{pet.petName}</h3>
                                    <div className="AdoptStep1-container-content-textContainer">
                                        <img alt="image" src={IMAGES.adoptStep1_2} />
                                        <p>
                                            <strong>Breed:</strong> {pet.petBreed}
                                        </p>
                                    </div>

                                    <div className="AdoptStep1-container-content-textContainer">
                                        <img alt="image" src={IMAGES.adoptStep1_2} />
                                        <p>
                                            <strong>Colour:</strong> {pet.petColor}
                                        </p>
                                    </div>
                                    <div className="AdoptStep1-container-content-textContainer">
                                        <img alt="image" src={IMAGES.adoptStep1_2} />
                                        <p>
                                            <strong>Age:</strong> {pet.petAge}
                                        </p>
                                    </div>
                                    <div className="AdoptStep1-container-content-textContainer">
                                        <img alt="image" src={IMAGES.adoptStep1_2} />
                                        <p>
                                            <strong>Weight:</strong> {pet.petWeight}
                                        </p>
                                    </div>
                                    <div className="AdoptStep1-container-content-textContainer">
                                        <img alt="image" src={IMAGES.adoptStep1_2} />
                                        <p>
                                            <strong>Gender:</strong> {pet.petGender}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="AdoptStep5_container_footer">
                            <p>
                                We'll see you soon! Thank you for your love and care for {pet.petName}. We look forward
                                to the day when you and {pet.petName} officially become family!
                            </p>
                        </div>
                        <div className="AdoptStep5-button">
                            <Button className="great" onClick={handleAdoptPet}>
                                Adopt Pet
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <p>Pet data not available</p> // Hiển thị nếu không có dữ liệu
            )}
        </div>
    );
};

export default AdoptStep5;
