import React, { useEffect, useRef, useState } from 'react';
import Button from '~/components/Button';
import IMAGES from '~/assets/images';
import './IntroducePage.scss';
import { ProgressBar } from 'react-bootstrap';
import TimelineProgress from '../TimelineProgress/TimelineProgress';
import { Link } from 'react-router-dom';

const IntroducePage = ({ onButtonClick }) => {
    const targetRef_1 = useRef(null);
    const targetRef_2 = useRef(null);
    const targetRef_3 = useRef(null);
    const targetRef_4 = useRef(null);
    const targetRef_5 = useRef(null);
    const targetRef_6 = useRef(null);

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
    // console.log(scrollHeight);

    // Hàm xử lý cuộn
    const scrollToSection = (targetRef, offset) => {
        const elementPosition = targetRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    };
    return (
        <div className="adoptIntro">
            <TimelineProgress />
            <div className="timelineBar_step">
                <div>
                    <Button
                        className={`timelineBar_step_btn1 ${scrollHeight >= 11.06931219024776 ? 'selected' : ''}`}
                        onClick={() => scrollToSection(targetRef_1, 100)}
                    >
                        1
                    </Button>
                </div>
                <div>
                    <Button
                        className={`timelineBar_step_btn2 ${scrollHeight >= 23.43725780948048 ? 'selected' : ''}`}
                        onClick={() => scrollToSection(targetRef_2, 100)}
                    >
                        2
                    </Button>
                </div>
                <div>
                    <Button
                        className={`timelineBar_step_btn3 ${scrollHeight >= 33.92578065395355 ? 'selected' : ''}`}
                        onClick={() => scrollToSection(targetRef_3, 100)}
                    >
                        3
                    </Button>
                </div>
                <div>
                    <Button
                        className={`timelineBar_step_btn4 ${scrollHeight >= 45.64453065395355 ? 'selected' : ''}`}
                        onClick={() => scrollToSection(targetRef_4, 100)}
                    >
                        4
                    </Button>
                </div>
                <div>
                    <Button
                        className={`timelineBar_step_btn5 ${scrollHeight >= 57.36328363418579 ? 'selected' : ''}`}
                        onClick={() => scrollToSection(targetRef_5, 100)}
                    >
                        5
                    </Button>
                </div>
                <div>
                    <Button
                        className={`timelineBar_step_btn6 ${scrollHeight >= 72.08203363418579 ? 'selected' : ''}`}
                        onClick={() => scrollToSection(targetRef_6, 100)}
                    >
                        6
                    </Button>
                </div>
            </div>
            <div className="timelineBar_step_btn7">
                <Button adoptIntroduceButton onClick={onButtonClick}>
                    Start The Process
                </Button>
            </div>

            <div className="adopt-container">
                {/* Header cua container */}
                <div className="adopt-container-header">
                    <h3>How It Works For Adopters</h3>
                    <p>
                        For most people, rehoming a pet is a really difficult but necessary decision. We know you want
                        the best for them so we’re here to help. To make the rehoming process as straightforward and
                        safe as possible, here’s a guide to how it works.
                    </p>
                </div>
                {/* Doan 1 */}
                <div ref={targetRef_1} className="adopt-container-firstPara">
                    <img className="adopt-container-firstPara-image" alt="image" src={IMAGES.adopt_introduce_1} />
                    <div className="adopt-container-firstPara-content">
                        <h3>1. Research and Preparation</h3>
                        <p>
                            Ready to welcome a furry friend into your home? Creating an adoption application is the
                            first step. Simply:
                        </p>
                        <ul class="adopt-container-firstPara-content-list">
                            <li>
                                Assess your lifestyle, living space, and personal preferences to determine whether you
                                want a dog, cat, or another type of pet
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Doan 2 */}
                <div ref={targetRef_2} className="adopt-container-secondPara">
                    <div className="adopt-container-secondPara-content">
                        <h3>2. Application</h3>
                        <ul class="adopt-container-secondPara-content-list">
                            <li class="custom-bullet">Submit an application:</li>
                            <ul>
                                <li>It could be your living situation</li>
                                <li>Experience with pets</li>
                                <li>Why you want to adopt</li>
                            </ul>
                            <li>Application review:</li>
                            <li>
                                The shelter will review your application to ensure that the pet is a good match for your
                                household and that you can meet the pet’s needs.
                            </li>
                        </ul>
                    </div>
                    <img className="adopt-container-secondPara-image" alt="image" src={IMAGES.adopt_introduce_2} />
                </div>
                {/* Doan 3 */}
                <div ref={targetRef_3} className="adopt-container-thirdPara">
                    <img className="adopt-container-thirdPara-image" alt="image" src={IMAGES.adopt_introduce_3} />
                    <div className="adopt-container-thirdPara-content">
                        <h3>3. Meet and Greet</h3>
                        <ul class="adopt-container-thirdPara-content-list">
                            <li>
                                Meet the Pet : Once your application is approved, you will have the opportunity to meet
                                the pet
                            </li>
                            <li>
                                Interaction with Other Pets:If you have existing pets, a meeting may be necessary to see
                                how they interact with the potential new pet to ensure compatibility.
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Doan 4 */}
                <div ref={targetRef_4} className="adopt-container-fourthPara">
                    <div className="adopt-container-fourthPara-content">
                        <h3>4. Home Visit</h3>
                        <ul class="adopt-container-fourthPara-content-list">
                            <li>
                                Some shelters or rescue groups may conduct a home visit to ensure the environment is
                                safe and suitable for the pet, especially for certain breeds or species with special
                                needs.
                            </li>
                        </ul>
                    </div>
                    <img className="adopt-container-fourthPara-image" alt="image" src={IMAGES.adopt_introduce_4} />
                </div>
                {/* Doan 5 */}
                <div ref={targetRef_5} className="adopt-container-fifthPara">
                    <img className="adopt-container-fifthPara-image" alt="image" src={IMAGES.adopt_introduce_5} />
                    <div className="adopt-container-fifthPara-content">
                        <h3>5. Finalizing the Adoption</h3>
                        <ul class="adopt-container-fifthPara-content-list">
                            <li>
                                Sign adoption papers: You'll sign a contract committing to the care of the pet. It
                                usually includes terms such as returning the pet to the organization if things don’t
                                work out.
                            </li>
                            <li>
                                Take the pet home: After completing the paperwork and paying any necessary fees, you can
                                bring your new pet home.
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Doan 6 */}
                <div ref={targetRef_6} className="adopt-container-sixthPara">
                    <div className="adopt-container-sixthPara-content">
                        <h3>6. Post-Adoption Support</h3>
                        <ul class="adopt-container-sixthPara-content-list">
                            <li>
                                Adjusting the Pet to Your Home: Allow your pet time to adjust to the new environment. Be
                                patient, as they may need time to settle in and feel comfortable.
                            </li>
                            <li>
                                Follow-Up Visits: Some shelters may conduct follow-up calls or visits to check on the
                                pet’s well-being and ensure that the adoption is successful.
                            </li>
                        </ul>
                    </div>
                    <img className="adopt-container-sixthPara-image" alt="image" src={IMAGES.adopt_introduce_6} />
                </div>
                {/* Nút start process để chuyển qua find a pet */}
                <div className="adopt-container-button">
                    <Button
                        adoptIntroduceButton
                        // onClick={() => setStep((prevStep) => prevStep + 1)}
                        onClick={onButtonClick}
                    >
                        Start The Process
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default IntroducePage;
