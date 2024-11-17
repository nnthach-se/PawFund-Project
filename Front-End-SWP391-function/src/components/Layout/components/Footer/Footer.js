import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import IMAGES from '~/assets/images';
import ICONS from '~/assets/icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('first')}>
                <img src={IMAGES.logo} />
                <div className={cx('first-icon')}>
                    <img src={ICONS.insta} />
                    <img src={ICONS.facebook} />
                </div>
                <p>Copyright &copy;2024</p>
            </div>
            <div className={cx('third')}>
                <h3>Quick Links</h3>
                <div className={cx('link')}>
                    <div className={cx('para1')}>
                        <a href="/">Home</a>
            
                        <a href="/about-us">About Us</a>
                        <a href="/find-a-pet">Our Pets</a>
                        <a href="/contact">Contact</a>
                    </div>

                    <div className={cx('para2')}>
                        <a href="/blog">Blogs</a>
                        <a href="/events">Events</a>
                        <a href="/volunteer">Volunteer</a>
                        <a href="/donate">Donate</a>
                    </div>
                </div>
            </div>
            <div className={cx('second')}>
                <h3>Legal</h3>
                <a href="/contact">Terms of Use</a>
                <a href="/contact">Privacy Policy</a>
            </div>
            <div className={cx('four')}>
                <div className={cx('gmap')}>
                    <div style={{ width: '100%' }}>
                        <iframe
                            style={{ width: '350px', height: '200px', border: '0', margin: '0' }}
                            src="https://maps.google.com/maps?width=350&amp;height=200&amp;hl=en&amp;q=L%C3%B4%20E2a-7,%20%C4%90%C6%B0%E1%BB%9Dng%20D1,%20%C4%90.%20D1,%20Long%20Th%E1%BA%A1nh%20M%E1%BB%B9,%20Th%C3%A0nh%20Ph%E1%BB%91%20Th%E1%BB§%20%C4%90%E1%BB%A9c,%20H%E1%BB%93%20Ch%C3%AD%20Minh%20700000+(Furry%20Friends%20Haven)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                        >
                            <a href="https://www.gps.ie/">gps systems</a>
                        </iframe>
                    </div>
                </div>

                <p>Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh 700000</p>
            </div>
        </div>
    );
}

export default Footer;
