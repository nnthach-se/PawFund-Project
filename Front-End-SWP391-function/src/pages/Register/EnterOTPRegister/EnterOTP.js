import { Form, Input } from 'antd';
import styles from './EnterOTP.module.scss';
import classNames from 'classnames/bind';
import api from '~/config/axios';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function EnterOTP({setVerifyMsg, from, setToVerify}) {
    const navigate = useNavigate();

    const handleVerify = async (values) => {
        console.log(values);
        const userId = localStorage.getItem('userId');
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

            setVerifyMsg('Verify email successfully!');

            setTimeout(() => {
                localStorage.removeItem('isVerifying'); 
                navigate('/login', { state: { from } });
            }, 2000);
        } catch (error) {
            setVerifyMsg('Invalid OTP');
            console.log(error);
        }
    };

    const handleResend = async () => {
        const userId = localStorage.getItem('userId');
        const dataSend = {
            userId: userId,
        };

        try {
            const response = await api.post(`auth/resendVerifyEmail?checkEnabled=true`, dataSend, {
                headers: {
                    Authorization: `No Auth`,
                },
            });

            console.log(response.data);
            setVerifyMsg('Verify email successfully!');
        } catch (error) {
            setVerifyMsg('Invalid OTP');
            console.log(error);
        }
    };
    return (
        <Form className={cx('form-otp')} onFinish={handleVerify}>
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
            <p className={cx('send-again')} onClick={handleResend}>
                Send again
            </p>
            <div className={cx('wrap-btn')}>
                <Button mgRight10 medium primary className={cx('opt-btn')} type="submit">
                    Verify
                </Button>
                <Button medium outline className={cx('otp-btn')} onClick={() => setToVerify(false)}>
                    Register
                </Button>
            </div>
        </Form>
    );
}

export default EnterOTP;
