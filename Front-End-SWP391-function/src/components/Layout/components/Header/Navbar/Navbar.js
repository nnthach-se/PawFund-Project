import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';
import { Dropdown } from 'antd';
import { MenuProps } from 'antd';

const cx = classNames.bind(styles);

function NavBar() {
    const items = [
        {
            label: (
                <Link style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500 }} to="/blog">
                    Blog
                </Link>
            ),
        },
        {
            label: (
                <Link style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500 }} to="/events">
                    Events
                </Link>
            ),
        },
    ];
    return (
        <div className={cx('navbar')}>
            <NavLink to="/about-us" className={cx('nav-item')}>
                About Us
            </NavLink>
            <NavLink to="/find-a-pet" className={cx('nav-item')}>
                Find a Pet
            </NavLink>
            <NavLink to="/adopt" className={cx('nav-item')}>
                Adopt
            </NavLink>
            <NavLink to="/volunteer" className={cx('nav-item')}>
                Volunteer
            </NavLink>
            <NavLink to="/contact" className={cx('nav-item')}>
                Contact
            </NavLink>
            <NavLink to="/donate" className={cx('nav-item')}>
                Donate
            </NavLink>
            <Dropdown menu={{ items }} className={cx('nav-item')}>
                <span>More &or;</span>
            </Dropdown>
        </div>
    );
}

export default NavBar;
