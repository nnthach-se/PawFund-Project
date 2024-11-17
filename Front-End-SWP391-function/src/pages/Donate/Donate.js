import React, { useEffect, useState } from 'react';
import './Donate.scss';
import IMAGES from '~/assets/images';
import Button from '~/components/Button';
import Form from 'react-bootstrap/Form';
import { DefaultLayout } from '~/components/Layout';
import axios from 'axios';
import api from '~/config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

export const Donate = () => {
    const navigate = useNavigate();
    const [selectedAmount, setSelectedAmount] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const amounts = [50000, 100000, 500000, 1000000];
    const { id } = useParams();
    const userId = localStorage.getItem('userId');
    console.log('Day la userId:', userId);
    console.log('Day la id: ', id);

    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e) => {
        setSelectedAmount(null);
        setCustomAmount(e.target.value);
    };

    console.log(selectedAmount);
    console.log(customAmount);
    // Function của các thể loại nút
    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            if (!selectedAmount) {
                toast.error('Please choose a value to donate');
                return;
            }
            try {
                const callbackUrl = `${window.location.origin}/payment/vn-pay/callback`;
                // console.log(token);
                try {
                    const response = await api.get(
                        `payment/vn-pay?userId=${userId}&petId=${id}&amount=${selectedAmount}&bankCode=NCB`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );
                    console.log('Data cua payment ', response.data);
                    const paymentUrl = response.data.data.paymentUrl;
                    console.log('day la url:', response.data.paymentUrl);
                    if (paymentUrl) {
                        window.location.href = paymentUrl; // Điều hướng đến cổng thanh toán
                    } else {
                        alert('Cannot find payment URL.');
                    }
                } catch (error) {
                    console.log(error);
                    console.error('Error submitting form:', error);
                    if (error.response) {
                        console.log('Error Data:', error.response.data);
                    } else {
                        console.log('Error Message:', error.message);
                    }
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                if (error.response) {
                    console.log('Error Data:', error.response.data);
                } else {
                    console.log('Error Message:', error.message);
                }
            }
        }
    };

    return (
        <div className="donation-container">
            {/* Buoc 1 */}
            <div className="step-1">
                <h3 className="donation">DONATION</h3>
                <div className="donation-options">
                    <img className="image" alt="image" src={IMAGES.donatepic} />
                    <div className="donate-content">
                        <div className="select-amount">
                            <h3>Select the amount of aid</h3>
                            <p>All plans are in VND</p>
                        </div>

                        {/* chon gia tien donate  */}
                        <div className="amount-buttons">
                            <div className="button-display">
                                {amounts.map((amount) => (
                                    <Button
                                        donateButton
                                        large
                                        key={amount}
                                        className={`donate-button ${selectedAmount === amount ? 'selected' : ''}`}
                                        onClick={() => handleAmountSelect(amount)}
                                    >
                                        {amount.toLocaleString('vi-VN')} VND
                                    </Button>
                                ))}
                            </div>
                            {/* thanh input another amount  */}
                            {/* <div className="input-save">
                                <Form.Control
                                    type="number"
                                    placeholder="Another Amount"
                                    value={customAmount}
                                    onChange={handleCustomAmountChange}
                                />
                            </div> */}
                            {/* nut save  */}
                            {/* <Button className="save-button" onClick={handleSubmit}>
                                SAVE
                            </Button> */}
                            <button onClick={handleSubmit} className="save-button">
                                Donate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            {/* phan text o duoi bang donate  */}
            <div className="text-wrap">
                <div className="text-wrap-1">
                    <h3 className="what-is-included">What is included in your donation?</h3>
                    <p className="text-1">
                        Taking care of a big pack has a lot of challenges. We have a big tribe of people who help us get
                        our dogs neutered, fed, cleaned and loved every single day. Each dog has a cost around $36 per
                        month. This includes veterinary care, food costs and maintenance to our shelter.
                    </p>
                </div>

                <div className="text-wrap-2">
                    <div className="text-wrap-3">
                        <h3 className="veterinary">Veterinary care</h3>
                        <p className="text-2">
                            We neuter and deworm every new dog we receive in our shelter. There are some extreme cases
                            that take a lot of resources with surgeries, amputations and other major operations; but on
                            average each healthy dog we have costs us around $25 yearly for basic medication and
                            veterinary care.
                        </p>
                    </div>
                    <div className="text-wrap-4">
                        <h3 className="shelter">Shelter/Farm</h3>
                        <p className="text-3">
                            We neuter and deworm every new dog we receive in our shelter. There are some extreme cases
                            that take a lot of resources with surgeries, amputations and other major operations; but on
                            average each healthy dog we have costs us around $25 yearly for basic medication and
                            veterinary care.
                        </p>
                    </div>
                    <div className="text-wrap-5">
                        <h3 className="food-cost">Food Costs</h3>
                        <p className="text-4">
                            We neuter and deworm every new dog we receive in our shelter. There are some extreme cases
                            that take a lot of resources with surgeries, amputations and other major operations; but on
                            average each healthy dog we have costs us around $25 yearly for basic medication and
                            veterinary care.
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Donate;
