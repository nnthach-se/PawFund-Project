import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import IMAGES from '~/assets/images';
import ICONS from '~/assets/icons';
import Button from '~/components/Button';
import { Row, Col, Container } from 'react-bootstrap';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <img src={IMAGES.contact} alt="banner" />
                {/* <h1>Connect with Us Today!</h1> */}
            </div>
            <div className={cx('content')}>
                <h1>Contact Us</h1>
                <p>Any question or remarks? Just write us a message!</p>

                {/* <div className={cx('main-content')}>
                    <div className={cx('contact-info')}>
                        <h2>Contact Information</h2>
                        <div className={cx('info-list')}>
                            <span className={cx('info-item')}>
                                <img src={ICONS.phoneBl} className={cx('spe-icon')} />
                                028.123.4567 <br /> 028.321.0123
                            </span>
                            <span className={cx('info-item')}>
                                <img src={ICONS.emailBl} />
                                furryfriendshaven@gmail.com
                            </span>
                            <span className={cx('info-item')}>
                                <img src={ICONS.locateBl} />
                                Ho Chi Minh City
                            </span>
                            <span className={cx('info-item')}>
                                <img src={ICONS.clockBl} className={cx('spe-icon')} />
                                Mon - Fri: 7am - 6pm <br /> Sat - Sun: 10am - 4pm
                            </span>
                        </div>
                    </div>
                    <div className={cx('request-form')}>
                        <h2>Send a Message Now</h2>
                        <form>
                            <div className={cx('form-list')}>
                                <div className={cx('form-item')}>
                                    <label htmlFor="fname">First Name</label>
                                    <input type="text" id="fname" name="fname" />
                                </div>
                                <div className={cx('form-item')}>
                                    <label htmlFor="lname">Last Name</label>
                                    <input type="text" id="lname" name="lname" />
                                </div>
                                <div className={cx('form-item')}>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" />
                                </div>
                                <div className={cx('form-item')}>
                                    <label htmlFor="phone">Phone</label>
                                    <input type="phone" id="phone" name="phone" />
                                </div>
                                <div className={cx('form-item')}>
                                    <label htmlFor="message">Message</label>
                                    <textarea type="text" id="message" name="message"></textarea>
                                </div>
                            </div>

                            <div className={cx('submit-btn')}><Button small primary type='submit'>Send</Button></div>
                        </form>
                    </div>
                </div> */}

                <Row className={cx('main-content')}>
                    <Col lg={3} className={cx('contact-box')}>
                        <div className={cx('box')}>
                            <div className={cx('icon')}>
                                <img src={ICONS.phoneWhi} />
                            </div>
                            <h2>Phone</h2>
                            <p>
                                028.123.4567 <br /> 028.321.0123
                            </p>
                        </div>
                    </Col>
                    <Col lg={3} className={cx('contact-box')}>
                        <div className={cx('box')}>
                            <div className={cx('icon')}>
                                <img src={ICONS.mailWhi} />
                            </div>
                            <h2>Mail</h2>
                            <p>furryfriendshaven@gmail.com</p>
                        </div>
                    </Col>
                    <Col lg={3} className={cx('contact-box')}>
                        <div className={cx('box')}>
                            <div className={cx('icon')}>
                                <img src={ICONS.locateWhi} />
                            </div>
                            <h2>Address</h2>
                            <p>
                                FPT University, Thu Duc District, <br />
                                Ho Chi Minh City
                            </p>
                        </div>
                    </Col>
                    <Col lg={3} className={cx('contact-box')}>
                        <div className={cx('box')}>
                            <div className={cx('icon')}>
                                <img src={ICONS.clockWhi} />
                            </div>
                            <h2>Open Hours</h2>
                            <p>
                                Mon - Fri: 7am - 7pm
                                <br />
                                Sat - Sun: 7am - 4pm
                            </p>
                        </div>
                    </Col>
                </Row>

                {/* <div className={cx('contact-btn')}>
                    <Button primary large to="/contact">
                        Send Message
                    </Button>
                </div> */}
            </div>
        </div>
    );
}

export default Contact;
