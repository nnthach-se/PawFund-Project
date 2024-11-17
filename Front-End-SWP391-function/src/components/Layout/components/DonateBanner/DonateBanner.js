import IMAGES from '~/assets/images';
import Button from '~/components/Button';
import styles from './DonateBanner.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function DonateBanner() {
    return (
        <div className={cx('donate-banner')}>
            <img src={IMAGES.donate} alt="banner" />
            <div className={cx('donate-content')}>
                <h1>Open Your Heart, Help A Pet!</h1>
                <Button medium to="/donate" className={cx('donate-btn')}>
                    Donate
                </Button>
            </div>
        </div>
    );
}

export default DonateBanner;
