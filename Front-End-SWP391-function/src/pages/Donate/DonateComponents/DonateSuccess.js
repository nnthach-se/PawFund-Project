import React, { useEffect, useState } from 'react';
import IMAGES from '~/assets/images';
import Button from '~/components/Button';
import './DonateSuccess.scss';
import api from '~/config/axios';
import { useLocation } from 'react-router-dom';

const DonateSuccess = () => {
    const location = useLocation();
    const [isRequestSent, setIsRequestSent] = useState(false);

    useEffect(() => {
        if (isRequestSent) return; // Nếu yêu cầu đã gửi, không làm gì cả.

        const queryParams = new URLSearchParams(location.search);

        // Lấy từng tham số từ query string
        const userId = queryParams.get('userId');
        const amount = queryParams.get('vnp_Amount');
        const bankCode = queryParams.get('vnp_BankCode');
        const bankTranNo = queryParams.get('vnp_BankTranNo');
        const cardType = queryParams.get('vnp_CardType');
        const orderInfo = queryParams.get('vnp_OrderInfo');
        const payDate = queryParams.get('vnp_PayDate');
        const responseCode = queryParams.get('vnp_ResponseCode');
        const tmnCode = queryParams.get('vnp_TmnCode');
        const transactionNo = queryParams.get('vnp_TransactionNo');
        const transactionStatus = queryParams.get('vnp_TransactionStatus');
        const txnRef = queryParams.get('vnp_TxnRef');
        const secureHash = queryParams.get('vnp_SecureHash');

        const nhanTienVe = async () => {
            try {
                const response = await api.get(
                    `payment/vn-pay-callback?userId=${userId}&vnp_Amount=${amount}&vnp_BankCode=${bankCode}&vnp_BankTranNo=${bankTranNo}&vnp_CardType=${cardType}&vnp_OrderInfo=${orderInfo}&vnp_PayDate=${payDate}&vnp_ResponseCode=${responseCode}&vnp_TmnCode=${tmnCode}&vnp_TransactionNo=${transactionNo}&vnp_TransactionStatus=${transactionStatus}&vnp_TxnRef=${txnRef}&vnp_SecureHash=${secureHash}`,
                );
                console.log('Response:', response.data);
                setIsRequestSent(true); // Đánh dấu yêu cầu đã gửi
            } catch (error) {
                console.log(error);
            }
        };

        nhanTienVe();
    }, [isRequestSent, location.search]);

    return (
        <div className="donate_success">
            <div className="donate_success_container">
                <div className="donate_success_container_header"></div>
                <img alt="image" src={IMAGES.greenTick} />
                <div className="donate_success_container_content">
                    <h3 className="donate_success_container_success">Success</h3>
                    <h3 className="donate_success_container_thank">Thank You for Saving a Life!</h3>
                    <p className="donate_success_container_yourDonation">
                        Your donation will help feed and care for abandoned pets.
                    </p>
                </div>
                <div className="donate_success_container_button">
                    <Button className="donate_success_container_button_btn" to="/">
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DonateSuccess;
