import styles from './PetContent.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function PetContent({ currentPet, setPetID, setViewPet }) {
    const [imgPopup, setImgPopup] = useState(null);
    const [openImgPopup, setOpenImgPopup] = useState(false);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <>
            <div className={cx('content')}>
                {currentPet.map((pet) => (
                    <div className={cx('content-item')} key={pet.petId}>
                        <p className={cx('id')}>#{pet.petId}</p>
                        <div className={cx('image')}>
                            <img
                                src={pet.petImage}
                                alt="pet-img"
                                onClick={() => {
                                    setImgPopup(pet.petImage);
                                    setOpenImgPopup(true);
                                }}
                            />
                        </div>
                        <div className={cx('name')}>
                            <p className={cx('petname')}>{pet.petName}</p>
                        </div>
                        <div className={cx('role')}>
                            <p
                                className={cx(
                                    `${
                                        pet.petStatus == 'Adopted' || pet.petStatus == 'adopted'
                                            ? 'adopted'
                                            : pet.petStatus == 'Available'
                                            ? 'available'
                                            : ''
                                    }`,
                                )}
                            >
                                {capitalizeFirstLetter(pet.petStatus)}
                            </p>
                        </div>
                        <p className={cx('date')}>
                            {pet.createdPetAt ? new Date(pet.createdPetAt).toLocaleDateString() : ''}
                        </p>
                        <div className={cx('action')}>
                            <FontAwesomeIcon
                                icon={faEye}
                                className={cx('view-icon')}
                                onClick={() => {
                                    setPetID(pet.petId);
                                    setViewPet(true);
                                    console.log(pet.petId);
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {openImgPopup ? (
                <div className={cx('image-popup')}>
                    <p
                        onClick={() => {
                            setOpenImgPopup(false);
                            setImgPopup(null);
                        }}
                    >
                        &times;
                    </p>
                    <img src={imgPopup} />
                </div>
            ) : null}
        </>
    );
}

export default PetContent;
