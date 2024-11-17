import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { Checkbox, Form, Input } from 'antd';
import Button from '~/components/Button';
import IMAGES from '~/assets/images';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginHeader from './LoginHeader';
import api from '~/config/axios';
import { OAuthConfig } from './components/GGconfig/configuration';
import ForgotPassword from './components/ForgotPassword';
import LoginGoogle from './components/LoginGoogle';

const cx = classNames.bind(styles);

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const [successMsg, setSuccessMsg] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    const [googlePW, setGooglePW] = useState(false);

    const handleLogin = async (values) => {
        console.log(values);

        try {
            // login
            const response = await api.post('auth/login', values, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            console.log(response.data);
            const token = response.data.result.token;
            localStorage.setItem('token', token);
            const rfToken = response.data.result.refreshToken;
            localStorage.setItem('refreshToken', rfToken);

            // take info by token
            const userInfo = await api.get('users/info', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            localStorage.setItem('userInfo', JSON.stringify(userInfo.data.result));
            const userRoles = userInfo.data.result.roles.map((role) => role.name);
            localStorage.setItem('userRoles', JSON.stringify(userRoles));
            localStorage.setItem('userId', userInfo.data.result.id);
            setSuccessMsg('Login successfully!');
            setTimeout(() => {
                navigate(from);
            }, 2000);
        } catch (error) {
            console.log(error);
            setSuccessMsg('Login failed');
        }
    };

    // Login google
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
                    // localStorage.setItem('userInfo', JSON.stringify(userInfo.data.result));
                    // localStorage.setItem('userId', userInfo.data.result.id);
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

            //change
            const userInfo = await api.get('users/info', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.setItem('userInfo', JSON.stringify(userInfo.data.result));
            localStorage.setItem('userId', userInfo.data.result.id);

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

                        {!googlePW ? (
                            <Form className={cx('form')} onFinish={handleLogin}>
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
                                            max: 50,
                                            message: (
                                                <span style={{ fontSize: 12 }}>
                                                    Username is required 6-12 characters
                                                </span>
                                            ),
                                        },
                                    ]}
                                >
                                    <Input
                                        className={cx('input')}
                                        type="text"
                                        placeholder="Username"
                                    />
                                </Form.Item>

                                <Form.Item
                                    className={cx('form-item', 'mgbt')}
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

                                <div className={cx('small-function')}>
                                    <p>
                                        Forgot password? <a onClick={() => setOpenPopup(true)}>Click here</a>
                                    </p>
                                </div>

                                <span
                                    className={cx(
                                        'regis-msg',
                                        successMsg === 'Login successfully!' ? null : 'red-text',
                                    )}
                                >
                                    {successMsg}
                                </span>

                                <div className={cx('submit-btn')}>
                                    <Button className={cx('test_swt')} medium mgRight10 primary type="submit">
                                        Login
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
                        ) : (
                            <LoginGoogle successMsg={successMsg} handlePasswordGG={handlePasswordGG} />
                        )}
                    </div>
                </div>

                {openPopup ? <ForgotPassword setOpenPopup={setOpenPopup} /> : null}
            </div>
        </>
    );
}

export default Login;
