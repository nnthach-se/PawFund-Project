import styles from './AppliContent.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AppliContent({ currentAppli, setAppliID, setViewAppli, setUserAppliId, setUserInAppli }) {
    return (
        <div className={cx('content')}>
            {currentAppli.map((appli) => (
                <div className={cx('content-item')} key={appli.volunteerAppliId}>
                    <p className={cx('id')}>#{appli.volunteerAppliId}</p>
                    <div className={cx('user')}>
                        <p className={cx('fullname')}>{appli.fullName}</p>
                    </div>

                    <div className={cx('status')}>
                        <p className={cx(appli.status == '0' ? 'inprocess' : appli.status == '2' ? 'notpass' : null)}>
                            {appli.status == '0' ? 'In Process' : appli.status == '1' ? 'Success' : 'Fail'}
                        </p>
                    </div>
                    <p className={cx('date')}>{appli.createAt ? new Date(appli.createAt).toLocaleDateString() : ''}</p>
                    <p className={cx('date')}>{appli.updateAt ? new Date(appli.updateAt).toLocaleDateString() : ''}</p>
                    <div className={cx('action')}>
                        <FontAwesomeIcon
                            icon={faEye}
                            className={cx('view-icon')}
                            onClick={() => {
                                setUserInAppli(appli.user);
                                setUserAppliId(appli.id);
                                setAppliID(appli.volunteerAppliId);
                                setViewAppli(true);
                                console.log(appli.volunteerAppliId);
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AppliContent;
