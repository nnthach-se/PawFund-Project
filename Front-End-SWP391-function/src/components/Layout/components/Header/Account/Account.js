import Button from '~/components/Button';
import styles from './Account.module.scss';
import classNames from 'classnames/bind';
import { Dropdown, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import api from '~/config/axios';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Account() {
    const navigate = useNavigate();
    const [notiData, setNotiData] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const role = JSON.parse(localStorage.getItem('userRoles'));
    const isAdmin = role?.includes('ADMIN');

    const handleLogout = async () => {
        const rfToken = localStorage.getItem('refreshToken');
        try {
            const response = await api.post(
                'auth/logout',
                {
                    token: rfToken,
                },
                {
                    headers: {
                        Authorization: `No Auth`,
                    },
                },
            );
            console.log('logout success', response.data);
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userInfo');
            localStorage.removeItem('userId');
            localStorage.removeItem('userRoles');
            navigate('/');
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const hanndleToLogin = () => {
        navigate('/login', { state: { from: window.location.pathname } });
    };

    const handleToRegister = () => {
        navigate('/register', { state: { from: window.location.pathname } });
    };

    const items = [
        ...(isAdmin
            ? [
                  {
                      label: (
                          <Link
                              style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500, cursor: 'pointer' }}
                              to="/admin"
                          >
                              Admin
                          </Link>
                      ),
                  },
              ]
            : []),
        {
            label: (
                <Link
                    style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500, cursor: 'pointer' }}
                    to="/account"
                >
                    My Account
                </Link>
            ),
        },
        {
            label: (
                <Link
                    style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500, cursor: 'pointer' }}
                    to="/"
                    onClick={handleLogout}
                >
                    Log Out
                </Link>
            ),
        },
    ];

    const formatDueDate = (dueDate) => {
        const formattedDate = dueDate.slice(0, 16).replace('T', ' / ');
        return formattedDate;
    };

    const handleNotiData = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        try {
            const response = await api.get(`applications/sorted-by-user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Noti Data', response.data);
            const filterApplication = response.data.filter((app) => app.status !== 0);
            setNotiData(filterApplication);
            console.log('noti done / fail', filterApplication);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleNotiData();
    }, []);

    const handleViewClick = (e) => {
        e.stopPropagation();
        console.log('View clicked');
    };

    const menu = (
        <Menu className={cx('custom-menu')}>
            {notiData.length === 0 ? (
                <p style={{ marginBottom: 0, padding: 10 }}>No notifications found</p>
            ) : (
                <>
                    {notiData.map((item) => (
                        <Menu.Item key={item.applicationId}>
                            <div className={cx('noti-item')} onClick={handleViewClick}>
                                <div className={cx('noti-text')}>
                                    <p className={cx('name')}>
                                        <b>Adopt application for {item.pet.petName}</b>
                                    </p>
                                    <p
                                        className={cx('status', {
                                            'status-fail': item.status === 2,
                                        })}
                                    >
                                        {item.status === 1 ? 'Done' : 'Fail'}
                                    </p>
                                </div>
                                <div className={cx('noti-text')}>
                                    <p
                                        className={cx('finish')}
                                        onClick={() => {
                                            console.log('finish');
                                        }}
                                    >
                                        Update at: {formatDueDate(item.updateAt)}
                                    </p>
                                    <p className={cx('view')} style={{ cursor: 'pointer' }} onClick={handleViewClick}>
                                        View
                                    </p>
                                </div>
                            </div>
                        </Menu.Item>
                    ))}
                </>
            )}
        </Menu>
    );

    return (
        <div className={cx('account')}>
            {userInfo ? (
                <>
                    {/* <Dropdown overlay={menu} placement="bottomRight">
                        <span>
                            <FontAwesomeIcon icon={faBell} className={cx('icon-header')} />
                        </span>
                    </Dropdown> */}

                    <Dropdown menu={{ items }}>
                        <span className={cx('username')}>
                            <p>{userInfo.username}</p>
                            <FontAwesomeIcon icon={faUser} className={cx('icon-user')} />
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
                    </Button>
                </>
            )}
        </div>
    );
}

export default Account;
