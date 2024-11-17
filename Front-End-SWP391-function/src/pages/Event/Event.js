import { useEffect, useState } from 'react';
import IMAGES from '~/assets/images';
import styles from './Event.module.scss';
import classNames from 'classnames/bind';
import ShortFilter from './components/ShortFilter';
import BlogList from './components/EventList';
import api from '~/config/axios';
import EventList from './components/EventList';

const cx = classNames.bind(styles);

function Event() {
    const [searchName, setSearchName] = useState('');
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({
        sort: 'all',
        type: 'all',
    });
    const [eventData, setEventData] = useState([]);

    // goi api
    const handleEventData = async () => {
        try {
            setLoading(true);
            const response = await api.get(`events`, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            setEventData(response.data);
            localStorage.setItem('eventuData', JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Hoàn tất quá trình tải
        }
    };
    useEffect(() => {
        handleEventData();
    }, []);
    console.log(eventData);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFilter((pre) => ({ ...pre, [name]: value }));
    };

    const handleSearchChange = (e) => {
        setSearchName(e.target.value.trim());
    };
    const handleFinish = async (e) => {
        if (e) e.preventDefault();

        const searchParams = {
            searchName,
            filter,
        };
        console.log(searchParams);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <img src={IMAGES.eventBanner} alt="banner" />
            </div>

            <div className={cx('content')}>
                <h1>Events</h1>

                {/* <div className={cx('short-filter')}>
                    <ShortFilter
                        filter={filter}
                        handleFinish={handleFinish}
                        handleFilterChange={handleFilterChange}
                        searchName={searchName}
                        handleSearchChange={handleSearchChange}
                    />
                </div> */}
                <div className={cx('blog-content')}>
                    <EventList data={eventData} dataLength={eventData.length} />
                </div>
            </div>
        </div>
    );
}

export default Event;
