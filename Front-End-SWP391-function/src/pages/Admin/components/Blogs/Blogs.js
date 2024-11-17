import Button from '~/components/Button';
import styles from './Blogs.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';

import { convertToRaw, EditorState } from 'draft-js';
import api from '~/config/axios';
import CreateBlog from './BlogComponents/CreateBlog';
import { useNavigate } from 'react-router-dom';
import AddTag from '../VolunteerTask/components/AddTag/AddTag';

const cx = classNames.bind(styles);

function Blogs() {
    const [currentPage, setCurrentPage] = useState(1);
    const [addBlog, setAddBlog] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalBlog, setTotalBlog] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('newest'); // Trạng thái cho phương thức sắp xếp
    const userRole = localStorage.getItem('userRoles');
    const [showAddTag, setShowAddTag] = useState(false);
    const navigate = useNavigate();

    //Lay blog data payment/all
    const handleBlogData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await api.get(`posts/search?tags=Post&category=ADOPTION`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Authorization: `No Auth`,
                },
            });
            setTotalBlog(response.data.result.length);
            setBlogData(response.data.result);
            // localStorage.setItem('bloguData', JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Hoàn tất quá trình tải
        }
    };

    useEffect(() => {
        handleBlogData();
    }, []);
    console.log('Day la blog data: ', blogData);

    // Lọc blogData dựa trên searchTerm
    const filteredBlogData = blogData.filter((blog) => blog.title.toLowerCase().includes(searchTerm.toLowerCase()));

    // Sắp xếp dữ liệu dựa trên lựa chọn
    const sortedBlogData = [...filteredBlogData].sort((a, b) => {
        if (sortOrder === 'newest') {
            return new Date(b.createAt) - new Date(a.createAt); // Sắp xếp mới nhất
        } else if (sortOrder === 'likes') {
            return b.likeCount - a.likeCount; // Sắp xếp theo lượt thích
        } else if (sortOrder === 'oldest') {
            return new Date(a.createAt) - new Date(b.createAt); // Sắp xếp cũ nhất
        }
        return 0;
    });

    const handleToggleAddTag = () => {
        setShowAddTag((prev) => !prev); // Chuyển đổi trạng thái hiển thị popup
    };

    const handleClosePopup = () => {
        setShowAddTag(false); // Đóng popup
    };

    const blogPerPage = 12;
    const indexOfLastBlog = currentPage * blogPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogPerPage;
    const currentBlog = sortedBlogData.slice(indexOfFirstBlog, indexOfLastBlog);

    const goToBlogDetail = (id) => {
        navigate(`/blog-detail/${id}`);
    };

    return (
        <>
            {!addBlog ? (
                <div className={cx('wrapper')}>
                    <h1>Blogs</h1>
                    <div className={cx('totalBlog_wrap')}>
                        <p>Total Blog: {totalBlog}</p>
                    </div>
                    <div className={cx('user-content')}>
                        <div className={cx('header')}>
                            <div className={cx('add-pet')}>
                                <Button primary onClick={() => setAddBlog(true)}>
                                    Create Blog
                                </Button>
                                <div className="nut-add-tag">
                                    {userRole.includes('ADMIN') && (
                                        <>
                                            <button onClick={handleToggleAddTag}>Create Tag</button>{' '}
                                            {/* Nút Create Tag */}
                                            {showAddTag && (
                                                <div className="popup">
                                                    <button onClick={handleClosePopup} className="close-button">
                                                        Close
                                                    </button>{' '}
                                                    {/* Nút Close */}
                                                    <AddTag closePopup={handleClosePopup} />{' '}
                                                    {/* Hiển thị AddTag với hàm đóng popup */}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className={cx('blog-search')}>
                                {/* Tùy chọn sắp xếp */}
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className={cx('sort-select')}
                                >
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="likes">Most Liked</option>
                                </select>
                                <input
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search Blog"
                                />
                            </div>
                        </div>

                        <div className={cx('main-content')}>
                            <div className={cx('content-wrapper')}>
                                <div className={cx('header-content')}>
                                    <p className={cx('id')}>ID</p>
                                    <p className={cx('title')}>Title</p>
                                    <p className={cx('appli')}>Number of likes</p>
                                    <p className={cx('date')}>Create Date</p>
                                    <p className={cx('action')}>Action</p>
                                </div>
                                <div className={cx('content')}>
                                    {currentBlog.map((blog) => (
                                        <div className={cx('content-item')} key={blog.id}>
                                            <p className={cx('id')}>{blog.id}</p>
                                            <div className={cx('title')}>
                                                <p className={cx('blogtitle')}>{blog.title}</p>
                                            </div>
                                            <div className={cx('blog_numOfLike_wrap')}>
                                                <div className={cx('blog_numOfLike')}>
                                                    <p>{blog.likeCount}</p>
                                                </div>
                                            </div>

                                            <p className={cx('date')}>
                                                {new Date(blog.createAt).toLocaleDateString('vi-VN', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                            <div className={cx('action')}>
                                                <FontAwesomeIcon
                                                    onClick={() => goToBlogDetail(blog.id)}
                                                    icon={faEye}
                                                    className={cx('view-icon')}
                                                />
                                                <FontAwesomeIcon icon={faTrash} className={cx('delete-icon')} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={cx('pagination')}>
                                <Pagination
                                    style={{ display: 'block' }}
                                    current={currentPage}
                                    defaultCurrent={1}
                                    total={blogData.length}
                                    pageSize={blogPerPage}
                                    onChange={(page) => setCurrentPage(page)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('create-blog')}>
                    <div className={cx('form-wrapper')}>
                        <p style={{ cursor: 'pointer', width: '70px' }} onClick={() => setAddBlog(false)}>
                            &larr;Back
                        </p>
                        <CreateBlog />
                    </div>
                </div>
            )}
        </>
    );
}

export default Blogs;
