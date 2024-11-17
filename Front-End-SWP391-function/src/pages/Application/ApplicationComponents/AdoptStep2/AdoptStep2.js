import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IMAGES from '~/assets/images';
import api from '~/config/axios';
import './AdoptStep2.scss';
import Button from '~/components/Button';
import Form from 'react-bootstrap/Form';
import AdoptStep2Form from './AdoptStep2Components/AdoptStep2Form';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';

const AdoptStep2 = ({ id, setStep }) => {
    return <AdoptStep2Form id={id} setStep={setStep} />;
};

export default AdoptStep2;
