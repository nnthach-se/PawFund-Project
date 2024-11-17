import Button from '~/components/Button';
import styles from './Comment.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import api from '~/config/axios';

const cx = classNames.bind(styles);

function Comment({ id, commentIssue, singleIssueID }) {
    const [searchName, setSearchName] = useState('');
    const formatDueDate = (dueDate) => {
        const formattedDate = dueDate.slice(0, 16).replace('T', ' ');
        return formattedDate;
    };
    const handleSearchChange = (e) => {
        setSearchName(e.target.value);
    };
    const clearSearch = () => {
        handleSearchChange({ target: { value: '' } });
    };

    const handleCreateComment = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await api.post(
                `comments/issue/${singleIssueID}/task/${id}`,
                { content: searchName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.status === 200) {
                setSearchName('');
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className={cx('comment')}>
            <p className={cx('heading')}>
                <b>Comments</b>
            </p>
            <div className={cx('comment-content')}>
                {commentIssue.length > 0 ? (
                    commentIssue.map((comment) => (
                        <div key={comment.id} className={cx('comment-item')}>
                            <p className={cx('comment-detail')}>
                                {comment.user} - {formatDueDate(comment.createdAt)}
                            </p>
                            <p>{comment.content}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments available.</p>
                )}

                <div className={cx('add-comment')}>
                    <form onSubmit={handleCreateComment}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="Create your comment"
                                value={searchName}
                                onChange={handleSearchChange}
                            />

                            {searchName && (
                                <span
                                    onClick={clearSearch}
                                    style={{
                                        position: 'absolute',
                                        top: '3px',
                                        right: '15px',
                                        cursor: 'pointer',
                                        color: '#aaa',
                                    }}
                                >
                                    &times;
                                </span>
                            )}
                        </div>
                        <Button primary className={cx('create-btn')} type="submit">
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Comment;
