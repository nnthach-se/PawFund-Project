import styles from './VolunteerTask.module.scss';
import classNames from 'classnames/bind';
import { Dropdown, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import api from '~/config/axios';
import Search from './components/Search/Search';
import ViewTask from './components/ViewTask/ViewTask';
import TaskContent from './components/TaskContent/TaskContent';
import Button from '~/components/Button';
import AddTask from './components/AddTask/AddTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddTag from './components/AddTag/AddTag';
import AddIssue from './components/AddIssue/AddIssue';
import AddTemplate from './components/AddTemplate/AddTemplate';

const cx = classNames.bind(styles);

function VolunteerTask() {
    const [currentPage, setCurrentPage] = useState(1);
    const [taskList, setTaskList] = useState([]);
    // const [tagTaskData, setTagTaskData] = useState([]);
    // const [tagIssueData, setTagIssueData] = useState([]);
    const [dataLength, setDataLength] = useState(0);
    const [viewTask, setViewTask] = useState(false);
    const [taskID, setTaskID] = useState('');
    const [activeSort, setActiveSort] = useState('View All');
    const [searchName, setSearchName] = useState('');
    const [addAll, setAddAll] = useState('');
    const [filter, setFilter] = useState({
        category: '',
        status: '',
        dueDate: '',
    });

    const items = [
        // {
        //     label: (
        //         <Button width100 primary mgRight10 onClick={() => setAddAll('add-tag')}>
        //             Create Tag
        //         </Button>
        //     ),
        // },
        {
            label: (
                <Button width100 primary mgRight10 onClick={() => setAddAll('add-task')}>
                    Create Task
                </Button>
            ),
        },
        {
            label: (
                <Button width100 primary mgRight10 onClick={() => setAddAll('add-template')}>
                    Create Template
                </Button>
            ),
        },
    ];

    // const handleTagsTaskData = async () => {
    //     const token = localStorage.getItem('token');

    //     try {
    //         const response = await api.get(`tags/type/TASK_LABEL`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         console.log('tag task', response.data.result);
    //         setTagTaskData(response.data.result);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const handleTagsIssueData = async () => {
    //     const token = localStorage.getItem('token');

    //     try {
    //         const response = await api.get(`tags/type/ISSUE_LABEL`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         console.log('tag issue', response.data.result);
    //         setTagIssueData(response.data.result);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log('filterchange', name, value);

        setFilter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTaskData = async () => {
        const { category, status, dueDate } = filter;
        const query = `category=${category}&status=${status}&dueDate=${dueDate}`;
        const token = localStorage.getItem('token');

        try {
            const response = await api.get(`tasks/sort?${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('list task ', response.data.result);
            setTaskList(response.data.result);
            setDataLength(response.data.result.length);
        } catch (error) {
            console.log(error);
            setTaskList([]);
        }
    };

    const handleFinish = async (e) => {
        if (e) e.preventDefault();
        await handleTaskData();

        const searchParams = {
            searchName,
            filter,
        };
        console.log(searchParams);
    };

    useEffect(() => {
        handleTaskData();
        // handleTagsTaskData();
        // handleTagsIssueData();
    }, [viewTask, currentPage, addAll, filter]);

    const taskPerPage = 12;
    const indexOfLastTask = currentPage * taskPerPage;
    const indexOfFirstTask = indexOfLastTask - taskPerPage;
    const currentTask = taskList.slice(indexOfFirstTask, indexOfLastTask);

    return (
        <>
            {addAll == '' ? (
                <div className={cx('wrapper')}>
                    <h1>Volunteer Task</h1>

                    {!viewTask ? (
                        <>
                            <div className={cx('user-sum')}>
                                <div className={cx('user-sum-item')}>
                                    <div>
                                        <p className={cx('item-number')}>{dataLength}</p>
                                        <p className={cx('item-label')}>Total Tasks</p>
                                    </div>
                                    <span>+2.15%</span>
                                </div>
                            </div>

                            <div className={cx('user-content')}>
                                <div className={cx('header')}>
                                    <div className={cx('sort')}>
                                        <p
                                            className={cx({ active: activeSort == 'View All' })}
                                            onClick={() => {
                                                setActiveSort('View All');
                                                setFilter((prev) => ({ ...prev, category: 'All' }));
                                                setCurrentPage(1);
                                            }}
                                        >
                                            View All
                                        </p>
                                        <p
                                            className={cx({ active: activeSort == 'Events' })}
                                            onClick={() => {
                                                setActiveSort('Events');
                                                setFilter((prev) => ({ ...prev, category: 'EVENT' }));
                                                setCurrentPage(1);
                                            }}
                                        >
                                            Events
                                        </p>
                                        <p
                                            className={cx({ active: activeSort == 'Adoption' })}
                                            onClick={() => {
                                                setActiveSort('Adoption');
                                                setFilter((prev) => ({ ...prev, category: 'ADOPTION' }));
                                                setCurrentPage(1);
                                            }}
                                        >
                                            Adoption
                                        </p>
                                    </div>
                                    <Dropdown menu={{ items }}>
                                        <div className={cx('add-task')}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </div>
                                    </Dropdown>

                                    <Search
                                        setSearchName={setSearchName}
                                        searchName={searchName}
                                        handleFinish={handleFinish}
                                        filter={filter}
                                        handleFilterChange={handleFilterChange}
                                    />
                                </div>

                                <div className={cx('main-content')}>
                                    <div className={cx('content-wrapper')}>
                                        <div className={cx('header-content')}>
                                            <p className={cx('id')}>ID</p>
                                            <p className={cx('name')}>Name</p>
                                            <p className={cx('state')}>Status</p>
                                            <p className={cx('date')}>Due Date</p>
                                            <p className={cx('action')}>Action</p>
                                        </div>

                                        {taskList.length === 0 ? (
                                            <p
                                                style={{ textAlign: 'center', marginTop: 16 }}
                                                className={cx('null-pet-list')}
                                            >
                                                No tasks found
                                            </p>
                                        ) : (
                                            <TaskContent
                                                currentTask={currentTask}
                                                setViewTask={setViewTask}
                                                setTaskID={setTaskID}
                                            />
                                        )}
                                    </div>
                                    <div className={cx('pagination')}>
                                        <Pagination
                                            style={{ display: 'block' }}
                                            current={currentPage}
                                            defaultCurrent={1}
                                            total={dataLength}
                                            pageSize={taskPerPage}
                                            onChange={(page) => setCurrentPage(page)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <ViewTask
                            id={taskID}
                            setViewUser={setViewTask}
                            // tagIssueData={tagIssueData}
                            setAddAll={setAddAll}
                        />
                    )}
                </div>
            ) : addAll == 'add-task' ? (
                <AddTask setAddAll={setAddAll} />
            ) : addAll == 'add-tag' ? (
                <AddTag setAddAll={setAddAll} />
            ) : addAll == 'add-template' ? (
                <AddTemplate setAddAll={setAddAll} />
            ) : null}
        </>
    );
}

export default VolunteerTask;
