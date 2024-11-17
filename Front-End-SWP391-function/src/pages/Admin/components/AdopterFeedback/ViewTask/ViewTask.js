import { useEffect, useState } from 'react';
import styles from './ViewTask.module.scss';
import classNames from 'classnames/bind';
import api from '~/config/axios';
import Tasks from './Tasks/Tasks';

const cx = classNames.bind(styles);

function ViewTask({ id, setViewUser }) {
    const [task, setTask] = useState(null);
    const [update, setUpdate] = useState(false);
    const [formData, setFormData] = useState({});
    const [isUndertake, setIsUndertake] = useState(false);

    const handleTaskData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`tasks/${id}`, {
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
    }, [isUndertake]);

    if (!task) {
        return <div>Loading...</div>;
    }

    const toggleUpdate = () => {
        setUpdate(!update);
        window.scrollTo({
            top: 500,
            behavior: 'smooth',
        });
    };

    const closeUpdate = () => {
        setUpdate(false);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={cx('wrapper')}>
            <p style={{ cursor: 'pointer', width: '70px' }} onClick={() => setViewUser(false)}>
                &larr;Back
            </p>

            <div className={cx('wrapper-bottom')}>
                <div className={cx('container-left')}>
                    <div className={cx('container-info')}>
                        <Tasks id={id} task={task} setIsUndertake={setIsUndertake} />
                    </div>
                </div>
            </div>

            {/* {update && (
                <Update
                    setUpdate={setUpdate}
                    formData={formData}
                    setFormData={setFormData}
                    closeUpdate={closeUpdate}
                    handleTaskData={handleTaskData}
                    id={id}
                />
            )} */}
        </div>
    );
}

export default ViewTask;

