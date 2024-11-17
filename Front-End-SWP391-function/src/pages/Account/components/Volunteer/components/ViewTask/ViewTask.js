import { useEffect, useState } from 'react';
import styles from './ViewTask.module.scss';
import classNames from 'classnames/bind';
import api from '~/config/axios';
import Button from '~/components/Button';
import Update from './Update';
import Issues from './IssuesDetail/IssuesDetail';
import Tasks from './Tasks/Tasks';
import AddIssue from '../AddIssue/AddIssue';
import IssuesDetail from './IssuesDetail/IssuesDetail';
import Adopter from './Adopter/Adopter.js';
import Issue from './Issue/Issue';
import HomeCheck from './HomeCheck/HomeCheck';

const cx = classNames.bind(styles);

function ViewTask({ setUndertakeTask, taskID }) {
    const [task, setTask] = useState(null);
    const [isUndertake, setIsUndertake] = useState(false);
    const [isSendHomeCheck, setIsSendHomeCheck] = useState(false);

    const handleTaskData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`tasks/${taskID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('task data: ', response.data.result);
            setTask(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleTaskData();
    }, [isUndertake, isSendHomeCheck]);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div className={cx('wrapper')}>
            <p style={{ cursor: 'pointer', width: '70px' }} onClick={() => setUndertakeTask('Tasks')}>
                &larr;Back
            </p>

            <div className={cx('wrapper-bottom')}>
                <div className={cx('container-left')}>
                    <div className={cx('container-info')}>
                        <Tasks taskID={taskID} task={task} setIsUndertake={setIsUndertake} setIsSendHomeCheck={setIsSendHomeCheck}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewTask;
