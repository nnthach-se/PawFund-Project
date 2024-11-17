import styles from './FeaturePet.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import ICONS from '~/assets/icons';
import PetImages from '~/assets/images/petImg';
import api from '~/config/axios';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function FeaturePet({ children, homepage, title }) {
    const [index, setIndex] = useState(0);
    const [lovePet, setLovePet] = useState({});
    const [petList, setPetList] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleAdoptClick = (petId) => {
        if (token) {
            navigate(`/adopt-application/${petId}`);
        } else {
            navigate('/login');
        }
    };

    const handlePetData = async () => {
        try {
            const response = await api.get('pets/sort6Pets', {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            setPetList(response.data);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        handlePetData();
    }, []);

    const nextSlide = () => {
        setIndex((prevIndex) => (prevIndex + 1) % petList.length);
    };

    const preSlide = () => {
        setIndex((prevIndex) => (prevIndex - 1 + petList.length) % petList.length);
    };

    const petsToShow =
        petList.length > 0
            ? [petList[index], petList[(index + 1) % petList.length], petList[(index + 2) % petList.length]]
            : [];

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, [petList.length]);

    const handleWishlist = (pet) => {
        if (pet && pet.petId) {
            console.log(pet.petId);
            setLovePet((prev) => ({ ...prev, [pet.petId]: !prev[pet.petId] }));
        }
    };

    return (
        <div className={cx('feature-pets', { 'white-content': homepage })}>
            <h1 className={cx('main-heading', { 'primary-text': homepage })}>{title || 'Waiting For Love'}</h1>
            <p className={cx('main-slogan', { 'grey-text': homepage })}>Love, Care, Companionship</p>
            <div className={cx('content')}>
                <button onClick={preSlide} className={cx('pre-btn')}>
                    &lt;
                </button>
                <div className={cx('pet-container')}>
                    {petsToShow.map((pet) =>
                        pet ? (
                            <div className={cx('pet-box')} key={pet.petId}>
                                <div className={cx('image')}>
                                    <img src={pet.petImage} alt={pet.petName} />
                                    {/* <img
                                        src={lovePet[pet.petId] ? ICONS.heartRed : ICONS.heartWhi}
                                        className={cx('heart-icon')}
                                        onClick={() => handleWishlist(pet)}
                                        alt=""
                                    /> */}
                                    <p
                                        className={cx(
                                            'pet-state',
                                            pet.petStatus === 'Available' ? 'available-state' : 'unavailable-state',
                                        )}
                                    >
                                        {pet.petStatus}
                                    </p>
                                </div>
                                <div className={cx('pet-info')}>
                                    <div className={cx('info')}>
                                        <div className={cx('main-info')}>
                                            <h3>{pet.petName}</h3>
                                            <p>
                                                {pet.petSize} cm - {pet.petWeight} kg
                                            </p>
                                            <div className={cx('attr-icon')}>
                                                {pet.petVaccin === 'Yes' && <img src={ICONS.vaccineBl} alt="" />}
                                                <img
                                                    src={pet.petGender === 'Male' ? ICONS.maleBl : ICONS.femaleBl}
                                                    alt="Gender Icon"
                                                />
                                            </div>
                                        </div>
                                        <p className={cx('old')}>{pet.petAge}</p>
                                    </div>
                                    <div className={cx('pet-btn')}>
                                        <Button
                                            mgRight10
                                            outline
                                            small
                                            to={`/pet-detail/${pet.petId}`}
                                            // className={cx('btn')}
                                        >
                                            Detail
                                        </Button>
                                        <Button
                                            primary
                                            small
                                            onClick={() => handleAdoptClick(pet.petId)}
                                            className={cx(
                                                // 'btn',
                                                pet.petStatus === 'Adopted' ? 'unavailable-state' : null,
                                            )}
                                        >
                                            Adopt
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>No pet available</div>
                        ),
                    )}
                </div>
                <button onClick={nextSlide} className={cx('next-btn')}>
                    &gt;
                </button>
            </div>

            {children}
        </div>
    );
}

export default FeaturePet;
