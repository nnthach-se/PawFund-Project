import Header from '../components/Header';
import Footer from '../components/Footer';

import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import DonateBanner from '../components/DonateBanner';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <DonateBanner/>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
