import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import IMAGES from '~/assets/images';
import NavBar from './Navbar';
import Account from './Account';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <Link to="/">
                    <img src={IMAGES.logo} alt="logo" />
                </Link>
            </div>
            <NavBar />

            <Account />
        </div>
    );
}

export default Header;
