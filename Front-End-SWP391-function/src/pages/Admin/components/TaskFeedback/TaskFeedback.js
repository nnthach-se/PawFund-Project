import Button from '~/components/Button';
import styles from './TaskFeedback.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import api from '~/config/axios';
import Search from './Search/Search';
import FeedbackContent from './FeedbackContent/FeedbackContent';
import ViewTask from './ViewTask/ViewTask';

const cx = classNames.bind(styles);

function TaskFeedback() {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataLength, setDataLength] = useState(0);
    const [feedbackData, setFeedbackData] = useState([]);
    const [viewTask, setViewTask] = useState(false);
    const [taskID, setTaskID] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const handleFeedbackData = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await api.get(`feedbacks/getAvailableFeedbacks`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('feedback list', response.data.result);
            setFeedbackData(response.data.result);
            setDataLength(response.data.result.length);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleFeedbackData();
    }, [updateSuccess]);

    const feedbackPerPage = 12;
    const indexOfLastUser = currentPage * feedbackPerPage;
    const indexOfFirstUser = indexOfLastUser - feedbackPerPage;
    const currentFeedback = feedbackData.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div className={cx('wrapper')}>
            <h1>Tasks Feedback</h1>

            <div className={cx('user-sum')}>
                <div className={cx('user-sum-item')}>
                    <div>
                        <p className={cx('item-number')}>{dataLength}</p>
                        <p className={cx('item-label')}>Total Feedbacks</p>
                    </div>
                    <span>+2.15%</span>
                </div>
                {/* <div className={cx('user-sum-item')}>
                    <div>
                        <p className={cx('item-number')}>10</p>
                        <p className={cx('item-label')}>New Blogs</p>
                    </div>
                    <span>-3.5%</span>
                </div> */}
            </div>

            <div className={cx('user-content')}>
                <div className={cx('header')}>
                    <div className={cx('sort')}>
                        <p>View All</p>
                    </div>
                </div>

                <div className={cx('main-content')}>
                    <div className={cx('content-wrapper')}>
                        <div className={cx('header-content')}>
                            <p className={cx('id')}>ID</p>

                            <p className={cx('petName')}>Pet's Name</p>
                            <p className={cx('totalAppli')}>Total application</p>
                            <p className={cx('status')}>Pet Status</p>
                            <p className={cx('action')}>Action</p>
                        </div>

                        {feedbackData.length === 0 ? (
                            <p style={{ textAlign: 'center', marginTop: 16 }}>No feedbacks found</p>
                        ) : (
                            <FeedbackContent setUpdateSuccess={setUpdateSuccess} currentFeedback={currentFeedback} />
                        )}
                    </div>
                    <div className={cx('pagination')}>
                        <Pagination
                            style={{ display: 'block' }}
                            current={currentPage}
                            defaultCurrent={1}
                            total={dataLength}
                            pageSize={feedbackPerPage}
                            onChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskFeedback;
