import Button from '~/components/Button';
import styles from './User.module.scss';
import classNames from 'classnames/bind';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import api from '~/config/axios';
import UserContent from './components/UserContent/UserContent';
import Search from './components/Search/Search';
import ViewUser from './components/ViewUser/ViewUser';
import { ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function User() {
    const [currentPage, setCurrentPage] = useState(1);
    const [userList, setUserList] = useState([]);
    const [dataLength, setDataLength] = useState(0);
    const [viewUser, setViewUser] = useState(false);
    const [userID, setUserID] = useState('');
    const [activeSort, setActiveSort] = useState('View All');
    const [searchName, setSearchName] = useState('');
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalAdmin, setTotalAdmin] = useState(0);
    const [totalVolunteer, setTotalVolunteer] = useState(0);
    const [filter, setFilter] = useState({
        role: 'ALL',
        sort: 'DESC',
        sortBy: 'createdAt',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const newSort =
            value == 'username'
                ? 'ASC'
                : value == 'createdAt'
                ? 'DESC'
                : value == 'applicationQuantity'
                ? 'DESC'
                : filter.sort;

        setFilter((prev) => ({
            ...prev,
            [name]: value,
            sort: newSort,
        }));
    };

    const handleUserData = async () => {
        const { role, sort, sortBy } = filter;
        const query = `role=${role}&sort=${sort}&sortBy=${sortBy}&keyword=${searchName}`;
        const token = localStorage.getItem('token');

        try {
            const response = await api.get(`users/search?${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);

            if (Array.isArray(response.data.result)) {
                setUserList(response.data.result);
                console.log('search username', response.data.result);
                setDataLength(response.data.result.length);
                localStorage.setItem('totalUser', response.data.result.length);
            } else {
                console.error('Error', response.data.result);
                setUserList([]);
            }
        } catch (error) {
            console.log(error);
            setUserList([]);
        }
    };

    const handleTotalAdmin = async () => {
        const query = `role=ADMIN&sort=&sortBy=&keyword=`;
        const token = localStorage.getItem('token');

        try {
            const response = await api.get(`users/search?${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (Array.isArray(response.data.result)) {
                setTotalAdmin(response.data.result.length);
            } else {
                console.error('Error', response.data.result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleTotalUser = async () => {
        const query = `role=USER&sort=&sortBy=&keyword=`;
        const token = localStorage.getItem('token');

        try {
            const response = await api.get(`users/search?${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (Array.isArray(response.data.result)) {
                setTotalUsers(response.data.result.length);
            } else {
                console.error('Error', response.data.result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleTotalVolunteer = async () => {
        const query = `role=VOLUNTEER&sort=&sortBy=&keyword=`;
        const token = localStorage.getItem('token');

        try {
            const response = await api.get(`users/search?${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (Array.isArray(response.data.result)) {
                setTotalVolunteer(response.data.result.length);
            } else {
                console.error('Error', response.data.result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleFinish = async (e) => {
        if (e) e.preventDefault();
        await handleUserData();

        const searchParams = {
            searchName,
            filter,
        };
        console.log(searchParams);
    };

    useEffect(() => {
        handleUserData();
        handleTotalAdmin();
        handleTotalUser();
        handleTotalVolunteer();
    }, [viewUser, filter, currentPage]);

    const userPerPage = 12;
    const indexOfLastUser = currentPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage;
    const currentUser = userList.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <>
            <div className={cx('wrapper')}>
                <h1>Users</h1>

                {!viewUser ? (
                    <>
                        <div className={cx('user-sum')}>
                            <div className={cx('user-sum-item')}>
                                <div>
                                    <p className={cx('item-number')}>{totalUsers + totalVolunteer + totalAdmin}</p>
                                    <p className={cx('item-label')}>Total Account</p>
                                </div>
                                <span>+2.15%</span>
                            </div>
                            <div className={cx('user-sum-item')}>
                                <div>
                                    <p className={cx('item-number')}>{totalUsers}</p>
                                    <p className={cx('item-label')}>Total User</p>
                                </div>
                                <span>-3.5%</span>
                            </div>
                            <div className={cx('user-sum-item')}>
                                <div>
                                    <p className={cx('item-number')}>{totalVolunteer}</p>
                                    <p className={cx('item-label')}>Total Volunteer</p>
                                </div>
                                <span>-3.5%</span>
                            </div>
                            <div className={cx('user-sum-item')}>
                                <div>
                                    <p className={cx('item-number')}>{totalAdmin}</p>
                                    <p className={cx('item-label')}>Total Admin</p>
                                </div>
                                <span>0%</span>
                            </div>
                        </div>

                        <div className={cx('user-content')}>
                            <div className={cx('header')}>
                                <div className={cx('sort')}>
                                    <p
                                        className={cx({ active: activeSort == 'View All' })}
                                        onClick={() => {
                                            setActiveSort('View All');
                                            setFilter((prev) => ({ ...prev, role: 'ALL' }));
                                            setCurrentPage(1);
                                        }}
                                    >
                                        View All
                                    </p>
                                    <p
                                        className={cx({ active: activeSort == 'Users' })}
                                        onClick={() => {
                                            setActiveSort('Users');
                                            setFilter((prev) => ({ ...prev, role: 'USER' }));
                                            setCurrentPage(1);
                                        }}
                                    >
                                        Users
                                    </p>
                                    <p
                                        className={cx({ active: activeSort == 'Volunteer' })}
                                        onClick={() => {
                                            setActiveSort('Volunteer');
                                            setFilter((prev) => ({ ...prev, role: 'VOLUNTEER' }));
                                            setCurrentPage(1);
                                        }}
                                    >
                                        Volunteer
                                    </p>
                                    <p
                                        className={cx({ active: activeSort == 'Admin' })}
                                        onClick={() => {
                                            setActiveSort('Admin');
                                            setFilter((prev) => ({ ...prev, role: 'ADMIN' }));
                                            setCurrentPage(1);
                                        }}
                                    >
                                        Admin
                                    </p>
                                </div>

                                <Search
                                    setSearchName={setSearchName}
                                    searchName={searchName}
                                    handleFinish={handleFinish}
                                    filter={filter}
                                    handleFilterChange={handleFilterChange}
                                />
                            </div>

                            <div className={cx('main-content')}>
                                <div className={cx('content-wrapper')}>
                                    <div className={cx('header-content')}>
                                        <p className={cx('id')}>ID</p>
                                        <p className={cx('name')}>Name</p>
                                        <p className={cx('role')}>Role</p>
                                        <p className={cx('appli')}>Number of application</p>
                                        <p className={cx('date')}>Enrolled</p>
                                        <p className={cx('action')}>Action</p>
                                    </div>

                                    {userList.length === 0 ? (
                                        <p style={{ textAlign: 'center', marginTop: 16 }}>No users found</p>
                                    ) : (
                                        <UserContent
                                            currentUser={currentUser}
                                            setViewUser={setViewUser}
                                            setUserID={setUserID}
                                        />
                                    )}
                                </div>
                                <div className={cx('pagination')}>
                                    <Pagination
                                        style={{ display: 'block' }}
                                        current={currentPage}
                                        defaultCurrent={1}
                                        total={dataLength}
                                        pageSize={userPerPage}
                                        onChange={(page) => setCurrentPage(page)}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <ViewUser id={userID} setViewUser={setViewUser} />
                )}
            </div>
        </>
    );
}

export default User;
