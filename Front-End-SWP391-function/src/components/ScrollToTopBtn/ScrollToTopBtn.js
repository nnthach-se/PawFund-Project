import React, { useEffect, useState } from 'react';
import styles from './ScrollBtn.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button';

const cx = classNames.bind(styles);

const ScrollToTopBtn = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        if (window.scrollY > 20) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return () => window.removeEventListener('scroll', toggleVisible);
    }, []);

    return (
        <>
            {visible ? (
                <Button className={cx('btn')} onClick={scrollToTop}>
                    Top
                </Button>
            ) : null}
        </>
    );
};

export default ScrollToTopBtn;
