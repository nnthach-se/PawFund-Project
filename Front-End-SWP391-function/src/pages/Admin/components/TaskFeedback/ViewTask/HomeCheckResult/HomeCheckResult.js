import { faDog, faDollarSign, faPaw, faPersonShelter, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './HomeCheckResult.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button';
import api from '~/config/axios';
import { useEffect, useState } from 'react';
import { faClock, faHeart, faStar } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function HomeCheckResult({ task }) {
    const [imgPopup, setImgPopup] = useState(null);
    const [openImgPopup, setOpenImgPopup] = useState(false);

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    return (
        <>
            <div className={cx('wrapper')}>
                <p className={cx('title')}>
                    <b>Home Check Result</b>
                </p>
                <div className={cx('container-wrap')}>
                    <div className={cx('content-wrap-des')}>
                        <div className={cx('content-wrap-des-assignee')}>
                            <p>
                                {task.checklist.assignee.lastname} {task.checklist.assignee.firstname}
                            </p>
                            <p>{formatDate(task.feedbacks[0].createdAt)}</p>
                        </div>
                        <span>{task.feedbacks[0].content}</span>
                    </div>
                    <div className={cx('home-check-result-left')}>
                        <div style={{ width: '50%' }}>
                            <p>
                                <FontAwesomeIcon icon={faDollarSign} className={cx('icon-normal')} />
                                Family Income: {task.feedbacks[0].rating.familyIncome}/5
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faHeart} className={cx('icon-normal')} />
                                Family Stability: {task.feedbacks[0].rating.familyStability}/5
                            </p>
                            <p style={{ marginBottom: 0 }}>
                                <FontAwesomeIcon icon={faPersonShelter} className={cx('icon-normal')} />
                                Living Space: {task.feedbacks[0].rating.livingSpace}/5
                            </p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p>
                                <FontAwesomeIcon icon={faPaw} className={cx('icon-normal')} />
                                Pet Experience: {task.feedbacks[0].rating.petExperience}/5
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faClock} className={cx('icon-normal')} />
                                Time Commitment: {task.feedbacks[0].rating.timeCommitment}/5
                            </p>
                            <p style={{ marginBottom: 0 }}>
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                <b>Average Rating: {task.feedbacks[0].rating.averageRating}/5</b>
                            </p>
                        </div>
                    </div>

                    <div className={cx('image-wrap')}>
                        {task.feedbacks[0].images.map((image, index) => (
                            <img
                                src={image}
                                key={index}
                                onClick={() => {
                                    setImgPopup(image);
                                    setOpenImgPopup(true);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {openImgPopup ? (
                <div className={cx('image-popup')}>
                    <p onClick={() => setOpenImgPopup(false)}>&times;</p>
                    <img src={imgPopup} />
                </div>
            ) : null}
        </>
    );
}

export default HomeCheckResult;
