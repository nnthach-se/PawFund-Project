import Button from '~/components/Button';
import styles from './Blogs.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';

import { convertToRaw, EditorState } from 'draft-js';
import api from '~/config/axios';
import CreateBlog from '../../../Admin/components/Blogs/BlogComponents/CreateBlog';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Blogs() {
    const [currentPage, setCurrentPage] = useState(1);
    const [addBlog, setAddBlog] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalBlog, setTotalBlog] = useState(0);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    console.log(token);
    console.log('Day la userid: ', userId);
    const navigate = useNavigate();

    //Lay blog data payment/all
    const handleBlogData = async () => {
        try {
            setLoading(true);

            const response = await api.get(`posts/search?tags=Post&category=ADOPTION&userId=${userId}`, {
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

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const handleSubmit = () => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = JSON.stringify(convertToRaw(contentState));
        console.log(rawContentState);
    };

    const blogPerPage = 12;
    const indexOfLastBlog = currentPage * blogPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogPerPage;
    // const currentBlog = blogData.slice(indexOfFirstBlog, indexOfLastBlog);
    const currentBlog = blogData.slice(indexOfFirstBlog, indexOfLastBlog);

    const goToBlogDetail = (id) => {
        navigate(`/blog-detail/${id}`);
    };

    return (
        <>
            {!addBlog ? (
                <div className={cx('wrapper')}>
                    <h1>My Blogs</h1>
                    <div className={cx('user-content')}>
                        <div className={cx('header')}>
                            <div className={cx('add-pet')}>
                                <Button primary onClick={() => setAddBlog(true)}>
                                    Create Blog
                                </Button>
                            </div>

                            <div className={cx('search')}>
                                <form>
                                    <label htmlFor="sort">Sort by</label>
                                    <select id="sort" name="sort">
                                        <option value="all">All</option>
                                        <option value="sortByID">ID</option>
                                        <option value="sortByDate">Create Date</option>
                                    </select>

                                    <input type="text" placeholder="Search by name" />
                                    <Button primary small type="submit">
                                        Search
                                    </Button>
                                </form>
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
