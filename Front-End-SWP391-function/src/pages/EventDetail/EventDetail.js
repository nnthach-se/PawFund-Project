import IMAGES from '~/assets/images';
import styles from './EventDetail.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function EventDetail() {
    const [index, setIndex] = useState(0);
    const eventData = [
        {
            img: IMAGES.event1,
            title: 'Pet show very cute dogs and cats if you go with us you can touch them',
            location: 'District 3, Ho Chi Minh City',
            date: '25 July 2024',
        },
        {
            img: IMAGES.event2,
            title: 'Do you love your pets? Join with us on sunday!!!',
            location: 'FPT University, Thu Duc City',
            date: '23 Jan 2024',
        },
        {
            img: IMAGES.event3,
            title: 'Do you understand your pets?',
            location: 'District 3, Ho Chi Minh City',
            date: '25 Oct 2024',
        },
        {
            img: IMAGES.event3,
            title: 'Do you understand your pets?',
            location: 'District 3, Ho Chi Minh City',
            date: '12 Dec 2024',
        },
        {
            img: IMAGES.event2,
            title: 'Do you love your pets? Join with us on sunday!!!',
            location: 'FPT University, Thu Duc City',
            date: '25 July 2024',
        },
        {
            img: IMAGES.event1,
            title: 'Pet show very cute dogs and cats if you go with us you can touch them',
            location: 'District 3, Ho Chi Minh City',
            date: '25 Feb 2024',
        },
    ];

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

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h1>Do you love your pets? Join with us on sunday!</h1>
                <p>Event Date: 20 July 2024 - Sunday</p>
                <div className={cx('content-img')}>
                    <img src={IMAGES.event2} />
                </div>

                <div className={cx('main-content')}>
                    <p>
                        With the holiday season comes parties, family gatherings and plenty of opportunities to indulge
                        in delicious holiday fare. And since it is the season of giving, it’s hard not to be tempted to
                        share your leftovers with your cat or dog. Although your pet doesn’t need the extra calories,
                        there are some human foods that are safe to give your animal in moderation and some that you
                        should never feed him. Before you prepare your next holiday feast, check out the photo gallery
                        below to make better food choices for your pet. And make sure you talk to your veterinarian
                        before introducing a new food into your pet’s diet.
                    </p>
                    <div className={cx('main-content-img')}>
                        <img src={IMAGES.blog3} />
                    </div>
                    <p>
                        With the holiday season comes parties, family gatherings and plenty of opportunities to indulge
                        in delicious holiday fare. And since it is the season of giving, it’s hard not to be tempted to
                        share your leftovers with your cat or dog. Although your pet doesn’t need the extra calories,
                        there are some human foods that are safe to give your animal in moderation and some that you
                        should never feed him. Before you prepare your next holiday feast, check out the photo gallery
                        below to make better food choices for your pet. And make sure you talk to your veterinarian
                        before introducing a new food into your pet’s diet.
                    </p>
                    <div className={cx('main-content-img')}>
                        <img src={IMAGES.blog3} />
                    </div>
                    <p>
                        With the holiday season comes parties, family gatherings and plenty of opportunities to indulge
                        in delicious holiday fare. And since it is the season of giving, it’s hard not to be tempted to
                        share your leftovers with your cat or dog. Although your pet doesn’t need the extra calories,
                        there are some human foods that are safe to give your animal in moderation and some that you
                        should never feed him. Before you prepare your next holiday feast, check out the photo gallery
                        below to make better food choices for your pet. And make sure you talk to your veterinarian
                        before introducing a new food into your pet’s diet.
                    </p>
                </div>
            </div>

            <div className={cx('other-blog')}>
                <h2>Other Events</h2>
                <button onClick={preSlide} className={cx('pre-btn')}>
                    &lt;
                </button>
                <div className={cx('event-container')}>
                    {eventShow.map((event, index) => {
                        const [day, month, year] = event.date.split(' ');
                        return (
                            <div className={cx('event-box')} key={index}>
                                <div className={cx('image')}>
                                    <img src={event.img} />
                                    <div className={cx('date')}>
                                        <p className={cx('date-detail')}>
                                            {month}
                                            <br />
                                            {day}
                                        </p>
                                    </div>
                                </div>

                                <div className={cx('event-info')}>
                                    <h3>{event.title}</h3>
                                    <p>{event.location}</p>
                                </div>

                                <Button small outline className={cx('event-btn')} to="/blog">
                                    View
                                </Button>
                            </div>
                        );
                    })}
                </div>
                <button onClick={nextSlide} className={cx('next-btn')}>
                    &gt;
                </button>

                <div className={cx('blog-btn')}>
                    <Button to="/events" primary>
                        View More Events
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default EventDetail;
