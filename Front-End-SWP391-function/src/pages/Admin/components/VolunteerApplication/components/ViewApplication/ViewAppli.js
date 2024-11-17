import { useEffect, useState } from 'react';
import styles from './ViewAppli.module.scss';
import classNames from 'classnames/bind';
import api from '~/config/axios';
import PetImages from '~/assets/images/petImg';
import Button from '~/components/Button';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function ViewAppli({ id, setViewAppli, userAppliId, userInAppli }) {
    const [appli, setAppli] = useState(null);

    const handleAppliData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`volunteer/application/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAppli(response.data);
            console.log('detail volun appli', response.data);
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

    const handleUpdateUserToVolunteer = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.put(
                `users/${userAppliId}`,
                {
                    username: `${userInAppli.username}`,
                    firstname: `${userInAppli.firstname}`,
                    lastname: `${userInAppli.lastname}`,
                    roles: ['VOLUNTEER'],
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            alert('Update successfully');
            setViewAppli(false);
            console.log('update user to volunteer', response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleApproveSuccess = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.put(
                `volunteer/application/status/${id}`,
                {
                    status: 1, // Gửi body với status là 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            alert('Update successfully');
            await handleUpdateUserToVolunteer();
            setViewAppli(false);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleApproveFail = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.put(
                `volunteer/application/status/${id}`,
                {
                    status: 2, // Gửi body với status là 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            alert('Update successfully');
            setViewAppli(false);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteAppli = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.delete(`volunteer/application/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Delete successfully');
            setViewAppli(false);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <p style={{ cursor: 'pointer', width: '70px' }} onClick={() => setViewAppli(false)}>
                    &larr;Back
                </p>

                <p style={{ marginBottom: '10px', fontSize: '12px' }}>Application ID: {appli.volunteerAppliId}</p>
                <p style={{ marginBottom: '10px', fontSize: '12px' }}>
                    Create Date: {appli.createAt ? new Date(appli.createAt).toLocaleDateString() : ''}
                </p>
                <div className={cx('main-content')}>
                    <div className={cx('container')}>
                        <h5>
                            <b>{appli.fullName}</b>
                        </h5>
                        <div className={cx('container-wrap-detail')}>
                            <div className={cx('container-left')}>
                                <p>
                                    <b>YOB: </b>
                                    {appli.yob}
                                </p>
                                <p>
                                    <b>Gender: </b>
                                    {appli.gender}
                                </p>
                                <p>
                                    <b>Phone: </b>
                                    {appli.phone}
                                </p>
                                <p style={{ width: '360px' }}>
                                    <b>Address: </b>
                                    {appli.address}
                                </p>
                            </div>
                            <div className={cx('container-right')}>
                                <p>
                                    <b>Adoption Experience: </b>
                                    {appli.adoptionExp}
                                </p>
                                <p>
                                    <b>Days of week: </b>
                                    {appli.daysOfWeek}
                                </p>
                                <p>
                                    <b>Morning: </b>
                                    {appli.morning}
                                </p>
                                <p>
                                    <b>Afternoon: </b>
                                    {appli.afternoon}
                                </p>
                            </div>
                        </div>

                        <p style={{ margin: 0 }}>
                            <b>Reason: </b>
                            {appli.reason}
                        </p>
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
