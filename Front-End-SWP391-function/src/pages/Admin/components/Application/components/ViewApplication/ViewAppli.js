import { useEffect, useState } from 'react';
import styles from './ViewAppli.module.scss';
import classNames from 'classnames/bind';
import api from '~/config/axios';
import PetImages from '~/assets/images/petImg';
import Button from '~/components/Button';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function ViewAppli({ appliID, setViewAppli }) {
    const [appli, setAppli] = useState({});
    const [petInAppli, setPetInAppli] = useState({});

    const handleAppliData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`applications/${appliID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAppli(response.data);
            setPetInAppli(response.data.pet);
            console.log('Appli by id ', response.data);
            console.log('Pet In appli ', response.data.pet);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleAppliData();
    }, []);

    if (!appli) {
        return <div>Loading...</div>;
    }

    const handleApproveSuccess = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.put(
                `applications/status/${appliID}`,
                {
                    status: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            toast.success('Update successfully');
            setTimeout(() => {
                setViewAppli(false);
            }, 2000);
            console.log('success appli', response.data);
        } catch (error) {
            console.log(error);
            toast.error('Update fail');
        }
    };

    const handleApproveFail = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.put(
                `applications/status/${appliID}`,
                {
                    status: 2,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            toast.success('Update successfully');
            setTimeout(() => {
                setViewAppli(false);
            }, 2000);
            console.log('fail appli', response.data);
        } catch (error) {
            console.log(error);
            toast.error('Update fail');
        }
    };

    const handleDeleteAppli = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.delete(`applications/${appliID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Delete successfully');
            setTimeout(() => {
                setViewAppli(false);
            }, 2000);
            console.log('Delete appli ', response.data);
        } catch (error) {
            console.log(error);
            toast.error('Delete fail');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className={cx('wrapper')}>
                <p style={{ cursor: 'pointer', width: '70px' }} onClick={() => setViewAppli(false)}>
                    &larr;Back
                </p>

                <p style={{ marginBottom: '10px', fontSize: '12px' }}>Application ID: {appli.applicationId}</p>
                <p style={{ marginBottom: '10px', fontSize: '12px' }}>
                    Create Date: {appli.createAt ? new Date(appli.createAt).toLocaleDateString() : ''}
                </p>
                <div className={cx('main-content')}>
                    <div className={cx('container')}>
                        <div className={cx('pet')}>
                            <div className={cx('pet-image')}>
                                <img src={petInAppli.petImage} alt='pet image'/>
                            </div>
                            <div className={cx('pet-info')}>
                                <p style={{ fontSize: '12px', marginTop: '2px' }}>
                                    <b>Pet ID:</b> {petInAppli.petId}
                                </p>
                                <div className={cx('pet-info-heading')}>
                                    <h4>{petInAppli.petName}</h4>
                                    <p className={cx(`${petInAppli.petStatus == 'Adopted' ? 'adopted' : ''}`)}>
                                        {petInAppli.petStatus}
                                    </p>
                                </div>
                                <div className={cx('pet-detail')}>
                                    <div>
                                        <p>
                                            <b>Breed:</b> {petInAppli.petBreed}
                                        </p>
                                        <p>
                                            <b>Age:</b> {petInAppli.petAge}
                                        </p>
                                        <p>
                                            <b>Color:</b> {petInAppli.petColor}
                                        </p>
                                        <p style={{ margin: 0 }}>
                                            <b>Vaccin:</b> {petInAppli.petVaccin}
                                        </p>
                                    </div>
                                    <div style={{ marginLeft: '20px' }}>
                                        <p>
                                            <b>Weight:</b> {petInAppli.petWeight}
                                        </p>
                                        <p>
                                            <b>Size:</b> {petInAppli.petSize}
                                        </p>
                                        <p>
                                            <b>Gender:</b> {petInAppli.petGender}
                                        </p>
                                        <p style={{ margin: 0 }}>
                                            <b>Type:</b> {petInAppli.petType}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('adopter')}>
                            <p style={{ fontSize: '12px' }}>
                                <b>User ID:</b> {appli.id}
                            </p>
                            <div className={cx('user-info')}>
                                <div className={cx('user-info-heading')}>
                                    <h4>{appli.fullName}</h4>
                                </div>
                                <div className={cx('user-detail')}>
                                    <div style={{ display: 'flex' }}>
                                        <div>
                                            <p>
                                                <b>YOB:</b> {appli.yob}
                                            </p>
                                            <p>
                                                <b>Gender:</b> {appli.gender}
                                            </p>
                                        </div>
                                        <div style={{ marginLeft: '20px' }}>
                                            <p>
                                                <b>Job:</b> {appli.job}
                                            </p>
                                            <p>
                                                <b>Phone:</b> {appli.phone}
                                            </p>
                                        </div>
                                    </div>
                                    <p>
                                        <b>Address:</b> {appli.address}
                                    </p>
                                    <p>
                                        <b>City:</b> {appli.city}
                                    </p>
                                    <p>
                                        <b>Live in:</b> {appli.liveIn}
                                    </p>
                                    <p>
                                        <b>Live with:</b> {appli.liveWith}
                                    </p>
                                    <p>
                                        <b>First Person:</b> {appli.firstPerson} - {appli.firstPhone}
                                    </p>
                                    <p style={{ margin: 0 }}>
                                        <b>Second Person:</b> {appli.secondPerson} - {appli.secondPhone}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '15px',
                        }}
                    >
                        <div className={cx('approve-btn')}>
                            <Button primary medium mgRight10 onClick={handleApproveSuccess}>
                                Pass
                            </Button>
                            <Button medium onClick={handleApproveFail}>
                                Not Pass
                            </Button>
                        </div>

                        <p style={{ margin: 0, color: 'red', cursor: 'pointer' }} onClick={handleDeleteAppli}>
                            Delete <FontAwesomeIcon icon={faTrash} />
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewAppli;
