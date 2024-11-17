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

function ViewTask({ id, setViewUser }) {
    const [task, setTask] = useState(null);
    const [update, setUpdate] = useState(false);
    const [formData, setFormData] = useState({});
    const [petIdInAppli, setPetIdInAppli] = useState('');
    // const [openCreateIssue, setOpenCreateIssue] = useState(false);
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
            setPetIdInAppli(response.data.result.petId);
            console.log('set pet id in task',response.data.result.petId);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleTaskData();
        // handleTaskIssue();
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
                        <Tasks petIdInAppli={petIdInAppli} id={id} task={task} setIsUndertake={setIsUndertake} />
                    </div>
                </div>
            </div>
{/* 
            {update && (
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
{
    /* {openIssueDetail ? (
                    <div className={cx('container-right')}>
                        <IssuesDetail
                            id={id}
                            issueStatusDetail={issueStatusDetail}
                            setOpenIssueDetail={setOpenIssueDetail}
                        />
                    </div>
                ) : null} */
}

{
    /* {task.adopter !== null ? <Adopter /> : null}

                        <HomeCheck/> */
}

{
    /* {task.issues.length == 0 ? (
                            <>
                                <Button primary onClick={() => setOpenCreateIssue(true)}>
                                    Create Issue
                                </Button>
                                {openCreateIssue && (
                                    <AddIssue
                                        tagIssueData={tagIssueData}
                                        id={id}
                                        setOpenCreateIssue={setOpenCreateIssue}
                                    />
                                )}
                            </>
                        ) : (
                            <Issue
                                setIssueStatusDetail={setIssueStatusDetail}
                                setOpenIssueDetail={setOpenIssueDetail}
                                task={task}
                            />
                        )} */
}
