import { UserIcon } from '~/components/Icons/Icons';
import styles from './Account.module.scss';
import classNames from 'classnames/bind';
import Information from './components/Information';
import ApplicationList from './components/Application/ApplicationList';
import { useEffect, useState } from 'react';
import VolunteerTasks from './components/Volunteer';
import React from 'react';
// import PetListInfor from './components/Pet/petListInfor';
import PetListInfor from './components/PetListInfo/PetListInfo';
import api from '~/config/axios';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';
import DonateHistory from '../Donate/DonateComponents/DonateHistory';
import MyBlog from './components/MyBlog/MyBlog';
import MyEvent from './components/MyEvent/MyEvent';

const cx = classNames.bind(styles);

function Account() {
    const [content, setContent] = useState('account');
    const userRole = localStorage.getItem('userRoles');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Lay user by id
    const getUser = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const response = await api.get(`users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(response.data.result); // Lưu dữ liệu vào state
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
        } finally {
            setLoading(false); // Hoàn tất quá trình tải
        }
    };
    console.log('Day la user:', user);

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <p>Loading pet information...</p> // Hiển thị khi đang tải
            ) : user ? (
                <>
                    <ScrollToTop />
                    <div className={cx('sidebar')}>
                        <div className={cx('account')}>
                            <span className={cx('username')}>
                                <UserIcon /> {user.username}
                            </span>
                        </div>

                        <div className={cx('sidebar-item')}>
                            <p
                                className={cx(content === 'account' ? 'active' : '')}
                                onClick={() => setContent('account')}
                            >
                                Account Information
                            </p>
                            <p
                                className={cx(content === 'appliList' ? 'active' : '')}
                                onClick={() => setContent('appliList')}
                            >
                                Application List
                            </p>
                            <p
                                className={cx(content === 'petList' ? 'active' : '')}
                                onClick={() => setContent('petList')}
                            >
                                Pet List
                            </p>
                            <p
                                className={cx(content === 'donateHistory' ? 'active' : '')}
                                onClick={() => setContent('donateHistory')}
                            >
                                Donate History
                            </p>
                            <p
                                className={cx(content === 'myBlog' ? 'active' : '')}
                                onClick={() => setContent('myBlog')}
                            >
                                My Blog
                            </p>

                            {userRole.includes('SHELTER_STAFF') ? (
                                <p
                                    className={cx(content === 'myEvent' ? 'active' : '')}
                                    onClick={() => setContent('myEvent')}
                                >
                                    My Event
                                </p>
                            ) : (
                                ''
                            )}

                            {userRole.includes('VOLUNTEER') ? (
                                <p
                                    className={cx(content === 'tasks' ? 'active' : '')}
                                    onClick={() => setContent('tasks')}
                                >
                                    Volunteer Tasks
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div className={cx('content')}>
                        {/* {content === 'account' ? (
                    <Information />
                ) : content === 'tasks' ? (
                    <VolunteerTasks />
                ) : (
                    <ApplicationList />
                )} */}

                        {content === 'account' ? (
                            <Information />
                        ) : content === 'tasks' ? (
                            <VolunteerTasks />
                        ) : content === 'appliList' ? (
                            <ApplicationList />
                        ) : content === 'petList' ? (
                            <PetListInfor />
                        ) : content === 'donateHistory' ? (
                            <DonateHistory />
                        ) : content === 'myBlog' ? (
                            <MyBlog />
                        ) : (
                            <MyEvent />
                        )}
                    </div>
                </>
            ) : (
                <p>Pet data not available</p> // Hiển thị nếu không có dữ liệu
            )}
        </div>
    );
}

export default Account;
