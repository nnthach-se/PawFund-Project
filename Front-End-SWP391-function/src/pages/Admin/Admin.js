import styles from './Admin.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
import Dashboard from './components/Dashboard/Dashboard';
import User from './components/User/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBlog,
    faCalendarDays,
    faHouse,
    faListCheck,
    faNewspaper,
    faPaw,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Pets from './components/Pets/Pets';
import Blogs from './components/Blogs/Blogs';
import Events from './components/Events/Events';
import Application from './components/Application/Application';
import VolunteerApplication from './components/VolunteerApplication/VolunteerApplication';
import VolunteerTask from './components/VolunteerTask/VolunteerTask';
import { ToastContainer } from 'react-bootstrap';
import TaskFeedback from './components/TaskFeedback/TaskFeedback';
import AdopterFeedback from './components/AdopterFeedback/AdopterFeedback';

const cx = classNames.bind(styles);

function Admin() {
    const [content, setContent] = useState(() => {
        return localStorage.getItem('adminContent') || 'Dashboard';
    });
    const [totalUser, setTotalUser] = useState(0);
    const [totalPet, setTotalPet] = useState(0);
    const [totalAppli, setTotalAppli] = useState(0);

    useEffect(() => {
        localStorage.setItem('adminContent', content);
        if (content === 'Dashboard') {
            const storedTotalUser = localStorage.getItem('totalUser');
            const storedTotalPet = localStorage.getItem('totalPets');
            const storedTotalAppli = localStorage.getItem('totalAppli');

            setTotalUser(storedTotalUser ? JSON.parse(storedTotalUser) : 0);
            setTotalPet(storedTotalPet ? JSON.parse(storedTotalPet) : 0);
            setTotalAppli(storedTotalAppli ? JSON.parse(storedTotalAppli) : 0);
        }
    }, [content]);

    const handleContentChange = (newContent) => {
        setContent(newContent);
    };
    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <Header />

            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <div
                        className={cx('sidebar-item', { active: content === 'Dashboard' })}
                        onClick={() => handleContentChange('Dashboard')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faHouse} className={cx('icon')} />
                            Dashboard
                        </span>
                    </div>
                    <div
                        className={cx('sidebar-item', { active: content === 'Pets' })}
                        onClick={() => handleContentChange('Pets')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faPaw} className={cx('icon')} />
                            Pets
                        </span>
                    </div>
                    <div
                        className={cx('sidebar-item', { active: content === 'Users' })}
                        onClick={() => handleContentChange('Users')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                            Users
                        </span>
                    </div>
                    <div
                        className={cx('sidebar-item', { active: content === 'Blogs' })}
                        onClick={() => handleContentChange('Blogs')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faBlog} className={cx('icon')} />
                            Blogs
                        </span>
                    </div>
                    <div
                        className={cx('sidebar-item', { active: content === 'Events' })}
                        onClick={() => handleContentChange('Events')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faCalendarDays} className={cx('icon')} />
                            Events
                        </span>
                    </div>
                    <div
                        className={cx('sidebar-item', { active: content === 'VolunteerTask' })}
                        onClick={() => handleContentChange('VolunteerTask')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faListCheck} className={cx('icon')} />
                            Volunteer Task
                        </span>
                    </div>
                    <div
                        className={cx('sidebar-item', { active: content === 'Application' })}
                        onClick={() => handleContentChange('Application')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faNewspaper} className={cx('icon')} />
                            Adopt Application
                        </span>
                    </div>
                    <div
                        className={cx('sidebar-item', { active: content === 'VolunteerApplication' })}
                        onClick={() => handleContentChange('VolunteerApplication')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faNewspaper} className={cx('icon')} />
                            Volunteer Application
                        </span>
                    </div>

                    <div
                        className={cx('sidebar-item', { active: content === 'TaskFeedback' })}
                        onClick={() => handleContentChange('TaskFeedback')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faNewspaper} className={cx('icon')} />
                            Tasks Feedback
                        </span>
                    </div>
                    <div
                        className={cx('sidebar-item', { active: content === 'AdopterFeedback' })}
                        onClick={() => handleContentChange('AdopterFeedback')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faNewspaper} className={cx('icon')} />
                            Adopter Feedback
                        </span>
                    </div>
                </div>
                <div className={cx('content')}>
                    {content == 'Dashboard' ? (
                        <Dashboard />
                    ) : content == 'Pets' ? (
                        <Pets />
                    ) : content == 'Blogs' ? (
                        <Blogs />
                    ) : content == 'Events' ? (
                        <Events />
                    ) : content == 'Application' ? (
                        <Application />
                    ) : content == 'VolunteerApplication' ? (
                        <VolunteerApplication />
                    ) : content == 'VolunteerTask' ? (
                        <VolunteerTask />
                    ) : content == 'TaskFeedback' ? (
                        <TaskFeedback />
                    ) : content == 'AdopterFeedback' ? (
                        <AdopterFeedback />
                    ) : (
                        <User />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Admin;
