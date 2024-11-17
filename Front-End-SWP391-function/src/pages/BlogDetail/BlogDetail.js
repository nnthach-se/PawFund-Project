import IMAGES from '~/assets/images';
import styles from './BlogDetail.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import api from '~/config/axios';
import { useParams } from 'react-router-dom';
import BlogComment from '../Blog/components/BlogComment/BlogComment';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';

const cx = classNames.bind(styles);

function BlogDetail() {
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [blogData, setBlogData] = useState();
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const [likeUsers, setLikeUsers] = useState([]); // State để lưu danh sách người đã like
    const [showLikePopup, setShowLikePopup] = useState(false); // State để kiểm soát hiển thị popup
    const id = useParams();
    const useId = id.id;

    const getBlogData = async () => {
        try {
            setLoading(true);
            const response = await api.get(`posts/detail/${useId}`, {
                headers: {
                    Authorization: `No Auth`,
                },
            });
            setBlogData(response.data.result);
            setLikeCount(response.data.result.likeCount);
            setLikeUsers(response.data.result.likedByUsers);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Hoàn tất quá trình tải
        }
    };
    console.log('Day la blog data: ', blogData);
    console.log('Day la like count', likeCount);
    console.log('Day la popup: ', showLikePopup);

    // Hàm xử lý "like" khi người dùng nhấn nút
    const handleLike = async () => {
        try {
            const response = await api.put(`posts/${useId}/liked`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.message === 'Like post successfully') {
                setLikeCount(likeCount + 1);
                setLiked(true);
                // setLikeUsers((prev) => [...prev, token]); // Thêm người dùng vào danh sách đã like
            } else {
                setLikeCount(likeCount - 1);
                setLiked(false);
                // setLikeUsers((prev) => prev.filter((user) => user !== token)); // Xóa người dùng khỏi danh sách đã like
            }
            console.log('Day la response', response.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    // hàm sử lý pop up
    const toggleLikePopup = () => {
        setShowLikePopup(!showLikePopup);
    };

    useEffect(() => {
        getBlogData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <p>Loading blog information...</p> // Hiển thị khi đang tải
            ) : blogData ? (
                <>
                    <ScrollToTop />
                    <div>
                        <div className={cx('content')}>
                            <h1>{blogData.title}</h1>
                            {/* <div className={cx('content-img')}>
                                <img src={IMAGES.blog1} />
                            </div> */}
                            <div
                                className={cx('main-content')}
                                dangerouslySetInnerHTML={{ __html: blogData.content }}
                            />
                            {/* Render HTML content */}
                            {/* <BlogLike postId={useId} /> */}
                            <div className={cx('like-section')}>
                                <button onClick={handleLike} className={liked ? cx('liked') : cx('like-button')}>
                                    {liked ? (
                                        <div>
                                            <img src={IMAGES.likeIcon} />
                                        </div>
                                    ) : (
                                        <div>
                                            <img src={IMAGES.unlikeIcon} />
                                        </div>
                                    )}
                                    <p>Like</p>
                                </button>

                                <p onClick={toggleLikePopup} className={cx('like-count')}>
                                    {likeCount}
                                </p>
                            </div>
                            <BlogComment postId={useId} />
                        </div>
                    </div>
                    {showLikePopup && (
                        <div className={cx('like-popup')}>
                            <div className={cx('popup-content')}>
                                <h3>people like this</h3>
                                <ul>
                                    {likeUsers.length > 0 ? (
                                        likeUsers.map((user, index) => (
                                            <li key={index}>{user}</li> // Hiển thị tên người đã like
                                        ))
                                    ) : (
                                        <li>No likes yet.</li>
                                    )}
                                </ul>
                                <button onClick={toggleLikePopup} className={cx('close-popup')}>
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <p>Pet data not available</p> // Hiển thị nếu không có dữ liệu
            )}
        </div>
    );
}

export default BlogDetail;
