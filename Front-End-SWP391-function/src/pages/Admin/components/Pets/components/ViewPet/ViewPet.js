import api from '~/config/axios';
import PetImage from './PetImage/PetImage';
import styles from './ViewPet.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Update from './Update';
import Button from '~/components/Button';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function ViewPet({ id, setViewPet }) {
    const [update, setUpdate] = useState(false);
    const [pet, setPet] = useState(null);
    const [formData, setFormData] = useState({
        petName: '',
        petBreed: '',
        petAge: '',
        petGender: '',
        petColor: '',
        petSize: '',
        petWeight: '',
        petVaccin: '',
        petDescription: '',
        petType: '',
        petStatus: '',
        petImage: '',
    });
    const handlePetData = async () => {
        try {
            const response = await api.get(`pets/${id}`, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            setPet(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handlePetData();
    }, []);

    useEffect(() => {
        if (pet) {
            setFormData({
                petName: pet.petName || '',
                petBreed: pet.petBreed || '',
                petAge: pet.petAge || '',
                petGender: pet.petGender || '',
                petColor: pet.petColor || '',
                petSize: pet.petSize || '',
                petWeight: pet.petWeight || '',
                petVaccin: pet.petVaccin || '',
                petDescription: pet.petDescription || '',
                petType: pet.petType || '',
                petStatus: pet.petStatus || '',
                petImage: pet.petImage || '',
            });
        }
    }, [pet]);

    if (!pet) {
        return <div>Loading...</div>;
    }

    const toggleUpdate = () => {
        setUpdate(!update);
        window.scrollTo({
            top: 500,
            behavior: 'smooth',
        });
    };

    const closeUpdate = () => {
        setUpdate(false);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleDeletePet = async () => {
        try {
            await api.delete(`pets/${id}`, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            alert('Delete pet successfully!');
            setViewPet(false);
        } catch (error) {
            console.log(error);
            toast.error('This pet is currently being adopted by the user.');
        }
    };

    const handleSendEmailFeedback = async (petId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`adoptionFeedbacks/pet/${petId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Send successfully');
            console.log('send email', response.data);
        } catch (error) {
            console.log(error);
            toast.error('Fail to send email');
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <p style={{ cursor: 'pointer' }} onClick={() => setViewPet(false)}>
                    &larr;Back
                </p>
                <div style={{ display: 'flex' }}>
                    <PetImage pet={pet} />
                    <div className={cx('pet-info')}>
                        <div className={cx('detail-info')}>
                            <h2>{pet.petName}</h2>
                            <div className={cx('detail-item')}>
                                <div>
                                    <p>
                                        <b>Type:</b> {pet.petType}
                                    </p>

                                    <p>
                                        <b>Age:</b> {pet.petAge}
                                    </p>
                                    <p>
                                        <b>Gender:</b> {pet.petGender}
                                    </p>
                                    <p>
                                        <b>Colour:</b> {pet.petColor}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <b>Breed:</b> {pet.petBreed}
                                    </p>
                                    <p>
                                        <b>Size:</b> {pet.petSize} cm
                                    </p>
                                    <p>
                                        <b>Weight:</b> {pet.petWeight} kg
                                    </p>
                                    <p>
                                        <b>Vaccine:</b> {pet.petVaccin}
                                    </p>
                                </div>
                            </div>

                            <div className={cx('edit')}>
                                <Button className={cx('update-btn')} primary medium onClick={toggleUpdate}>
                                    Update
                                </Button>
                                <Button className={cx('update-btn')} outline medium onClick={handleDeletePet}>
                                    Delete
                                </Button>
                            </div>
                            <Button
                                className={cx('email-btn')}
                                outline
                                onClick={() => {
                                    console.log('1', pet.petId);
                                    handleSendEmailFeedback(pet.petId);
                                    console.log('2', pet.petId);
                                }}
                            >
                                Request Feedback
                            </Button>
                        </div>
                        <div className={cx('story')}>
                            <h2>Story</h2>
                            <div className={cx('description-wrapper')}>
                                <p className={cx('description')}>{pet.petDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {update && (
                    <Update
                        setUpdate={setUpdate}
                        formData={formData}
                        setFormData={setFormData}
                        closeUpdate={closeUpdate}
                        handlePetData={handlePetData}
                        id={id}
                    />
                )}
            </div>
            <ToastContainer />
        </>
    );
}

export default ViewPet;
