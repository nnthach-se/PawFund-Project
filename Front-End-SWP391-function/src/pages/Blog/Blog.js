import IMAGES from '~/assets/images';
import styles from './Blog.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ShortFilter from './components/ShortFilter';
import BlogList from './components/BlogList';

const cx = classNames.bind(styles);

function Blog() {
    // const [openPopup, setOpenPopup] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [filter, setFilter] = useState({
        sort: 'all',
        type: 'all',
    });

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
                <img src={IMAGES.blog} alt="banner" />
            </div>

            <div className={cx('content')}>
                <h1>Blogs</h1>

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
                    <BlogList />
                </div>
            </div>
        </div>
    );
}

export default Blog;
