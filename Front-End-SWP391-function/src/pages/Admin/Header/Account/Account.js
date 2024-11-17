import { DogIcon, HeartIcon, NotiIcon, UserIcon } from '~/components/Icons/Icons';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import styles from './Account.module.scss';
import classNames from 'classnames/bind';
import { Dropdown, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Account() {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && key.includes('user')) {
                localStorage.removeItem(key);
            }
        }
        navigate('/');
    };

    const hanndleToLogin = () => {
        navigate('/login', { state: { from: window.location.pathname } });
    };

    const handleToRegister = () => {
        navigate('/register', { state: { from: window.location.pathname } });
    };

    const items = [
        {
            label: (
                <Link style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500 }} to="/admin">
                    Admin
                </Link>
            ),
        },
        // moi them
        // {
        //     label: (
        //         <Link style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500 }} to="/account">
        //             My Application
        //         </Link>
        //     ),
        // },
        // {
        //     label: (
        //         <Link style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500 }} to="/account">
        //             My Pet
        //         </Link>
        //     ),
        // },
        /////////////////////////////////////////////////////////////////
        {
            label: (
                <Link style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500 }} to="/account">
                    My Account
                </Link>
            ),
        },
        {
            label: (
                <Link
                    style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500 }}
                    to="/"
                    onClick={() => {
                        handleLogout();
                    }}
                >
                    Log Out
                </Link>
            ),
        },
    ];

    const data = [
        {
            id: 5,
            name: 'John nguyen alo mot hai ba adoption',
            status: 'Done',
            finishDate: '20-10-2024',
        },
        {
            id: 4,
            name: 'John nguyen alo mot hai ba adoption',
            status: 'Done',
            finishDate: '20-10-2024',
        },
        {
            id: 3,
            name: 'John nguyen alo mot hai ba adoption',
            status: 'Done',
            finishDate: '20-10-2024',
        },
        {
            id: 2,
            name: 'John nguyen alo mot hai ba adoption',
            status: 'Done',
            finishDate: '20-10-2024',
        },
        {
            id: 1,
            name: 'John nguyen alo mot hai ba adoption',
            status: 'Done',
            finishDate: '20-10-2024',
        },
        {
            id: 6,
            name: 'John nguyen alo mot hai ba adoption',
            status: 'Done',
            finishDate: '20-10-2024',
        },
    ];

    const handleNotiData = async () => {
        const token = localStorage.getItem('token');
    };

    const handleViewClick = (e) => {
        e.stopPropagation();
        console.log('View clicked');
    };

    const menu = (
        <Menu className={cx('custom-menu')}>
            {data.map((item) => (
                <Menu.Item key={item.id}>
                    <div className={cx('noti-item')} onClick={handleViewClick}>
                        <div className={cx('noti-text')}>
                            <p className={cx('name')}>
                                <b>{item.name}</b>
                            </p>
                            <p className={cx('status')}>{item.status}</p>
                        </div>
                        <div className={cx('noti-text')}>
                            <p
                                className={cx('finish')}
                                onClick={() => {
                                    console.log('finish');
                                }}
                            >
                                Finish: {item.finishDate}
                            </p>
                            <p className={cx('view')} style={{ cursor: 'pointer' }} onClick={handleViewClick}>
                                View
                            </p>
                        </div>
                    </div>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div className={cx('account')}>
            {userInfo ? (
                <>
                    <Dropdown overlay={menu}>
                        <span>
                            <FontAwesomeIcon icon={faBell} className={cx('icon-header')} />
                        </span>
                    </Dropdown>

                    <Dropdown menu={{ items }}>
                        <span className={cx('username')}>
                            <p>{userInfo.username}</p> <FontAwesomeIcon icon={faUser} className={cx('icon-user')} />
                        </span>
                    </Dropdown>
                </>
            ) : (
                <>
                    <Button mgRight10 medium primary onClick={hanndleToLogin}>
                        Log In
                    </Button>
                    <Button medium outline onClick={handleToRegister}>
                        Register
                    </Button>{' '}
                </>
            )}
        </div>
    );
}

export default Account;
