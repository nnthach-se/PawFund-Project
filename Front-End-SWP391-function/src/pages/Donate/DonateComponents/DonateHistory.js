import React, { useEffect, useState } from 'react';
import api from '~/config/axios';
import './DonateHistory.scss';
import { Pagination } from 'antd';

const DonateHistory = () => {
    const [donateData, setDonateData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalDonate, setTotalDonate] = useState([]);
    const [sortOption, setSortOption] = useState('dateDesc'); // Tùy chọn sắp xếp mặc định là date giảm dần
    const donatePerPage = 10;

    const getDonation = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            const response = await api.get(`payment/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTotalDonate(response.data);
            setDonateData(response.data.donations);
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
        }
    };

    // Hàm sắp xếp dựa trên lựa chọn của người dùng
    const sortData = (data) => {
        return data.sort((a, b) => {
            switch (sortOption) {
                case 'amountDesc':
                    return b.amount - a.amount;
                case 'amountAsc':
                    return a.amount - b.amount;
                case 'dateDesc': {
                    // Chuyển đổi chuỗi 'yyyyMMdd' thành đối tượng Date và sắp xếp giảm dần
                    const dateA = new Date(
                        parseInt(a.payDate.substring(0, 4)),
                        parseInt(a.payDate.substring(4, 6)) - 1,
                        parseInt(a.payDate.substring(6, 8)),
                    );
                    const dateB = new Date(
                        parseInt(b.payDate.substring(0, 4)),
                        parseInt(b.payDate.substring(4, 6)) - 1,
                        parseInt(b.payDate.substring(6, 8)),
                    );
                    return dateB - dateA;
                }
                case 'dateAsc': {
                    // Chuyển đổi chuỗi 'yyyyMMdd' thành đối tượng Date và sắp xếp tăng dần
                    const dateA = new Date(
                        parseInt(a.payDate.substring(0, 4)),
                        parseInt(a.payDate.substring(4, 6)) - 1,
                        parseInt(a.payDate.substring(6, 8)),
                    );
                    const dateB = new Date(
                        parseInt(b.payDate.substring(0, 4)),
                        parseInt(b.payDate.substring(4, 6)) - 1,
                        parseInt(b.payDate.substring(6, 8)),
                    );
                    return dateA - dateB;
                }
                default:
                    return 0;
            }
        });
    };

    useEffect(() => {
        getDonation();
    }, []);

    // Sắp xếp dữ liệu donate theo tùy chọn sắp xếp
    const sortedDonateData = sortData([...donateData]);
    const indexOfLastDonate = currentPage * donatePerPage;
    const indexOfFirstDonate = indexOfLastDonate - donatePerPage;
    const currentDonate = sortedDonateData.slice(indexOfFirstDonate, indexOfLastDonate);

    const onChangePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="donateHis">
            <div className="total_donation">
                <p>
                    <strong>Total Donate: </strong>
                    {totalDonate.totalAmount} VND
                </p>
            </div>
            <div className="sort-options">
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="dateDesc">
                        Date: Newest First <i class="fa-solid fa-arrow-down"></i>
                    </option>
                    <option value="dateAsc">
                        Date: Oldest First <i className="fa-solid fa-arrow-up"></i>
                    </option>
                    <option value="amountDesc">
                        Amount: High to Low <i class="fa-solid fa-arrow-down"></i>
                    </option>
                    <option value="amountAsc">
                        Amount: Low to High <i className="fa-solid fa-arrow-up"></i>
                    </option>
                </select>
            </div>
            <div className="donateHis_header">
                <p>ID</p>
                <p>Amount</p>
                <p>Bank</p>
                <p>Card Type</p>
                <p>Date</p>
            </div>
            <div className="donateHis_box">
                {currentDonate.map((don, index) => (
                    <div className="donateHis_box_each" key={index}>
                        <p className="donateHis_box_each_id">{index + 1 + indexOfFirstDonate}</p>
                        <p className="donateHis_box_each_amount">{don.amount}</p>
                        <p className="donateHis_box_each_bank">{don.bankCode}</p>
                        <p className="donateHis_box_each_card">{don.cardType}</p>
                        <p className="donateHis_box_each_date">{`${don.payDate.substring(6, 8)}/${don.payDate.substring(
                            4,
                            6,
                        )}/${don.payDate.substring(0, 4)}`}</p>
                    </div>
                ))}
                <div className="showAllPet_pagination">
                    <Pagination
                        current={currentPage}
                        pageSize={donatePerPage}
                        total={donateData.length}
                        onChange={onChangePage}
                        showSizeChanger={false} // Ẩn nút thay đổi số lượng hiển thị
                    />
                </div>
            </div>
        </div>
    );
};

export default DonateHistory;
