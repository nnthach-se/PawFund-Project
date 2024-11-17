import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);

        const handleBeforeUnload = () => {
            window.scrollTo(0, 0);
        };

        // window.addEventListener('beforeunload', handleBeforeUnload);

        // return () => {
        //     window.removeEventListener('beforeunload', handleBeforeUnload);
        // };
    }, [pathname]);

    return null;
};

export default ScrollToTop;
