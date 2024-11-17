import { useEffect, useState } from 'react';
import styles from './ViewUser.module.scss';
import classNames from 'classnames/bind';
import api from '~/config/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import Update from './Update';

const cx = classNames.bind(styles);

function ViewUser({ id, setViewUser }) {
    const [user, setUser] = useState(null);
    const [update, setUpdate] = useState(false);
    const [checkRole, setCheckRole] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        firstname: '',
        lastname: '',
        roles: '',
    });

    const handleUserData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const checkRole = response.data.result.roles;
            if (checkRole.some((role) => role.name === 'ADMIN')) {
                setCheckRole(true);
            }
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleUserData();
    }, []);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.result.username || '',
                firstname: user.result.firstname || '',
                lastname: user.result.lastname || '',
                roles: user.result.roles.length > 0 ? user.result.roles[0].name : '', // Chọn vai trò đầu tiên
            });
        }
    }, [user]);

    if (!user) {
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

    const handleDeleteUser = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.delete(`users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Delete successfully!');
            setViewUser(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <p style={{ cursor: 'pointer', width: '70px' }} onClick={() => setViewUser(false)}>
                &larr;Back
            </p>

            <div className={cx('container')}>
                <div className={cx('container-img')}>
                    <div className={cx('icon-wrap')}>
                        <FontAwesomeIcon className={cx('user-icon')} icon={faUser} />
                    </div>
                    <h4>{user.result.username}</h4>
                    <p style={{ fontSize: '12px' }}>{user.result.id}</p>
                </div>
                <div className={cx('container-info')}>
                    <p>First Name: {user.result.firstname}</p>
                    <p>Last Name: {user.result.lastname}</p>
                    <p>
                        Role:{' '}
                        {user.result.roles.length > 0
                            ? user.result.roles[user.result.roles.length - 1].name
                            : 'No role assigned'}
                    </p>

                    {!checkRole ? (
                        <div style={{ display: 'flex' }}>
                            <Button primary medium mgRight10 onClick={toggleUpdate}>
                                Update
                            </Button>
                            <Button className={cx('deletebtn')} medium onClick={handleDeleteUser}>
                                Delete
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>

            {update && (
                <Update
                    setUpdate={setUpdate}
                    formData={formData}
                    setFormData={setFormData}
                    closeUpdate={closeUpdate}
                    handleUserData={handleUserData}
                    id={id}
                />
            )}
        </div>
    );
}

export default ViewUser;
