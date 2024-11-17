import './PetDetail.module.scss';
import styles from './PetDetail.module.scss';

import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import api from '~/config/axios';
import Update from './components/Update';
import RegisBanner from '~/components/Layout/components/RegisterBanner';
import PetImage from './components/PetImage/PetImage';
import FeaturePet from '../FindPet/components/FeaturePet';

const cx = classNames.bind(styles);

function PetDetail() {
    const navigate = useNavigate();
    const [user, setUser] = useState(false);
    const [userRoles, setUserRoles] = useState('');
    const [update, setUpdate] = useState(false);
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const token = localStorage.getItem('token');
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

    const handleAdoptClick = (petId) => {
        if (token) {
            navigate(`/adopt-application/${petId}`);
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        const role = JSON.parse(localStorage.getItem('userRoles'));
        console.log(role);
        if (role?.includes('ADMIN')) {
            setUser(true);
            setUserRoles('admin');
        } else {
            setUserRoles('user');
            setUser(true);
        }
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

    return (
        <div>
            <div className={cx('wrapper')}>
                <h1>Do you love {pet.petName}?</h1>

                <p className={cx('back')} onClick={() => navigate('/find-a-pet')}>
                    &larr;Back
                </p>
                <div className={cx('content')}>
                    <PetImage pet={pet} />

                    <div className={cx('pet-info')}>
                        <div className={cx('detail-info')}>
                            <div className={cx('petDetail_h2_wrap')}>
                                <h2>{pet.petName}</h2>
                            </div>

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

                            <div className={cx('adopt')}>
                                {pet.petStatus === 'Adopted' ? (
                                    <Button medium disable>
                                        Adopted
                                    </Button>
                                ) : (
                                    <>
                                        <div className={styles.petDetail_adopt_btn}>
                                            <Button
                                                onClick={() => handleAdoptClick(pet.petId)}
                                                mgRight10
                                                medium
                                                primary
                                            >
                                                Adopt
                                            </Button>
                                        </div>

                                        <div className="petDetail_donate_btn">
                                            <Button to={`/donate/${pet.petId}`} medium outline>
                                                Donate
                                            </Button>
                                        </div>
                                    </>
                                )}

                                <div className={cx('admin-btn')}></div>
                            </div>

                            {userRoles === 'admin' ? (
                                <div className={cx('edit')}>
                                    <Button className={cx('update-btn')} primary medium onClick={toggleUpdate}>
                                        Update
                                    </Button>
                                </div>
                            ) : null}
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

            <FeaturePet homepage={true} title="Another Pets">
                <Button primary xlarge to="/find-a-pet" className={cx('link-btn')} mgTop20>
                    View All Adoptable Pets
                </Button>
            </FeaturePet>

            {user == false ? <RegisBanner /> : null}
        </div>
    );
}

export default PetDetail;
