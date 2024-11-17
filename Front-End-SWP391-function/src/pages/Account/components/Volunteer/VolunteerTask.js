import classNames from 'classnames/bind';
import styles from './VolunteerTask.module.scss';
import { useState } from 'react';
import TaskList from './components/TaskList/TaskList';
import ViewTask from './components/ViewTask/ViewTask';
import { ToastContainer } from 'react-toastify';
import React from 'react';

const cx = classNames.bind(styles);

function VolunteerTasks() {
    
    const [undertakeTask, setUndertakeTask] = useState('Tasks');
    const [taskID, setTaskID] = useState(null);
    const renderTaskComponent = () => {
        switch (undertakeTask) {
            case 'Tasks':
                return <TaskList setUndertakeTask={setUndertakeTask} setTaskID={setTaskID} />;
            case 'ViewTask':
                return <ViewTask setUndertakeTask={setUndertakeTask} taskID={taskID} />;
            default:
                return null;
        }
    };

    return (
        <>
            <ToastContainer autoClose={1000} />
            <div className={cx('wrapper')}>{renderTaskComponent()}</div>
        </>
    );
}

export default VolunteerTasks;
