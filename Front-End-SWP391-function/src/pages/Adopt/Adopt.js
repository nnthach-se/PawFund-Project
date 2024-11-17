import React from 'react';
import IntroducePage from '../Application/ApplicationComponents/IntroducePage/IntroducePage';
import { useNavigate } from 'react-router-dom';

const Adopt = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/find-a-pet'); // Navigates to FindAPetPage
    };
    console.log(handleNext);

    return <IntroducePage onButtonClick={handleNext} />;
};

export default Adopt;
