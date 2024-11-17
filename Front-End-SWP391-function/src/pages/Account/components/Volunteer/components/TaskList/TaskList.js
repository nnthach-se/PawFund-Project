import classNames from 'classnames/bind';
import styles from './TaskList.module.scss';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import api from '~/config/axios';
import React from 'react';

const cx = classNames.bind(styles);

function TaskList({ setUndertakeTask, setTaskID }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeSort, setActiveSort] = useState('ALL');
    const [taskData, setTaskData] = useState([]);
    const [undertookList, setUndertookList] = useState([]);
    const [showUndertookTasks, setShowUndertookTasks] = useState(false);
    const [filter, setFilter] = useState({
        state: 'ALL',
        sort: 'DESC',
        sortBy: 'createdAt',
    });

    const handleTaskData = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await api.get('tasks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('task list: ', response.data.result);
            setTaskData(response.data.result);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTaskByTeamUndertook = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await api.get('tasks/team', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('task by team: ', response.data.result);
            setUndertookList(response.data.result);
            setShowUndertookTasks(true);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleTaskData();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const newSort = value == 'createdAt' ? 'DESC' : value == 'finishAt' ? 'DESC' : filter.sort;

        setFilter((prev) => ({
            ...prev,
            [name]: value,
            sort: newSort,
        }));
    };

    const formatDueDate = (dueDate) => {
        const formattedDate = dueDate.slice(0, 16).replace('T', ' ');
        return formattedDate;
    };

    const formatStatus = (status) => {
        return status
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const taskPerPage = 6;
    const indexOfLastPet = currentPage * taskPerPage;
    const indexOfFirstPet = indexOfLastPet - taskPerPage;
    const taskPage = taskData.slice(indexOfFirstPet, indexOfLastPet);
    return (
        <>
            <div className={cx('header')}>
                <ul>
                    <li
                        className={cx({ active: activeSort == 'ALL' })}
                        onClick={() => {
                            setActiveSort('ALL');
                            setFilter((prev) => ({ ...prev, role: 'ALL' }));
                            setCurrentPage(1);
                        }}
                    >
                        View All
                    </li>
                    <li
                        className={cx({ active: activeSort == 'Available' })}
                        onClick={() => {
                            setActiveSort('Available');
                            setFilter((prev) => ({ ...prev, role: 'Available' }));
                            setCurrentPage(1);
                        }}
                    >
                        Available
                    </li>
                    <li
                        className={cx({ active: activeSort == 'Unavailable' })}
                        onClick={() => {
                            setActiveSort('Unavailable');
                            setFilter((prev) => ({ ...prev, role: 'Unavailable' }));
                            setCurrentPage(1);
                        }}
                    >
                        Unavailable
                    </li>
                    <li
                        className={cx({ active: activeSort == 'Undertook' })}
                        onClick={() => {
                            setActiveSort('Undertook');
                            handleTaskByTeamUndertook();
                            setCurrentPage(1);
                        }}
                    >
                        Undertook
                    </li>
                </ul>
            </div>

            <div className={cx('sort')}>
                <label htmlFor="sort">Sort</label>
                <select id="sort" name="sort" value={filter.sortBy} onChange={handleFilterChange}>
                    <option value="createdAt">Create Date</option>
                    <option value="finishAt">Finish Date</option>
                </select>
            </div>

            <div className={cx('application-list')}>
                {(showUndertookTasks ? undertookList : taskPage).map((task, index) => (
                    <div className={cx('application-item')} key={index}>
                        <div className={cx('pet-info')}>
                            <div className={cx('detail-info')}>
                                <h4>
                                    <b>{task.name}</b>
                                </h4>
                                <p className={cx('appli-date')}>Due Date: {formatDueDate(task.dueDate)}</p>
                            </div>
                            <div className={cx('appli-state')}>
                                <p
                                    className={cx('task-status', {
                                        'status-notstart': task.status === 'NOT_STARTED',
                                        'status-inprocess': task.status === 'IN_PROGRESS',
                                        'status-done': task.status === 'DONE',
                                    })}
                                >
                                    {formatStatus(task.status)}
                                </p>
                                <button
                                    className={cx('feedback')}
                                    onClick={() => {
                                        setUndertakeTask('ViewTask');
                                        setTaskID(task.id);
                                    }}
                                >
                                    View Task
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <div className={cx('pagination')}>
                    <Pagination
                        style={{ display: 'block' }}
                        current={currentPage}
                        defaultCurrent={1}
                        total={taskData.length}
                        pageSize={6}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </>
    );
}

export default TaskList;
