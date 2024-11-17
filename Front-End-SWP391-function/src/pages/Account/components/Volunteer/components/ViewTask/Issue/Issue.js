import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Issue.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Issue({ setOpenIssueDetail, task, setIssueStatusDetail }) {
    console.log('task isssue ne',task.issues);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>
                <b>Issues</b>
            </p>

            <div className={cx('container')}>
                {/* Not Started Box */}
                <div className={cx('issue-box', 'notstart')}>
                    <p className={cx('issue-box-state')}>
                        <b>Not Started</b>
                    </p>
                    {task.issues.filter((issue) => issue.status === 'NOT_STARTED').length > 0 ? (
                        task.issues
                            .filter((issue) => issue.status === 'NOT_STARTED')
                            .map((issue, index) => (
                                <>
                                    <div key={index} className={cx('issue-box-info')}>
                                        <p>Due Date: {issue.dueDate}</p>
                                        <p>Title: {issue.title}</p>
                                        {/* <p>Priority: {issue.priority}</p> */}
                                    </div>
                                    <div className={cx('more')}>
                                        <p
                                            onClick={() => {
                                                setOpenIssueDetail(true);
                                                setIssueStatusDetail('NOT_STARTED');
                                            }}
                                        >
                                            More &gt;
                                        </p>
                                    </div>
                                </>
                            ))
                    ) : (
                        <p>No issues</p>
                    )}
                </div>

                {/* In Process Box */}
                <div className={cx('issue-box', 'inprocess')}>
                    <p className={cx('issue-box-state')}>
                        <b>In Process</b>
                    </p>
                    {task.issues.filter((issue) => issue.status === 'IN_PROGRESS').length > 0 ? (
                        task.issues
                            .filter((issue) => issue.status === 'IN_PROGRESS')
                            .map((issue, index) => (
                                <>
                                    <div key={index} className={cx('issue-box-info')}>
                                        <p>Due Date: {issue.dueDate}</p>
                                        <p>Title: {issue.title}</p>
                                        <p>Priority: {issue.priority}</p>
                                    </div>
                                    <div className={cx('more')}>
                                        <p
                                            onClick={() => {
                                                setOpenIssueDetail(true);
                                                setIssueStatusDetail('IN_PROGRESS');
                                            }}
                                        >
                                            More &gt;
                                        </p>
                                    </div>
                                </>
                            ))
                    ) : (
                        <p>No issues</p>
                    )}
                </div>

                {/* Done Box */}
                <div className={cx('issue-box', 'done')}>
                    <p className={cx('issue-box-state')}>
                        <b>Done</b>
                    </p>
                    {task.issues.filter((issue) => issue.status === 'DONE').length > 0 ? (
                        task.issues
                            .filter((issue) => issue.status === 'DONE')
                            .map((issue, index) => (
                                <>
                                    <div key={index} className={cx('issue-box-info')}>
                                        <p>Due Date: {issue.dueDate}</p>
                                        <p>Title: {issue.title}</p>
                                        <p>Priority: {issue.priority}</p>
                                    </div>
                                    <div className={cx('more')}>
                                        <p
                                            onClick={() => {
                                                setOpenIssueDetail(true);
                                                setIssueStatusDetail('DONE');
                                            }}
                                        >
                                            More &gt;
                                        </p>
                                    </div>
                                </>
                            ))
                    ) : (
                        <p>No issues</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Issue;
