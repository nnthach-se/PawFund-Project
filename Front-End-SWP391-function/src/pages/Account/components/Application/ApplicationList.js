import classNames from 'classnames/bind';
import styles from './ApplicationList.module.scss';
import PetImages from '~/assets/images/petImg';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
import api from '~/config/axios';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';

const cx = classNames.bind(styles);

function ApplicationList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [appliList, setAppliList] = useState([]);
    const [petList, setPet] = useState([]);
    const [sortStatus, setSortStatus] = useState('ALL');

    // Lay application
    const getApplication = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const response = await api.get(`applications/sorted-by-user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setAppliList(response.data);
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
        }
    };
    console.log('Day la appliList', appliList);

    //Lay Pet Data
    const getPet = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await api.get(`pets`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setPet(response.data);
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
        }
    };
    // console.log('Day la pet List', petList);

    const convertDate = (isoDateString) => {
        const date = new Date(isoDateString); // Tạo đối tượng Date từ chuỗi ISO
        const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và đảm bảo có 2 chữ số
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tháng bắt đầu từ 0) và đảm bảo có 2 chữ số
        const year = date.getFullYear(); // Lấy năm

        return `${day}/${month}/${year}`; // Trả về định dạng ngày/tháng/năm
    };

    const combinedData = appliList.map((app) => {
        const pet = petList.find((p) => p.petId === app.petId); // Giả sử ứng dụng có thuộc tính petId
        return {
            ...app,
            petName: pet ? pet.petName : 'Chưa có tên', // Nếu không tìm thấy, hiển thị giá trị mặc định
        };
    });

    console.log(combinedData);

    const getStatusLabel = (status) => {
        let wordStatus = '';
        if (status === 0) {
            wordStatus = 'waiting';
        } else if (status === 1) {
            wordStatus = 'passed';
        } else if (status === 3) {
            wordStatus = 'approved';
        } else {
            wordStatus = 'denied';
        }
        switch (wordStatus) {
            case 'waiting':
                return 'Waiting'; // Trạng thái Waiting
            case 'approved':
                return 'Approved'; // Trạng thái Approved
            case 'denied':
                return 'Denied'; // Trạng thái Denied
            case 'passed':
                return 'Passed'; // Trạng thái Denied
            default:
                return ''; // Không có lớp cho trường hợp không xác định
        }
        // switch (status) {
        //     case 0:
        //         return 'Waiting';
        //     case 1:
        //     case 3:
        //         return 'Approved';
        //     case 2:
        //     case 4:
        //         return 'Denied';
        //     default:
        //         return 'Unknown'; // Trường hợp không xác định
        // }
    };

    const getStatusLabelClass = (status) => {
        let wordStatus = '';
        if (status === 0) {
            wordStatus = 'waiting';
        } else if (status === 1) {
            wordStatus = 'passed';
        } else if (status === 3) {
            wordStatus = 'approved';
        } else {
            wordStatus = 'denied';
        }
        switch (wordStatus) {
            case 'waiting':
                return 'waiting'; // Trạng thái Waiting
            case 'approved':
                return 'approved'; // Trạng thái Approved
            case 'denied':
                return 'denied'; // Trạng thái Denied
            case 'passed':
                return 'passed'; // Trạng thái Denied
            default:
                return ''; // Không có lớp cho trường hợp không xác định
        }
    };

    // Lọc và sắp xếp dựa trên status được chọn
    const filteredData = combinedData.filter((app) => {
        if (sortStatus === 'ALL') return true; // Không lọc nếu chọn ALL
        if (sortStatus === 'APPROVED') return app.status === 3;
        if (sortStatus === 'PASSED') return app.status === 1;
        if (sortStatus === 'DENIED') return app.status === 2 || app.status === 4;
        return app.status === parseInt(sortStatus, 10);
    });

    useEffect(() => {
        getApplication();
        getPet();
    }, []);

    const appliPerPage = 6;
    const indexOfLastPet = currentPage * appliPerPage;
    const indexOfFirstPet = indexOfLastPet - appliPerPage;
    const appliPage = filteredData.slice(indexOfFirstPet, indexOfLastPet);

    console.log('Day la sort status: ', sortStatus);
    return (
        <div className={cx('wrapper')}>
            <ScrollToTop />
            <div className={cx('sort')}>
                <label htmlFor="sortStatus">Sort by Status</label>
                <select id="sortStatus" value={sortStatus} onChange={(e) => setSortStatus(e.target.value)}>
                    <option value="ALL">All</option>
                    <option value="0">Waiting</option>
                    <option value="PASSED">Passed</option>
                    <option value="APPROVED">Approved</option> {/* Gộp status 1 và 3 vào "Approved" */}
                    <option value="DENIED">Denied</option> {/* Gộp status 2 và 4 vào "Denied" */}
                </select>
            </div>

            <div className={cx('application-list')}>
                {appliPage.map((appli) => (
                    <div className={cx('application-item')}>
                        <div className={cx('pet-info')}>
                            <img src={appli.pet.petImage} alt="pet image" />
                            <div className={cx('detail-info')}>
                                <h4>{appli.petName}</h4>
                            </div>
                            <div className={cx('appli-state')}>
                                <p className={cx(getStatusLabelClass(appli.status))}>{getStatusLabel(appli.status)}</p>
                                <a href={`/adopt-application/${appli.pet.petId}`}>View Details</a>
                            </div>
                        </div>
                        <p className={cx('appli-date')}>Create Date: {convertDate(appli.createAt)}</p>
                        <p className={cx('appli-date')}>Finish Date: {convertDate(appli.updateAt)}</p>
                    </div>
                ))}
                <div className={cx('pagination')}>
                    <Pagination
                        style={{ display: 'block' }}
                        current={currentPage}
                        defaultCurrent={1}
                        total={appliList.length}
                        pageSize={6}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
    );
}

export default ApplicationList;
