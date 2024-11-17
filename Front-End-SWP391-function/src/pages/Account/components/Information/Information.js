import IMAGES from '~/assets/images';
import styles from './Information.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import api from '~/config/axios';
import Button from '~/components/Button';
import { toast, ToastContainer } from 'react-toastify';
import React from 'react';

const cx = classNames.bind(styles);

function Information() {
    const [userInfo, setUserInfo] = useState(() => {
        const savedUserInfo = localStorage.getItem('userInfo');
        return savedUserInfo ? JSON.parse(savedUserInfo) : {};
    });
    const token = localStorage.getItem('token');

    const [usernameError, setUsernameError] = useState('');
    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (name === 'username') setUsernameError('');
        if (name === 'firstname') setFirstnameError('');
        if (name === 'lastname') setLastnameError('');
    };

    const handleChangeInfo = async (e) => {
        e.preventDefault();
        const id = localStorage.getItem('userId');
        const role = localStorage.getItem('userRoles');
        console.log(id);

        if (!id) {
            console.error('User ID is null or undefined');
            return;
        }

        const { username, firstname, lastname } = userInfo;

        let hasError = false;
        if (!username || username.length < 6) {
            setUsernameError('Username must be at least 6 characters and cannot be empty.');
            hasError = true;
        }

        const hasNumbers = /\d/;
        if (hasNumbers.test(firstname)) {
            setFirstnameError('First name cannot contain numbers.');
            hasError = true;
        }
        if (hasNumbers.test(lastname)) {
            setLastnameError('Last name cannot contain numbers.');
            hasError = true;
        }

        if (hasError) return;

        let roles;
        try {
            roles = JSON.parse(role);
        } catch (error) {
            console.error('Error parsing roles:', error);
            return;
        }

        try {
            await api.put(
                `users/${id}`,
                { username, firstname, lastname, roles },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            toast.success('Update successful');

            const userInfo = await api.get('users/info', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.setItem('userInfo', JSON.stringify(userInfo.data.result));
            setUserInfo(userInfo.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div>
                <div className={cx('header')}>
                    <h1>Account Information</h1>
                </div>
                <form className={cx('form')} onSubmit={handleChangeInfo}>
                    <div className={cx('form-item')}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={userInfo.username || ''}
                                onChange={handleChange}
                            />
                        </div>
                        {usernameError && <p className={cx('error')}>{usernameError}</p>}
                    </div>

                    <div className={cx('form-item')}>
                        <div>
                            <label htmlFor="firstname">First Name</label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={userInfo.firstname || ''}
                                onChange={handleChange}
                            />
                        </div>
                        {firstnameError && <p className={cx('error')}>{firstnameError}</p>}
                    </div>

                    <div className={cx('form-item')}>
                        <div>
                            <label htmlFor="lastname">Last Name</label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={userInfo.lastname || ''}
                                onChange={handleChange}
                            />
                        </div>
                        {lastnameError && <p className={cx('error')}>{lastnameError}</p>}
                    </div>

                    <div className={cx('form-item')}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={userInfo.email} readOnly />
                        </div>
                    </div>

                    <div className={cx('save-btn')}>
                        <Button primary type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </div>
            <div className={cx('image')}>
                <img src={IMAGES.usetPet} alt="User Pet" />
            </div>
        </div>
    );
}

export default Information;
