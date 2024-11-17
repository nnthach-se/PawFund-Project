import { Form, Input } from 'antd';
import styles from './ForgotPassword.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import api from '~/config/axios';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ForgotPassword({ setOpenPopup }) {
    const [popupStep, setPopupStep] = useState(1);

    const handleEnterEmail = async (values) => {
        console.log(values);
        try {
            const response = await api.post(`auth/forgotPassword`, values, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            console.log(response.data.result.id);
            localStorage.setItem('forgotUserID', response.data.result.id);
            setPopupStep(2);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEnterOTP = async (values) => {
        console.log(values);
        const userId = localStorage.getItem('forgotUserID');
        console.log(userId);
        const dataSend = {
            userId: userId,
            ...values,
        };
        try {
            const response = await api.post(`auth/verifyEmail`, dataSend, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            console.log(response.data);
            setPopupStep(3);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEnterNewPW = async (values) => {
        console.log(values);
        const userId = localStorage.getItem('forgotUserID');
        const dataSend = {
            userId: userId,
            ...values,
        };
        try {
            const response = await api.post(`auth/resetPassword`, dataSend, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            alert('Reset Password Successfully');
            setTimeout(() => setOpenPopup(false), 2000);
        } catch (error) {
            console.log(error);
        }
    };

    const handleResend = async () => {
        const userId = localStorage.getItem('forgotUserID');
        const dataSend = {
            userId: userId,
        };

        try {
            const response = await api.post(`auth/resendVerifyEmail?checkEnabled=false`, dataSend, {
                headers: {
                    Authorization: `No Auth`,
                },
            });

            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    };
    return (
        <div className={cx('popup-fgpw')}>
            <div className={cx('popup-content')}>
                <h2>Reset Password</h2>

                {popupStep === 1 ? (
                    // first-step
                    <Form className={cx('form-enter-mail')} onFinish={handleEnterEmail}>
                        <Form.Item
                            className={cx('form-item')}
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: <span style={{ fontSize: 12 }}>Please enter an email</span>,
                                },
                            ]}
                        >
                            <Input className={cx('input')} type="email" placeholder="Email" />
                        </Form.Item>
                        <div className={cx('wrap-btn')}>
                            <Button small primary className={cx('opt-btn')} type="submit">
                                Send
                            </Button>
                        </div>
                    </Form>
                ) : popupStep === 2 ? (
                    // second-step
                    <Form className={cx('form-enter-mail')} onFinish={handleEnterOTP}>
                        <p>Check your email to get an OTP</p>
                        <Form.Item
                            className={cx('form-item')}
                            name="otp"
                            rules={[
                                {
                                    required: true,
                                    message: <span style={{ fontSize: 12 }}>Please enter an OTP</span>,
                                },
                            ]}
                        >
                            <Input className={cx('input')} type="text" placeholder="OTP" />
                        </Form.Item>
                        <p className={cx('send-again')} onClick={handleResend}>Send again</p>
                        <div className={cx('wrap-btn')}>
                            <Button small primary className={cx('opt-btn')} type="submit">
                                Send
                            </Button>
                        </div>
                    </Form>
                ) : (
                    // third-step
                    <Form className={cx('form-enter-mail')} onFinish={handleEnterNewPW}>
                        <Form.Item
                            className={cx('form-item')}
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: <span style={{ fontSize: 12 }}>Please enter an your new password</span>,
                                },
                            ]}
                        >
                            <Input className={cx('input')} type="password" placeholder="Enter your new password" />
                        </Form.Item>
                        <div className={cx('wrap-btn')}>
                            <Button small primary className={cx('opt-btn')} type="submit">
                                Send
                            </Button>
                        </div>
                    </Form>
                )}
            </div>

            <span className={cx('close-popup')} onClick={handleClosePopup}>
                &times;
            </span>
        </div>
    );
}

export default ForgotPassword;
