import styles from './AppliContent.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function AppliContent({ currentAppli, setAppliID, setViewAppli }) {
    if (!Array.isArray(currentAppli) || currentAppli.length === 0) {
        return <p>No applications available</p>;
    }

    return (
        <div className={cx('content')}>
            {currentAppli.map((appli) => (
                <div className={cx('content-item')} key={appli.applicationId}>
                    <p className={cx('id')}>#{appli.applicationId}</p>
                    <div className={cx('user')}>
                        <p className={cx('fullname')}>{appli.fullName}</p>
                    </div>
                    <div className={cx('pet')}>
                        <p className={cx('petname')}>
                            {appli.pet && appli.pet.petName ? appli.pet.petName : 'No Pet Info'}
                        </p>
                    </div>
                    <div className={cx('status')}>
                        <p
                            className={cx(
                                String(appli.status) === '0'
                                    ? 'inprocess'
                                    : String(appli.status) === '2'
                                    ? 'notpass'
                                    : String(appli.status) === '3'
                                    ? 'approved'
                                    : String(appli.status) === '4'
                                    ? 'denied'
                                    : null,
                            )}
                        >
                            {String(appli.status) === '0'
                                ? 'In Process'
                                : String(appli.status) === '1'
                                ? 'Passed'
                                : String(appli.status) === '2'
                                ? 'Not Passed'
                                : String(appli.status) === '4'
                                ? 'Denied'
                                : 'Approved'}
                        </p>
                    </div>
                    <p className={cx('date')}>{appli.createAt ? new Date(appli.createAt).toLocaleDateString() : ''}</p>
                    <p className={cx('date')}>
                        {appli.status !== '0' && appli.updateAt ? new Date(appli.updateAt).toLocaleDateString() : ''}
                    </p>
                    <div className={cx('action')}>
                        <FontAwesomeIcon
                            icon={faEye}
                            className={cx('view-icon')}
                            onClick={() => {
                                setAppliID(appli.applicationId);
                                setViewAppli(true);
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AppliContent;
