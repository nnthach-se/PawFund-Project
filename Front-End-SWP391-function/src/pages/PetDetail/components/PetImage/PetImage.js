import { useState } from 'react';
import styles from './PetImage.module.scss';
import classNames from 'classnames/bind';
import PetImages from '~/assets/images/petImg';
const cx = classNames.bind(styles);

function PetImage({ pet }) {
    const [index, setIndex] = useState(0);
    const petImg = pet.petImage ? pet.petImage.split(', ').map((img) => img.trim()) : [];

    const totalImages = petImg.length;
    const petsToShow = totalImages > 0 ? petImg : [];

    const nextSlide = () => {
        setIndex((prevIndex) => (prevIndex + 1) % totalImages);
    };

    const preSlide = () => {
        setIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    };
    return (
        <div className={cx('pet-image')}>
            <button onClick={preSlide} className={cx('slideBtn', 'pre-btn')}>
                &lt;
            </button>
            <div className={cx('image')}>
                <div className={cx('wrap-img')}>
                    <img src={petImg[index]} />
                </div>

                <div className={cx('sub-img')}>
                    {petsToShow.map((image, imgIndex) => (
                        <img
                            key={imgIndex}
                            src={image}
                            className={cx({ 'color-border': imgIndex === index })}
                            onClick={() => setIndex(imgIndex)}
                        />
                    ))}
                </div>
            </div>
            <button onClick={nextSlide} className={cx('slideBtn', 'next-btn')}>
                &gt;
            </button>
        </div>
    );
}

export default PetImage;
