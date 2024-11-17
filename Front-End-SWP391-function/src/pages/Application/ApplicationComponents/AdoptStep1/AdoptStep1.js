import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IMAGES from '~/assets/images';
import api from '~/config/axios';
import './AdoptStep1.scss';
import Button from '~/components/Button';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';

const AdoptStep1 = ({ id, setStep }) => {
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        handlePetData();
    }, []);
    console.log(pet);

    return (
        <div className="AdoptStep1">
            <ScrollToTop />
            {loading ? (
                <p>Loading pet information...</p> // Hiển thị khi đang tải
            ) : pet ? (
                <>
                    {/* Phần content của pet */}
                    <div className="content-wrap">
                        <div className="AdoptStep1-container-content">
                            {/* nội dung bên phải */}
                            <div className="AdoptStep1-container-content-wrap">
                                {/* hình ảnh bên trái */}
                                <div className="AdoptStep1-container-content-image-wrap">
                                    <img
                                        className="AdoptStep1-container-content-image"
                                        alt="image"
                                        // src={IMAGES.adoptStep1_1}
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

                            <div className="AdoptStep1-button">
                                <Button to="/find-a-pet" className="btn-2">
                                    Cancel
                                </Button>
                                <Button className="btn-1" onClick={() => setStep((prevStep) => prevStep + 1)}>
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Pet data not available</p> // Hiển thị nếu không có dữ liệu
            )}
        </div>
    );
};

export default AdoptStep1;
