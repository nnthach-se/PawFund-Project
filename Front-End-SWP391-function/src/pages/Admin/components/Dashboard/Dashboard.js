import styles from './Dashboard.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { ICONS_ADMIN } from '~/assets/icons/adminicon';
import api from '~/config/axios';
import LineChart from './DashboardComponent/Linechart';

const cx = classNames.bind(styles);

function Dashboard() {
    const [totalAppli, setTotalAppli] = useState(0);
    const [donateData, setDonateData] = useState(0);
    const [userData, setUserData] = useState(0);
    const [petData, setPetData] = useState(0);
    const [chartData, setChartData] = useState({
        donateData: [],
        totalPets: [],
        totalUsers: [],
    });

    const getDonateData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get(`payment/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.totalAmount; // Trả về giá trị
        } catch (error) {
            console.log(error);
            return 0; // Trả về 0 nếu có lỗi
        }
    };

    const getApplication = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get(`applications/status/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.length; // Trả về giá trị
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
            return 0; // Trả về 0 nếu có lỗi
        }
    };

    const getPet = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get(`pets`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.length; // Trả về giá trị
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
            return 0; // Trả về 0 nếu có lỗi
        }
    };

    const getUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get(`users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.result.length; // Trả về giá trị
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
            return 0; // Trả về 0 nếu có lỗi
        }
    };

    useEffect(() => {
        const loadChartData = () => {
            const savedChartData = JSON.parse(localStorage.getItem('chartData'));
            if (savedChartData) {
                setChartData(savedChartData);
            }
        };

        loadChartData(); // Load saved chart data on component mount

        const fetchData = async () => {
            const [fetchedUserData, fetchedPetData, fetchedDonateData, fetchedApplicationData] = await Promise.all([
                getUser(),
                getPet(),
                getDonateData(),
                getApplication(),
            ]);

            setUserData(fetchedUserData);
            setPetData(fetchedPetData);
            setDonateData(fetchedDonateData);
            setTotalAppli(fetchedApplicationData);

            // Cập nhật chartData sau khi nhận dữ liệu mới
            setChartData((prev) => {
                let newDonateData = [...prev.donateData, fetchedDonateData];
                let newTotalUsers = [...prev.totalUsers, fetchedUserData];
                let newTotalPets = [...prev.totalPets, fetchedPetData];

                // Kiểm tra nếu đã đến tháng 12, nếu đúng thì quay lại tháng 1
                if (newDonateData.length > 12) {
                    newDonateData = [fetchedDonateData]; // Reset lại về tháng 1
                }
                if (newTotalUsers.length > 12) {
                    newTotalUsers = [fetchedUserData]; // Reset lại về tháng 1
                }
                if (newTotalPets.length > 12) {
                    newTotalPets = [fetchedPetData]; // Reset lại về tháng 1
                }

                const newChartData = {
                    donateData: newDonateData,
                    totalUsers: newTotalUsers,
                    totalPets: newTotalPets,
                };

                // Lưu dữ liệu mới vào localStorage
                localStorage.setItem('chartData', JSON.stringify(newChartData));
                return newChartData;
            });
        };

        fetchData(); // Fetch data on component mount

        const interval = setInterval(fetchData, 15000);
        return () => clearInterval(interval); // Clear interval on component unmount
    }, []); // Chỉ chạy một lần khi component được mount

    const donateChartData = {
        labels: Array.from({ length: chartData.donateData.length }, (_, i) => `Tháng ${i + 1}`), // Dynamically generate labels
        datasets: [
            {
                label: 'Tiền Donate',
                data: chartData.donateData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const petChartData = {
        labels: Array.from({ length: chartData.totalPets.length }, (_, i) => `Tháng ${i + 1}`),
        datasets: [
            {
                label: 'Số Pet',
                data: chartData.totalPets,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
            },
        ],
    };

    const userChartData = {
        labels: Array.from({ length: chartData.totalUsers.length }, (_, i) => `Tháng ${i + 1}`),
        datasets: [
            {
                label: 'Số User',
                data: chartData.totalUsers,
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <div className={cx('dashboard-wrapper')}>
                <div className={cx('dashboard-sum')}>
                    <div className={cx('dashboard-sum-item')}>
                        <div>
                            <p className={cx('item-number')}>
                                <i className="fa-solid fa-dollar-sign"></i> {donateData} VND
                            </p>
                            <p className={cx('item-label')}>Total Donation</p>
                        </div>
                        <span>
                            <img src={ICONS_ADMIN.moneyPri} />
                        </span>
                    </div>
                    <div className={cx('dashboard-sum-item')}>
                        <div>
                            <p className={cx('item-number')}>
                                <i className="fa-solid fa-paw"></i> {petData}
                            </p>
                            <p className={cx('item-label')}>Total Pets</p>
                        </div>
                        <span>
                            <img src={ICONS_ADMIN.petPri} />
                        </span>
                    </div>
                    <div className={cx('dashboard-sum-item')}>
                        <div>
                            <p className={cx('item-number')}>
                                <i className="fa-solid fa-user"></i> {userData}
                            </p>
                            <p className={cx('item-label')}>Total Users</p>
                        </div>
                        <span>
                            <img src={ICONS_ADMIN.userPri} />
                        </span>
                    </div>
                    <div className={cx('dashboard-sum-item')}>
                        <div>
                            <p className={cx('item-number')}>
                                <i className="fa-solid fa-file"></i> {totalAppli}
                            </p>
                            <p className={cx('item-label')}>Total Applications</p>
                        </div>
                        <span>
                            <img src={ICONS_ADMIN.appliPri} style={{ width: 20 }} />
                        </span>
                    </div>
                </div>

                <div className={cx('dashboard-main')}>
                    <div className={cx('chart-container')}>
                        <LineChart data={donateChartData} title="Donation Line Chart" />
                    </div>
                    <div className={cx('chart-container')}>
                        <LineChart data={petChartData} title="Pet Amount Line Chart" />
                    </div>
                    <div className={cx('chart-container')}>
                        <LineChart data={userChartData} title="User Amount Line Chart" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
