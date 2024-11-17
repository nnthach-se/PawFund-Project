import Button from '~/components/Button';
import PetImages from '~/assets/images/petImg';
import styles from './PetList.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ICONS from '~/assets/icons';
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function PetList({ data, dataLength, currentPage, setCurrentPage }) {
    const [lovePet, setLovePet] = useState({});
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleAdoptClick = (petId) => {
        if (token) {
            navigate(`/adopt-application/${petId}`);
        } else {
            navigate('/login');
        }
    };

    const handleWishlist = (pet) => {
        console.log(pet.petId);
        setLovePet((pre) => ({ ...pre, [pet.petId]: !pre[pet.petId] }));
    };

    const petPerPage = 9;
    const indexOfLastPet = currentPage * petPerPage;
    const indexOfFirstPet = indexOfLastPet - petPerPage;
    const currentPet = data.slice(indexOfFirstPet, indexOfLastPet);

    return (
        <div className={cx('pet-list')}>
            {currentPet.map((pet) => (
                <div className={cx('pet-box')} key={pet.petId}>
                    <div className={cx('image')}>
                        <img src={pet.petImage} alt='pet-image'/>
                        {/* <img
                            src={lovePet[pet.petId] ? ICONS.heartRed : ICONS.heartWhi}
                            className={cx('heart-icon')}
                            onClick={() => handleWishlist(pet)}
                        /> */}
                        <p
                            className={cx(
                                'pet-state',
                                pet.petStatus === 'Adopted' ? 'unavailable-state' : 'available-state',
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
                                    {pet.petSize} - {pet.petWeight} kg
                                </p>

                                <div className={cx('attr-icon')}>
                                    {pet.petVaccin === 'Yes' ? <img src={ICONS.vaccineBl} /> : null}
                                    <img src={pet.petGender === 'Male' ? ICONS.maleBl : ICONS.femaleBl} />
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
                                onClick={() => console.log(pet.petId)}
                            >
                                Detail
                            </Button>
                            <Button
                                primary
                                small
                                // to={`/adopt-application/${pet.petId}`}
                                onClick={() => handleAdoptClick(pet.petId)}
                                className={cx(pet.petStatus === 'Adopted' ? 'unavailable-state' : null)}
                            >
                                Adopt
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            <div className={cx('pagination')}>
                <Pagination
                    style={{ display: 'block' }}
                    current={currentPage}
                    defaultCurrent={1}
                    total={dataLength}
                    pageSize={petPerPage}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}

export default PetList;
