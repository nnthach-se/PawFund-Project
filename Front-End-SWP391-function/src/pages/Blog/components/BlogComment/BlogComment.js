import React, { useEffect, useState } from 'react';
import api from '~/config/axios';
import './BlogComment.scss';
import { Button } from '@mui/material';

const BlogComment = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [visibleComments, setVisibleComments] = useState(10);

    // const [loading, setLoading] = useState(true);
    // Fetch comments when component mounts
    const reversedComment = [...comments].reverse();
    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            // setLoading(true);
            const response = await api.get(`comments/post/${postId}`);
            setComments(response.data.result);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            // setLoading(false); // Hoàn tất quá trình tải
        }
    };

    console.log(reversedComment);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            // setLoading(true);
            const response = await api.post(`comments/post/${postId}`, {
                content: newComment,
                username: 'currentUser', // Replace with actual username
            });
            setComments([...comments, response.data.result]); // Add new comment to state
            setNewComment(''); // Clear input field
        } catch (error) {
            console.error('Error posting comment:', error);
        } finally {
            // setLoading(false); // Hoàn tất quá trình tải
        }
    };

    // Function to handle key down events
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                // Allow new line if Shift is pressed
                return; // Let the default behavior happen
            } else {
                e.preventDefault(); // Prevent default behavior (new line)
                handleCommentSubmit(e); // Submit comment
            }
        }
    };

    const handleViewMore = () => {
        setVisibleComments((prev) => prev + 5); // Hiển thị thêm 5 bình luận
    };

    return (
        <div className="comment_section">
            {/* {loading ? (
                <p>Loading pet information...</p> // Hiển thị khi đang tải
            ) : reverseComment ? (
                <> */}
            <h4>Comments</h4>
            <form className="comment_section_form" onSubmit={handleCommentSubmit}>
                <textarea
                    className="comment_section_textArea"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a comment..."
                    required
                />
            </form>
            {/* <div className="comment_section_form_submitBtn">
                <button type="submit">send</button>
            </div> */}

            <div className="blogCommentSection">
                {reversedComment.slice(0, visibleComments).map((comment) => (
                    <div className="blogCommentSection_each" key={comment.id}>
                        <div className="blogCommentSection_each_username_createDate">
                            <div className="blogCommentSection_each_username">
                                <strong>{comment.user}</strong>
                            </div>
                            <div className="blogCommentSection_each_createDate">
                                <small>
                                    {comment.createdAt
                                        ? new Date(comment.createdAt).toLocaleString()
                                        : 'No date available'}
                                </small>
                            </div>
                        </div>

                        <div className="blogCommentSection_each_content">
                            <p>
                                {comment.content.split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        {index < comment.content.split('\n').length - 1 && <br />}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                ))}
                {visibleComments < comments.length && (
                    <Button onClick={handleViewMore} color="primary">
                        View More
                    </Button>
                )}
            </div>
            {/* </>
            ) : (
                <p>Pet data not available</p> // Hiển thị nếu không có dữ liệu
            )} */}
        </div>
    );
};

export default BlogComment;
