import React, { useEffect, useState } from 'react';
import './TimelineProgress.scss';

const TimelineProgress = () => {
    const [scrollHeight, setScrollHeight] = useState(0);

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollTotal) * 100;
        setScrollHeight(progress);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    console.log(scrollHeight);

    return (
        <div className="timeline-container">
            <div className="progress-bar" style={{ height: `${scrollHeight}%` }}></div>
        </div>
    );
};

export default TimelineProgress;
