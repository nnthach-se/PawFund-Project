import styles from './UserContent.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function UserContent({ currentUser, setViewUser, setUserID }) {
    return (
        <div className={cx('content')}>
            {currentUser.map((user) => (
                <div className={cx('content-item')} key={user.id}>
                    <p className={cx('id')}>#{user.id}</p>
                    <div className={cx('name')}>
                        <p className={cx('username')}>{user.username}</p>
                        <p className={cx('fullname')}>{`${user.firstname} ${user.lastname}`}</p>
                    </div>
                    <div className={cx('role')}>
                        {user.roles.some((role) => role.name === 'ADMIN') ? (
                            <p className={cx('admin')}>Admin</p>
                        ) : user.roles.some((role) => role.name === 'USER') ? (
                            <p className={cx('user')}>User</p>
                        ) : user.roles.some((role) => role.name === 'VOLUNTEER') ? (
                            <p className={cx('volunteer')}>Volunteer</p>
                        ) : user.roles.some((role) => role.name === 'SHELTER_STAFF') ? (
                            <p className={cx('shelter')}>Shelter</p>
                        ) : null}
                    </div>
                    <p className={cx('appli')}>{user.applicationQuantity || 0}</p>
                    <p className={cx('date')}>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}</p>
                    <div className={cx('action')}>
                        <FontAwesomeIcon
                            icon={faEye}
                            className={cx('view-icon')}
                            onClick={() => {
                                setUserID(user.id);
                                setViewUser(true);
                                console.log(user.id);
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UserContent;
