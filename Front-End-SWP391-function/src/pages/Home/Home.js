import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import IMAGES from '~/assets/images';
import Button from '~/components/Button';
import RegisBanner from '~/components/Layout/components/RegisterBanner';
import Events from './HomeComponents/Events';
import FeaturePet from '../FindPet/components/FeaturePet';
import { useInView } from 'react-intersection-observer';
import HomeCarousel from './HomeComponents/HomeCarousel/HomeCarousel';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function Home() {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });
    const location = useLocation();

    useEffect(() => {
        // Kiểm tra xem có thông báo nào từ trạng thái không
        if (location.state?.message) {
            toast.success(location.state.message);
        }
    }, [location.state]);

    console.log('In View:', inView);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                {/* <img src={IMAGES.banner} alt="banner" /> */}
                <HomeCarousel />
                {/* <h1>Connecting People & Pets</h1> */}
            </div>

            {/*About Us Content */}
            <div className={cx('about')} ref={ref}>
                <div className={cx('about-content')}>
                    <div className={cx('text', { animate: inView })}>
                        <h2 className={cx('heading')}>Who We Are?</h2>
                        <p className={cx('about-para')}>
                            Since 2020, we've been devoted to rescuing stray, neglected, abandoned and surrendered pets
                            in need.
                        </p>
                        <Button outline large to="/about-us" className={cx('btn')}>
                            Learn More
                        </Button>
                    </div>
                    <img src={IMAGES.aboutUs} alt="about" className={cx({ animate: inView })} />
                </div>
            </div>

            {/*Feature Pet Content */}
            <FeaturePet homepage={true}>
                <Button primary xlarge to="/find-a-pet" className={cx('link-btn')} mgTop20>
                    View All Adoptable Pets
                </Button>
            </FeaturePet>

            <RegisBanner />

            {/*Events */}
            <Events />

            {/*Application */}
            <div className={cx('application')} ref={ref}>
                <h1 className={cx('main-heading')}>Adopt Application</h1>
                <p className={cx('main-slogan')}>Ready to adopt?</p>

                <div className={cx('appli-content')}>
                    <div className={cx('appli-main-content')}>
                        <div className={cx('content-left', { animate: inView })}>
                            <p>1. Search and Preparation</p>
                            <p className={cx('mgTOPBOT')}>2. Fill in Application</p>
                            <p>3. Meet and Greet</p>
                        </div>
                        <div className={cx('content-right', { animate: inView })}>
                            <p>4. Home Visit ( optional )</p>
                            <p className={cx('mgTOPBOT')}>5. Finalizing the Adoption</p>
                            <p>6. Post-Adoption Support</p>
                        </div>
                    </div>
                </div>

                <div className={cx('start-adopt-btn')}>
                    <Button large primary to="/adopt">
                        Start Adopt
                    </Button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;

// /*Contact */

// /* <div className={cx('contact')}>
//             <h1 className={cx('main-heading')}>Contact Us</h1>
//             <p className={cx('main-slogan')}>Let us assist you - contact us today!</p>

//             <Row className={cx('content')}>
//                 <Col lg={3} className={cx('contact-box')}>
//                     <div className={cx('box')}>
//                         <div className={cx('icon')}>
//                             <img src={ICONS.phoneWhi} />
//                         </div>
//                         <h2>Phone</h2>
//                         <p>
//                             028.123.4567 <br /> 028.321.0123
//                         </p>
//                     </div>
//                 </Col>
//                 <Col lg={3} className={cx('contact-box')}>
//                     <div className={cx('box')}>
//                         <div className={cx('icon')}>
//                             <img src={ICONS.mailWhi} />
//                         </div>
//                         <h2>Mail</h2>
//                         <p>furryfriendshaven@gmail.com</p>
//                     </div>
//                 </Col>
//                 <Col lg={3} className={cx('contact-box')}>
//                     <div className={cx('box')}>
//                         <div className={cx('icon')}>
//                             <img src={ICONS.locateWhi} />
//                         </div>
//                         <h2>Address</h2>
//                         <p>
//                             FPT University, Thu Duc District, <br />
//                             Ho Chi Minh City
//                         </p>
//                     </div>
//                 </Col>
//                 <Col lg={3} className={cx('contact-box')}>
//                     <div className={cx('box')}>
//                         <div className={cx('icon')}>
//                             <img src={ICONS.clockWhi} />
//                         </div>
//                         <h2>Open Hours</h2>
//                         <p>
//                             Mon - Fri: 7am - 7pm
//                             <br />
//                             Sat - Sun: 7am - 4pm
//                         </p>
//                     </div>
//                 </Col>
//             </Row>

//             <div className={cx('contact-btn')}>
//                 <Button primary large to="/contact">
//                     Send Message
//                 </Button>
//             </div>
//         </div> */
