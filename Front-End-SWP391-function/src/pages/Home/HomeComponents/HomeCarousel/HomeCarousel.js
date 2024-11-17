import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { CarouselItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomeCarousel.scss';
import IMAGES from '~/assets/images';

const HomeCarousel = () => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    return (
        <div className="carousel">
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img src={IMAGES.banner} alt="Slide_1" />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={IMAGES.slide_1} alt="Slide_2" />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={IMAGES.slide_2} alt="Slide_3" />
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default HomeCarousel;
