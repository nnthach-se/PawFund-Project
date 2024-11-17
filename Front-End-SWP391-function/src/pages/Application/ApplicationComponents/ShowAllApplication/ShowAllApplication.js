import React, { useEffect, useState } from 'react';
import api from '~/config/axios';
import './ShowAllApplication.scss';
import { Pagination } from 'antd';

const ShowAllApplication = () => {
    const [appliList, setAppliList] = useState([]);
    const [petList, setPet] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const appliPerPage = 10;

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

            setAppliList(response.data); // Lưu dữ liệu vào state
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

            setPet(response.data); // Lưu dữ liệu vào state
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
        }
    };
    console.log('Day la pet List', petList);

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

    const getStatusLabel = (status) => {
        switch (status) {
            case 0:
                return 'Waiting';
            case 1:
            case 3:
                return 'Approved';
            case 2:
            case 4:
                return 'Denied';
            default:
                return 'Unknown'; // Trường hợp không xác định
        }
    };

    const getStatusLabelClass = (status) => {
        switch (status) {
            case 0:
                return 'waiting'; // Trạng thái Waiting
            case 1:
            case 3:
                return 'approved'; // Trạng thái Approved
            case 2:
            case 4:
                return 'denied'; // Trạng thái Denied
            default:
                return ''; // Không có lớp cho trường hợp không xác định
        }
    };

    const indexOfLastPet = currentPage * appliPerPage;
    const indexOfFirstPet = indexOfLastPet - appliPerPage;
    const currentAppli = combinedData.slice(indexOfFirstPet, indexOfLastPet);

    // Hàm chuyển trang
    const onChangePage = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getApplication(); // Gọi hàm để lấy dữ liệu khi component được mount
        getPet();
    }, []); // Chỉ chạy 1 lần khi component được mount

    // useEffect(() => {
    //     console.log('Day la appliList', appliList);
    // }, [appliList]); // Ghi log mỗi khi appliList thay đổi

    return (
        <div className="showAllAppli">
            <div className="showAllAppli_box">
                <h3 className="showAllAppli_box_title">My Application List</h3>
                <div className="showAllAppli_box_header"></div>
                <div className="showAllAppli_box_appliBox_wrap">
                    <div className="showAllAppli_box_appliBox">
                        <div className="showAllAppli_box_appliBox_header">
                            <p>Name</p>
                            <p>Pet</p>
                            <p>Status</p>
                            <p>Create Date</p>
                            <p>Action</p>
                        </div>
                        {currentAppli.map((appli) => (
                            <div className="showAllAppli_box_appliBox_eachAppli">
                                <div className="appliInfo">
                                    <div className="appliInfo_name">
                                        <p>{appli.fullName}</p>
                                    </div>
                                    <div className="appliInfo_petName">
                                        <p>{appli.petName}</p>
                                    </div>
                                    <div className="appliInfo_status">
                                        <p className={getStatusLabelClass(appli.status)}>
                                            {getStatusLabel(appli.status)}
                                        </p>
                                    </div>
                                    <div className="appliInfo_createAt">
                                        <p>{convertDate(appli.createAt)}</p>
                                    </div>
                                    <div className="appliInfo_action">
                                        <a href="">View Details</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Phân trang */}
                        <div className="showAllAppli_pagination">
                            <Pagination
                                current={currentPage}
                                pageSize={appliPerPage}
                                total={appliList.length}
                                onChange={onChangePage}
                                showSizeChanger={false} // Ẩn nút thay đổi số lượng hiển thị
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowAllApplication;
