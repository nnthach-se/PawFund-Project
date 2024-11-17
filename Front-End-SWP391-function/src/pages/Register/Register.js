import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { Form, Input } from 'antd';
import Button from '~/components/Button';
import IMAGES from '~/assets/images';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginHeader from './LoginHeader';
import api from '~/config/axios';
import { OAuthConfig } from '../Login/components/GGconfig/configuration';
import EnterOTP from './EnterOTPRegister';
import LoginGoogle from '../Login/components/LoginGoogle';

const cx = classNames.bind(styles);

function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const [successMsg, setSuccessMsg] = useState('');
    const [toVerify, setToVerify] = useState(false);
    const [verifyMsg, setVerifyMsg] = useState('Check your email to get an OTP');
    const [googlePW, setGooglePW] = useState(false);

    useEffect(() => {
        const isVerifying = localStorage.getItem('isVerifying');
        setToVerify(isVerifying === 'true');
    }, []);

    const handleRegister = async (values) => {
        console.log(values);

        if (toVerify) {
            return;
        }

        try {
            const response = await api.post(`auth/register`, values, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            console.log(response.data.result.id);
            localStorage.setItem('userId', response.data.result.id);
            setSuccessMsg('Register successfully!');
            localStorage.setItem('isVerifying', 'true');
            setTimeout(() => setToVerify(true), 1000);
        } catch (error) {
            console.log(error);
            setSuccessMsg(error.response.data.message);
        }
    };

    // GOOGLE
    const handleGoogleAuth = async (authCode) => {
        try {
            const response = await api.post(`auth/outbound/authentication?code=${authCode}`, {
                headers: {
                    Authorization: 'No Auth',
                },
            });

            if (response.data && response.data.result) {
                const token = response.data.result.token;
                localStorage.setItem('token', token);
                const rfToken = response.data.result.refreshToken;
                localStorage.setItem('refreshToken', rfToken);

                const userInfo = await api.get('users/info', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                localStorage.setItem('userInfo', JSON.stringify(userInfo.data.result));
                const userRoles = userInfo.data.result.roles.map((role) => role.name);
                localStorage.setItem('userRoles', JSON.stringify(userRoles));
                localStorage.setItem('userId', userInfo.data.result.id);

                if (userInfo.data.result.noPassword === false) {
                    navigate('/');
                } else {
                    setGooglePW(true);
                }
                console.log(userInfo);
            } else {
                throw new Error('No token in response');
            }
        } catch (error) {
            console.log(error);
            setSuccessMsg(error.response?.data?.message || 'Login failed');
        }
    };

    const handleLoginGoogle = () => {
        const callbackUrl = OAuthConfig.redirectUri;
        const authUrl = OAuthConfig.authUri;
        const googleClientId = OAuthConfig.clientId;

        const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
            callbackUrl,
        )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

        window.location.href = targetUrl;
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        const checkAuthCode = () => {
            const authCodeRegex = /code=([^&]+)/;
            const isMatch = window.location.href.match(authCodeRegex);

            if (isMatch) {
                const authCode = isMatch[1];
                handleGoogleAuth(authCode);
                window.history.replaceState({}, document.title, window.location.pathname);
            } else {
                console.log('No auth code found in URL');
            }
        };

        checkAuthCode();
    }, []);

    const handlePasswordGG = async (values) => {
        console.log(values);
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token not found');
            return;
        }
        const dataSend = {
            token: token,
            password: values.password,
        };
        console.log('Data to send:', dataSend);

        try {
            const response = await api.post('auth/create-password', dataSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Response data:', response.data);

            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error creating password:', error);
        }
    };

    return (
        <>
            <div className={cx('login')}>
                <div className={cx('login-img')}>
                    <img src={IMAGES.about} />
                </div>

                <div className={cx('login-form')}>
                    <div className={cx('wrapper')}>
                        <LoginHeader />

                        <Link to="/">
                            <img src={IMAGES.logo} className={cx('logo')} />
                        </Link>

                        {!toVerify && !googlePW ? (
                            <Form className={cx('form')} onFinish={handleRegister}>
                                <Form.Item
                                    className={cx('form-item')}
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: <span style={{ fontSize: 12 }}>Please enter a username</span>,
                                        },
                                        {
                                            min: 6,
                                            max: 12,
                                            message: (
                                                <span style={{ fontSize: 12 }}>User is required 6-12 characters</span>
                                            ),
                                        },
                                    ]}
                                >
                                    <Input className={cx('input')} type="text" placeholder="Username" />
                                </Form.Item>

                                <Form.Item
                                    className={cx('form-item')}
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: <span style={{ fontSize: 12 }}>Please enter a password</span>,
                                        },
                                        {
                                            min: 6,
                                            max: 20,
                                            message: (
                                                <span style={{ fontSize: 12 }}>
                                                    Password is required 6-20 characters
                                                </span>
                                            ),
                                        },
                                    ]}
                                >
                                    <Input className={cx('input')} type="password" placeholder="Password" />
                                </Form.Item>

                                <Form.Item
                                    className={cx('form-item')}
                                    name="confirmPassword"
                                    dependencies={['password']}
                                    rules={[
                                        {
                                            required: true,
                                            message: (
                                                <span style={{ fontSize: 12 }}>Please enter a confirm password</span>
                                            ),
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    <span style={{ fontSize: 12 }}>
                                                        The new password do not match!
                                                    </span>,
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input className={cx('input')} type="password" placeholder="Confirm password" />
                                </Form.Item>

                                <Form.Item
                                    className={cx('form-item', 'mgbt')}
                                    name="email"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: <span>The input is not valid E-mail!</span>,
                                        },
                                        {
                                            required: true,
                                            message: <span style={{ fontSize: 12 }}>Please enter an email</span>,
                                        },
                                    ]}
                                >
                                    <Input className={cx('input')} type="text" placeholder="Email" />
                                </Form.Item>

                                <span
                                    className={cx(
                                        'regis-msg',
                                        successMsg === 'Register successfully!' ? null : 'red-text',
                                    )}
                                >
                                    {successMsg}
                                </span>

                                <div className={cx('submit-btn')}>
                                    <Button mgRight10 primary medium type="submit">
                                        Register
                                    </Button>
                                    <Button
                                        outline
                                        medium
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLoginGoogle();
                                        }}
                                    >
                                        Google
                                    </Button>
                                </div>
                            </Form>
                        ) : googlePW ? (
                            <LoginGoogle successMsg={successMsg} handlePasswordGG={handlePasswordGG} />
                        ) : (
                            <EnterOTP setVerifyMsg={setVerifyMsg} from={from} setToVerify={setToVerify} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
