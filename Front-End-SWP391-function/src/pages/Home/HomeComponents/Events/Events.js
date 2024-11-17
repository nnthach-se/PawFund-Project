import IMAGES from '~/assets/images';
import styles from './Events.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import api from '~/config/axios';

const cx = classNames.bind(styles);

function Events() {
    const [index, setIndex] = useState(0);
    const [eventData, setEventData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Trạng thái load
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);

    // console.log('Index: ', index);
    // console.log('Event Data: ', eventData);

    const getEventData = async () => {
        try {
            setLoading(true);
            const response = await api.get(`posts/search?tags=Event&category=ADOPTION`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEventData(response.data.result);
            setIsLoading(false); // Dữ liệu đã được tải xong, đổi trạng thái loading
        } catch (error) {
            console.log(error);
            setIsLoading(false); // Nếu có lỗi, cũng đổi trạng thái loading
        } finally {
            setLoading(false); // Hoàn tất quá trình tải
        }
    };

    useEffect(() => {
        // Mô phỏng việc delay 2 giây trước khi load trang
        const timer = setTimeout(() => {
            getEventData();
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const preSlide = () => {
        setIndex((preIndex) => (preIndex - 1 + eventData.length) % eventData.length);
    };

    const nextSlide = () => {
        setIndex((preIndex) => (preIndex + 1) % eventData.length);
    };

    const eventShow = [
        eventData[index % eventData.length],
        eventData[(index + 1) % eventData.length],
        eventData[(index + 2) % eventData.length],
    ];
    // console.log('Show Data: ', eventShow);

    useEffect(() => {
        if (eventData.length > 0) {
            // Kiểm tra nếu eventData có dữ liệu
            const interval = setInterval(() => {
                setIndex((prevIndex) => (prevIndex + 1) % eventData.length);
            }, 3000);

            return () => clearInterval(interval); // Dọn dẹp interval khi component unmount hoặc khi eventData thay đổi
        }
    }, [eventData.length]); // Chỉ chạy lại khi eventData.length thay đổi

    // Nếu trang đang load, hiển thị loading
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div className={cx('events')}>
                {loading ? (
                    <p>Loading event information...</p> // Hiển thị khi đang tải
                ) : eventData ? (
                    <>
                        <h1 className={cx('main-heading')}>Events</h1>
                        <p className={cx('main-slogan')}>Love, Care, Companionship</p>

                        <div className={cx('content')}>
                            <button onClick={preSlide} className={cx('pre-btn')}>
                                &lt;
                            </button>
                            <div className={cx('event-container')}>
                                {eventShow.map((event, index) => {
                                    if (!event) return 'khong co data';
                                    return (
                                        <div className={cx('event-box')} key={index}>
                                            <div className={cx('image')}>
                                                <img src={event.images} />
                                            </div>

                                            <div className={cx('event-info')}>
                                                <h3>{event.title}</h3>
                                                <p>{event.location}</p>
                                            </div>

                                            <Button small outline className={cx('event-btn')} to="/blog">
                                                View
                                            </Button>
                                        </div>
                                        // <div></div>
                                    );
                                })}
                            </div>
                            <button onClick={nextSlide} className={cx('next-btn')}>
                                &gt;
                            </button>
                        </div>

                        <Button primary xlarge to="/events" className={cx('link-btn')}>
                            View More Event
                        </Button>
                    </>
                ) : (
                    <p>Pet data not available</p> // Hiển thị nếu không có dữ liệu
                )}
            </div>
        </>
    );
}

export default Events;

// import IMAGES from '~/assets/images';
// import styles from './Events.module.scss';
// import classNames from 'classnames/bind';
// import Button from '~/components/Button';
// import { useEffect, useState } from 'react';
// import api from '~/config/axios';

// const cx = classNames.bind(styles);

// function Events() {
//     const [index, setIndex] = useState(0);
//     const [eventData, setEventData] = useState([]);
//     const [isLoading, setIsLoading] = useState(true); // Trạng thái load
//     const token = localStorage.getItem('token');

//     const getEventData = async () => {
//         try {
//             const response = await api.get(`posts/search?tags=Event&category=ADOPTION`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setEventData(response.data.result);
//             setIsLoading(false); // Dữ liệu đã được tải xong, đổi trạng thái loading
//         } catch (error) {
//             console.log(error);
//             setIsLoading(false); // Nếu có lỗi, cũng đổi trạng thái loading
//         }
//     };

//     useEffect(() => {
//         // Mô phỏng việc delay 2 giây trước khi load trang
//         const timer = setTimeout(() => {
//             getEventData();
//         }, 2000);

//         return () => clearTimeout(timer);
//     }, []);

//     const preSlide = () => {
//         setIndex((preIndex) => (preIndex - 1 + eventData.length) % eventData.length);
//     };

//     const nextSlide = () => {
//         setIndex((preIndex) => (preIndex + 1) % eventData.length);
//     };

//     const eventShow = [
//         eventData[index % eventData.length],
//         eventData[(index + 1) % eventData.length],
//         eventData[(index + 2) % eventData.length],
//     ];

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setIndex((prevIndex) => (prevIndex + 1) % eventData.length);
//         }, 3000);
//         return () => clearInterval(interval);
//     }, [eventData.length]); // Đảm bảo interval chỉ chạy lại khi eventData thay đổi

//     // Nếu trang đang load, hiển thị loading
//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className={cx('events')}>
//             <h1 className={cx('main-heading')}>Events</h1>
//             <p className={cx('main-slogan')}>Love, Care, Companionship</p>

//             <div className={cx('content')}>
//                 <button onClick={preSlide} className={cx('pre-btn')}>
//                     &lt;
//                 </button>
//                 <div className={cx('event-container')}>
//                     {eventShow.map((event, index) => {
//                         return <div key={index}>{event.title}</div>;
//                     })}
//                 </div>
//                 <button onClick={nextSlide} className={cx('next-btn')}>
//                     &gt;
//                 </button>
//             </div>

//             <Button primary xlarge to="/events" className={cx('link-btn')}>
//                 View More Event
//             </Button>
//         </div>
//     );
// }

// export default Events;
