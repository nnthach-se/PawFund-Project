import { faListCheck, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
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

function Tasks({ id, task, setIsUndertake }) {
    const [checklistState, setChecklistState] = useState([]);
    const [completedCheckList, setCompletedCheckList] = useState(0);
    const [description, setDescription] = useState(task.description);

    useEffect(() => {
        const initialChecklistState = task.checklist.checklistItems.map((item) => ({
            id: item.id,
            entry: item.entry,
            completed: item.completed,
        }));
        setChecklistState(initialChecklistState);
    }, [task]);

    const handleCheckboxChange = (id) => {
        setChecklistState((prevState) => {
            return prevState.map((item) => {
                if (item.id === id) {
                    return { ...item, completed: !item.completed }; // Đảo trạng thái completed
                }
                return item;
            });
        });
    };

    useEffect(() => {
        const completedItems = checklistState.filter((item) => item.completed);
        const newCompletedCount = completedItems.length;

        // Chỉ cập nhật khi số lượng thực sự thay đổi
        if (newCompletedCount !== completedCheckList) {
            setCompletedCheckList(newCompletedCount);
            console.log('completed', newCompletedCount); // Log ra số lượng hoàn thành
        }
    }, [checklistState]);

    const formatStatus = (status) => {
        return status
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const handleUpdateCheckList = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await Promise.all(
                checklistState.map(async (checkItem) => {
                    const response = await api.put(
                        `checklists/${task.checklist.id}/entry?entryId=${checkItem.id}&completed=${checkItem.completed}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );

                    console.log('update checklist', response.data);
                }),
            );
            toast.success('Updated checklist successfully!');
        } catch (error) {
            console.log(error);
        }
    };

    const formatDueDate = (dueDate) => {
        const formattedDate = dueDate.slice(0, 16).replace('T', ' / ');
        return formattedDate;
    };

    const handleSubmitDescription = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const res = await api.put(
                `tasks/${task.id}`,
                {
                    description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            toast.success('Updated description successfully!');
            console.log('updateDes', res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdatePetAdopted = async () => {
        const petId = 123;

        try {
            const response = await api.put(
                `pets/status/${petId}`,
                {
                    petStatus: 'Adopted',
                },
                {
                    headers: {
                        Authorization: 'No Auth',
                    },
                },
            );
            console.log('update pet adopted', response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateTaskLastStepApprove = async () => {
        const token = localStorage.getItem('token');
        const appliId = task.name.split('(')[1].replace(')', '');
        console.log('appli id', appliId);

        try {
            const response = await api.put(
                `applications/status/${appliId}`,
                {
                    status: 3,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log('update last step', response.data);
            toast.success('Update Application To Approved Successfully');
            await handleUpdatePetAdopted();
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateTaskLastStepDenied = async () => {
        const token = localStorage.getItem('token');
        const appliId = task.name.split('(')[1].replace(')', '');
        console.log('appli id', appliId);

        try {
            const response = await api.put(
                `applications/status/${appliId}`,
                {
                    status: 4,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log('update last step', response.data);
            toast.success('Update Application To Denied Successfully');
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteTask = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await api.delete(`tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('delete task', response.data);
            toast.success('Delete Task Successfully');
        } catch (error) {
            console.log(error);
            toast.error('Fail To Delete Task');
        }
    };

    return (
        <div className={cx('task-info')}>
            <ToastContainer />
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
                        <form onSubmit={handleSubmitDescription}>
                            <label htmlFor="description" style={{ marginBottom: 5 }}>
                                <b>Description</b>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <Button primary small className={cx('save-des-btn')} type="submit">
                                Save
                            </Button>
                        </form>
                    </div>
                    <div className={cx('checklist')}>
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

                            <Button primary small type="submit" className={cx('save-checklist-btn')}>
                                Save
                            </Button>
                        </form>
                    </div>
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

                {task.checklist.assignee === null ? <HomeCheck taskID={id} /> : null}

                {task.feedbacks.length > 0 ? (
                    <div className={cx('last-step-btn')}>
                        <Button primary large mgRight10 onClick={handleUpdateTaskLastStepApprove}>
                            Approve Adopt
                        </Button>
                        <Button large onClick={handleUpdateTaskLastStepDenied}>
                            Deny Adopt
                        </Button>
                    </div>
                ) : null}

                {/* {task.checklist.assignee === null ? (
                    <Button primary className={cx('undertake-btn')} onClick={handleUnderTakeTask}>
                        Undertake
                    </Button>
                ) : null} */}
            </div>

            <div className={cx('delete-task')}>
                <span onClick={handleDeleteTask}>
                    <FontAwesomeIcon icon={faTrash} className={cx('icon-trash')} />
                    Delete
                </span>
            </div>
        </div>
    );
}

export default Tasks;
