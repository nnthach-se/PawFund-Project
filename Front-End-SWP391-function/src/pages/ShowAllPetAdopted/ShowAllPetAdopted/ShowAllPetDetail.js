import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '~/config/axios';
import './ShowAllPetDetail.scss';
import IMAGES from '~/assets/images';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';

const ShowAllPetDetail = () => {
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    // console.log(id);

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
        <div className="myPetDetail">
            <ScrollToTop />
            {loading ? (
                <p>Loading pet information...</p> // Hiển thị khi đang tải
            ) : pet ? (
                <>
                    <div className="myPetDetail_box_wrap">
                        <div className="myPetDetail_box">
                            <div className="myPetDetail_box_left">
                                <img className="myPetDetail_box_left_imgPet" src={pet.petImage} alt="img" />
                                <div className="myPetDetail_box_left_vaccine">
                                    <img className="myPetDetail_box_left_imgVac" src={IMAGES.adoptStep1_3} />
                                    <p>
                                        <strong>Vaccine:</strong> {pet.petVaccin}
                                    </p>
                                </div>
                            </div>
                            <div className="myPetDetail_box_right">
                                <div className="myPetDetail_box_right_4_left">
                                    <div className="myPetDetail_box_right_4_left_container">
                                        <img alt="image" src={IMAGES.adoptStep1_2} />
                                        <p>
                                            <strong>Name:</strong> {pet.petName}
                                        </p>
                                    </div>
                                    <div className="myPetDetail_box_right_4_left_container">
                                        <img alt="image" src={IMAGES.adoptStep1_2} />
                                        <p>
                                            <strong>Type:</strong> {pet.petType}
                                        </p>
                                    </div>
                                    <div className="myPetDetail_box_right_4_left_container">
                                        <img alt="image" src={IMAGES.adoptStep1_2} />
                                        <p>
                                            <strong>Breed:</strong> {pet.petBreed}
                                        </p>
                                    </div>
                                    <div className="myPetDetail_box_right_4_left_container">
                                        <img alt="image" src={IMAGES.adoptStep1_2} />
                                        <p>
                                            <strong>Weight:</strong> {pet.petWeight} kg
                                        </p>
                                    </div>
                                </div>
                                <div className="myPetDetail_box_right_4_right">
                                    <div className="myPetDetail_box_right_4_right_container">
                                        <img alt="image" src={IMAGES.adoptStep1_2} />
                                        <p>
                                            <strong>Gender:</strong> {pet.petGender}
                                        </p>
                                    </div>
                                    <div className="myPetDetail_box_right_4_right_container">
                                        <img alt="image" src={IMAGES.adoptStep1_2} />
                                        <p>
                                            <strong>Size:</strong> {pet.petSize}
                                        </p>
                                    </div>
                                    <div className="myPetDetail_box_right_4_right_container">
                                        <img alt="image" src={IMAGES.adoptStep1_2} />
                                        <p>
                                            <strong>Age:</strong> {pet.petAge}
                                        </p>
                                    </div>
                                    <div className="myPetDetail_box_right_4_right_container">
                                        <img alt="image" src={IMAGES.adoptStep1_2} />
                                        <p>
                                            <strong>Color:</strong> {pet.petColor}
                                        </p>
                                    </div>
                                    <div className="myPetDetail_box_description_container">
                                        <p>
                                            <strong className="description_myPet">Description</strong> <br />{' '}
                                            {pet.petDescription}
                                        </p>
                                    </div>
                                </div>
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

export default ShowAllPetDetail;
