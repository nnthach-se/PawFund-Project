import api from '~/config/axios';
import styles from './IssuesDetail.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Comment from './Comment/Comment';

const cx = classNames.bind(styles);

function IssuesDetail({ id, setOpenIssueDetail, issueStatusDetail }) {
    const [issueDetailData, setIssueDetailData] = useState(null);
    const [singleIssueID, setSingleIssueID] = useState('');
    const [commentIssue, setCommentIssue] = useState([]);
    const [openDetailAndComment, setOpenDetailAndComment] = useState(false);

    const handleIssueStateDetail = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`issues/tasks/${id}/detail?status=${issueStatusDetail}&sort=Desc`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('issue new detail ', response.data.result);
            setIssueDetailData(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCommentInIssue = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`comments/issue/${singleIssueID}/task/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Comments Issue Detail ', response.data.result);
            setCommentIssue(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const formatStatus = (status) => {
        return status
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    useEffect(() => {
        handleIssueStateDetail();
    }, []);

    useEffect(() => {
        if (singleIssueID) {
            handleCommentInIssue();
            setOpenDetailAndComment(true);
        }
    }, [singleIssueID]);

    return (
        <>
            <div className={cx('issue-detail')}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p className={cx('issue-detail-state')}>{formatStatus(issueStatusDetail)}</p>
                    <p className={cx('close-issue-detail')} onClick={() => setOpenIssueDetail(false)}>
                        Close &times;
                    </p>
                </div>

                {issueDetailData ? (
                    issueDetailData.map((issue) => (
                        <div
                            className={cx('issue-state-info')}
                            key={issue.id}
                            onClick={() => {
                                console.log(issue.id);
                                setSingleIssueID(issue.id);
                            }}
                        >
                            <div className={cx('issue-info-wrap')}>
                                <div className={cx('info-left')}>
                                    <p>
                                        <b>Title: </b>
                                        {issue.title}
                                    </p>
                                    <p>
                                        <b>Priority: </b>
                                        {issue.priority}
                                    </p>
                                    <p style={{ marginBottom: 0 }}>
                                        <b>Due Date: </b>
                                        {issue.dueDate}
                                    </p>
                                </div>

                                <div className={cx('info-right')}>
                                    <p style={{ marginBottom: 5 }}>
                                        <b>Description :</b>
                                    </p>
                                    <div className={cx('des-content')}>{issue.description}</div>
                                </div>
                            </div>
                            <div className={cx('issue-tags')}>
                                {issue.tags.map((tag, index) => (
                                    <p key={index} style={{ backgroundColor: getRandomColor() }}>
                                        {tag}
                                    </p>
                                ))}
                            </div>
                            
                            {openDetailAndComment ? (
                                <Comment id={id} singleIssueID={singleIssueID} commentIssue={commentIssue} />
                            ) : null}
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
}

export default IssuesDetail;
