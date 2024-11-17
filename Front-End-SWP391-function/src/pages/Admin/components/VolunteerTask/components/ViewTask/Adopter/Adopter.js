import styles from './Adopter.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Adopter() {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>
                <b>Adopter</b>
            </p>

            <div className={cx('adopter-info')}>
                <div>
                    alo alo
                </div>
            </div>
        </div>
    );
}

export default Adopter;
