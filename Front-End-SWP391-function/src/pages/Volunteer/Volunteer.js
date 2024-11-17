import React, { useState } from 'react';
import VolunteerIntroduce from './VolunteerComponents/VolunteerIntroduce';
import VolunteerApplication from './VolunteerComponents/VolunteerApplication';

const Volunteer = () => {
    const [step, setStep] = useState(0);
    const handleNext = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const render = () => {
        switch (step) {
            case 0:
                return <VolunteerIntroduce onButtonClick={handleNext} />;
            case 1:
                return <VolunteerApplication setStep={setStep} />;
            default:
                return null;
        }
    };
    return render();
};

export default Volunteer;
