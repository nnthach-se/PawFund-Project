import { Form, Input } from 'antd';
import styles from './LoginGoogle.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function LoginGoogle({successMsg, handlePasswordGG}) {
    
    return (
        <Form className={cx('form')} onFinish={handlePasswordGG}>
            <p className={cx('ggpw-msg')}>Please create your password</p>
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
                        message: <span style={{ fontSize: 12 }}>Password is required 6-20 characters</span>,
                    },
                ]}
            >
                <Input className={cx('input')} type="password" placeholder="Password" />
            </Form.Item>

            <span className={cx('regis-msg', successMsg === 'Login successfully!' ? null : 'red-text')}>
                {successMsg}
            </span>

            <div className={cx('submit-btn')}>
                <Button primary medium type="submit">
                    Submit
                </Button>
            </div>
        </Form>
    );
}

export default LoginGoogle;
