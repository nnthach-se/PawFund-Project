import { faListCheck, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Tasks.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomeCheck from '../HomeCheck/HomeCheck';
import Button from '~/components/Button';
import api from '~/config/axios';
import { useEffect, useState } from 'react';
import HomeCheckResult from '../HomeCheckResult/HomeCheckResult';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function Tasks({ taskID, task, setIsUndertake, setIsSendHomeCheck }) {
    const [checklistState, setChecklistState] = useState([]);
    const [completedCheckList, setCompletedCheckList] = useState(0);

    // useEffect(() => {
    //     const initialChecklistState = task.checklist.checklistItems.map((item) => ({
    //         id: item.id,
    //         entry: item.entry,
    //         completed: item.completed,
    //     }));
    //     setChecklistState(initialChecklistState);
    // }, [task]);

    // const handleCheckboxChange = (id) => {
    //     setChecklistState((prevState) => {
    //         return prevState.map((item) => {
    //             if (item.id === id) {
    //                 return { ...item, completed: !item.completed }; 
    //             }
    //             return item;
    //         });
    //     });
    // };

    // useEffect(() => {
    //     const completedItems = checklistState.filter((item) => item.completed);
    //     const newCompletedCount = completedItems.length;

    //     // Chỉ cập nhật khi số lượng thực sự thay đổi
    //     if (newCompletedCount !== completedCheckList) {
    //         setCompletedCheckList(newCompletedCount);
    //         console.log('completed', newCompletedCount); 
    //     }
    // }, [checklistState]);

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

    // const handleUpdateCheckList = async (e) => {
    //     e.preventDefault();
    //     const token = localStorage.getItem('token');

    //     try {
    //         await Promise.all(
    //             checklistState.map(async (checkItem) => {
    //                 const response = await api.put(
    //                     `checklists/${task.checklist.id}/entry?entryId=${checkItem.id}&completed=${checkItem.completed}`,
    //                     {
    //                         headers: {
    //                             Authorization: `Bearer ${token}`,
    //                         },
    //                     },
    //                 );
    //                 console.log('update checklist', response.data);
    //             }),
    //         );
    //         toast.success('Updated Checklist Successfully');
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const formatDueDate = (dueDate) => {
        const formattedDate = dueDate.slice(0, 16).replace('T', ' / ');
        return formattedDate;
    };

    const handleUnderTakeTask = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await api.get(`tasks/${taskID}/attend`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('undertake', response.data);
            setIsUndertake(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className={cx('task-info')}>
                <div className={cx('task-title')}>
                    <p>Task</p>
                    <p>Due date: {formatDueDate(task.dueDate)}</p>
                </div>

                <div className={cx('task-name')}>
                    <span
                        className={cx('task-status', {
                            'status-notstart': task.status === 'NOT_STARTED',
                            'status-inprocess': task.status === 'IN_PROGRESS',
                            'status-done': task.status === 'DONE',
                        })}
                        style={{ visibility: 'hidden' }}
                    >
                        {formatStatus(task.status)}
                    </span>

                    <h5>
                        <b>{task.name}</b>
                    </h5>

                    <span
                        className={cx('task-status', {
                            'status-notstart': task.status === 'NOT_STARTED',
                            'status-inprocess': task.status === 'IN_PROGRESS',
                            'status-done': task.status === 'DONE',
                        })}
                    >
                        {formatStatus(task.status)}
                    </span>
                </div>

                <div className={cx('task-content')}>
                    <div className={cx('task-checklist-wrap')}>
                        <div className={cx('task-right-info')}>
                            <p style={{ marginBottom: 5 }}>
                                <b>Description</b>
                            </p>
                            <div className={cx('task-des-wrap')}>{task.description}</div>
                        </div>
                        {/* <div className={cx('checklist')}>
                            <div className={cx('checklist-heading')}>
                                <p style={{ marginBottom: 5 }}>
                                    <b>Checklist</b>
                                </p>
                                {task.checklist.assignee !== null ? (
                                    <p style={{ marginBottom: 5 }}>{task.checklist.assignee.username}</p>
                                ) : null}
                            </div>
                            <div className={cx('checklist-range')}>
                                <div className={cx('checklist-range-heading')}>
                                    <FontAwesomeIcon icon={faListCheck} className={cx('icon-checked')} />
                                    {completedCheckList}/5
                                </div>
                                <div className={cx('range-slide')}>
                                    <div
                                        className={cx('range-fill')}
                                        style={{
                                            width: `${(completedCheckList / 5) * 100}%`,
                                        }}
                                    />
                                </div>
                            </div>
                            <form onSubmit={handleUpdateCheckList}>
                                {checklistState.map((checkItem) => (
                                    <div className={cx('checklist-item')} key={checkItem.id}>
                                        <input
                                            type="checkbox"
                                            id={`checkitem-${checkItem.id}`}
                                            checked={checkItem.completed}
                                            onChange={() => handleCheckboxChange(checkItem.id)}
                                        />
                                        <label htmlFor={`checkitem-${checkItem.id}`}>{checkItem.entry}</label>
                                    </div>
                                ))}
                                {task.checklist.assignee !== null ? (
                                    <Button primary small type="submit" className={cx('save-checklist-btn')}>
                                        Save
                                    </Button>
                                ) : null}
                            </form>
                        </div> */}
                    </div>
                    <div className={cx('adopter-info')}>
                        <p style={{ marginBottom: 5 }}>
                            <b>Adopter Information</b>
                        </p>
                        <div className={cx('adopter-detail-wrap')}>
                            <div className={cx('adopter-detail-info-top')}>
                                <div className={cx('adopter-detail-info-top-left')}>
                                    <span className={cx('adopter-detail-info')}>
                                        {task.adopter.lastname} {task.adopter.firstname}
                                    </span>
                                    <span className={cx('adopter-detail-info')}>{task.adopter.email}</span>
                                    <span className={cx('adopter-detail-info')}>{task.adopter.address}</span>
                                </div>
                                <div className={cx('adopter-detail-info-top-right')}>
                                    <span className={cx('adopter-detail-info')}>{task.adopter.phone}</span>
                                    <span className={cx('adopter-detail-info')}>{task.adopter.phone}</span>
                                    <span className={cx('adopter-detail-info')}>{task.adopter.gender}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {task.feedbacks.length > 0 ? <HomeCheckResult task={task} /> : null}

                    {/* task.checklist.assignee !== null &&  */}

                    {task.team.length > 1 && !task.feedbacks.length > 0 ? (
                        <HomeCheck task={task} taskID={task.id} setIsSendHomeCheck={setIsSendHomeCheck} />
                    ) : null}

                    {task.team.length === 1 ? (
                        <Button primary className={cx('undertake-btn')} onClick={handleUnderTakeTask}>
                            Undertake
                        </Button>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default Tasks;
