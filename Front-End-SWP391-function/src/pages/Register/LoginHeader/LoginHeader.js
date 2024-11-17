import { useNavigate } from 'react-router-dom';
import styles from './LoginHeader.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(styles);

function LoginHeader() {
    const [action, setAction] = useState('Register');
    const navigate = useNavigate();
    return (
        <div className={cx('login-choice')}>
            <button
            style={{ borderBottomRightRadius: 10}}
                className={cx(action === 'Login' ? 'active' : '')}
                onClick={() => {
                    setAction('Login');
                    navigate('/login');
                }}
            >
                Login
            </button>
            <button
            style={{ borderBottomLeftRadius: 10 }}
                className={cx(action === 'Register' ? 'active' : '')}
                onClick={() => {
                    setAction('Register');
                }}
            >
                Register
            </button>
        </div>
    );
}

export default LoginHeader;
