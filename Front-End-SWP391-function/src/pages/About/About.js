import React from 'react';
import './About.scss';
import IMAGES from '~/assets/images';
import Button from '~/components/Button';

export const AboutUs = () => {
    return (
        <div className="about-us">
            <div className="div">
                <img className="header" alt="Header" src={IMAGES.aboutUs1} />
                <div className="overlap-group">
                    <div className="text-wrapper">About Us</div>
                </div>
                <p className="p">
                    We are on a mission to support and empower people to find new homes for their pets responsibly
                </p>
                <img className="image" alt="Image" src={IMAGES.aboutUs2} />
                <img className="img" alt="Image" src={IMAGES.aboutUs3} />
                <p className="what-we-do-our">
                    <span className="span">
                        <br />
                    </span>
                    <p className="text-wrapper-2">What we do</p>
                    <span className="text-wrapper-4">
                        Our platform connects potential adopters with people looking for new homes for their pets,
                        initially starting with the most popular pets in the UK; dogs, cats and rabbits. This makes it
                        easier for good people to adopt the right pet while maximising the chances of the pet finding
                        their forever home.
                        <br />
                    </span>
                    <span className="text-wrapper-5">
                        <br />
                    </span>
                    <span className="text-wrapper-4">
                        We provide a non-judgemental service for people looking for a new home and give them full
                        control over the process. We are also helping to reduce the number of animals going into
                        shelters. This frees up space and resources for abandoned pets who need immediate help or
                        specialist care.
                    </span>
                </p>
                <p className="we-don-t-know-how">
                    We don’t know how many more dogs and cats will be abandoned during these months because their owners
                    can’t keep them.
                    <br />
                    <br />
                    But we do know that shelters are telling us they’re struggling for space and money to care for them.
                    If shelters are full, what happens to the pets who need the most help?
                    <br />
                    <br />
                    At Furry Friends Haven, we decided it doesn’t have to be this way. Not in our 21st century,
                    web-connected world. So we created Furry Friends Haven, an online community where people who can’t
                    keep their pets connect directly with people who want to adopt them.
                    <br />
                    <br />
                    Together, we’ll keep dogs and cats out of shelters and shelters, so they can love and be loved in
                    new homes.
                    <br />
                    Save lives. Ease the burden on shelters.
                    <br />
                    <br />
                    Creating a place where we can make a positive impact. Ending pet homelessness and allowing pets to
                    find responsible new homes. That's our mission. That's what we want you to know about us.
                </p>
                <p className="text-wrapper-6">
                    Furry Friends Haven: A Place Where Hearts Connect and Animal Rescue Take Place
                </p>
                <img className="image-2" alt="Image" src={IMAGES.aboutUs4} />
                <div className="register-banner">
                    <p className="text-wrapper-7">Create Your Future Pet Family!</p>
                    <p className="text-wrapper-8">
                        Join a community of pet lovers committed to finding forever homes. Connect, share, and make a
                        difference today!
                    </p>
                    <Button className="register-button" outline large to="/register">
                        Register
                    </Button>
                </div>
                <p className="who-we-are-and-why">
                    <span className="text-wrapper-11">
                        Who we are and why we created Furry Friends Heaven
                        <br />
                    </span>
                    <span className="text-wrapper-12">
                        <br />
                        Furry Friends Haven was founded by a group of animal lovers who are committed to ending pet
                        homelessness and irresponsible rehoming practices. We are part of a registered charity in
                        Vietnam, so you can rest assured that we always prioritize pet welfare over profit.
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
