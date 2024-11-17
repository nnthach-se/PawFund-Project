import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IMAGES from '~/assets/images';
import api from '~/config/axios';
import './VolunteerApplication.scss';
import Button from '~/components/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';
import { toast, ToastContainer } from 'react-toastify';

const VolunteerApplication = ({ setStep }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        yob: '',
        gender: '',
        address: '',
        phone: '',
        adoptionExp: '',
        daysOfWeek: '',
        morning: '',
        afternoon: '',
        reason: '',
    });
    const [errors, setErrors] = useState({
        phone: '',
        yob: '',
    });
    const userID = localStorage.getItem('userId');
    const navigate = useNavigate();
    // console.log('userID: ', userID);
    useEffect(() => {
        const savedFormData = localStorage.getItem('applicationVolunteerFormData');
        if (savedFormData) {
            setFormData(JSON.parse(savedFormData));
        }
    }, []);

    // const handleChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let errorMessage = '';

        // Validate Phone and Year of Birth
        if (name === 'phone') {
            if (!/^\d{10}$/.test(value)) {
                errorMessage = 'Phone number is invalid.';
            }
        } else if (name === 'yob') {
            const year = parseInt(value, 10);
            const currentYear = new Date().getFullYear();
            if (isNaN(year) || year < 1900 || year > currentYear - 18) {
                errorMessage = `You have to be 18 years old or older to be a volunteer.`;
            }
        }

        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: errorMessage,
        });
    };
    console.log(formData);
    const handleNext = async (e) => {
        e.preventDefault();
        if (Object.values(errors).some((error) => error)) {
            toast.error('Please check your information again and make sure everything is correct.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token); // Kiểm tra giá trị token

            if (!token) {
                throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
            }

            // Chuyển đổi kiểu dữ liệu nếu cần
            const newFormData = {
                volunteer_appli_id: '', // Bạn có thể để rỗng nếu tạo mới
                id: userID,
                fullName: formData.fullName,
                yob: parseInt(formData.yob, 10),
                gender: formData.gender,
                address: formData.address,
                phone: formData.phone,
                adoptionExp: formData.adoptionExp,
                daysOfWeek: formData.daysOfWeek,
                morning: formData.morning,
                afternoon: formData.afternoon,
                reason: formData.reason,
            };
            console.log('Sending data:', newFormData);

            // Gửi dữ liệu biểu mẫu đến backend
            try {
                const response = await api.post(`volunteer/application`, newFormData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
            } catch (error) {
                console.log('Loi nhu cc: ', error);
                if (error.response) {
                    console.log('Data:', error.response.data);
                    console.log('Status:', error.response.status);
                    console.log('Headers:', error.response.headers);
                } else {
                    console.log('Error message:', error.message);
                }
            }
            navigate('/', { state: { message: `Submitted  successfully!` } });
            // Nếu yêu cầu thành công, chuyển sang bước tiếp theo
            // setStep((prevStep) => prevStep + 1);
        } catch (error) {
            console.error('Error submitting form:', error);
            if (error.response) {
                console.log('Error Data:', error.response.data);
            } else {
                console.log('Error Message:', error.message);
            }
        }
    };

    return (
        <div className="volunteerAppli">
            <ScrollToTop />
            {/* phan nhap thong tin nguoi dung */}
            <div className="infoInput_wrap">
                <div className="volunteerAppli_infoInput">
                    <div className="volunteerAppli_infoInput_header_wrap">
                        <div className="volunteerAppli_infoInput_header">
                            <h3>VOLUNTEER FORM</h3>
                        </div>
                    </div>
                    <form>
                        {/* khung to 1 */}
                        <div className="fullName_yob_gender_phone_address_wrap">
                            {/* fullName, yob */}
                            <div className="fullName_yob_wrap">
                                {/* Name  */}
                                <div className="volunteer_name">
                                    <label htmlFor="fullName">Full name</label>
                                    <input
                                        className="volunteer_input_bar"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {/* yob  */}
                                <div className="volunteer_yob">
                                    <div className="volunteer_yob_wrap">
                                        <label htmlFor="yob">Year of birth</label>
                                        <input
                                            className="volunteer_input_bar"
                                            type="date"
                                            id="yob"
                                            name="yob"
                                            value={formData.yob}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {errors.yob && <p className="error-text-3">{errors.yob}</p>}
                                </div>
                            </div>
                            {/* gender, phone */}
                            <div className="gender_phone_wrap">
                                {/* Gender  */}
                                <div className="volunteer_gender">
                                    <label htmlFor="gender">Gender</label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                {/* phone  */}
                                <div className="volunteer_phone">
                                    <div className="volunteer_phone_wrap">
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            className="volunteer_input_bar"
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {errors.phone && <p className="error-text-3">{errors.phone}</p>}
                                </div>
                            </div>
                            {/* address */}
                            <div className="volunteer_address">
                                <label htmlFor="address">Address</label>
                                <input
                                    className="volunteer_input_bar"
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        {/* khung to 2 */}
                        <div className="adoptionExp_morning_daysOfWeek_afternoon_reason_wrap">
                            {/* adoptionExp, morning */}
                            <div className="adoptionExp_morning_wrap">
                                {/* adoption exp */}
                                <div className="volunteer_adoptExp">
                                    <label htmlFor="adoptionExp">Adopt Experience</label>
                                    <input
                                        className="volunteer_input_bar"
                                        id="adoptionExp"
                                        name="adoptionExp"
                                        value={formData.adoptionExp}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {/* morning */}
                                <div className="volunteer_morning">
                                    <label htmlFor="morning">Your morning work time</label>
                                    <input
                                        className="volunteer_input_bar"
                                        id="morning"
                                        name="morning"
                                        value={formData.morning}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            {/* daysOfWeek, afternoon */}
                            <div className="daysOfWeek_afternoon_wrap">
                                {/* daysOfWeek */}
                                <div className="volunteer_daysOfWeek">
                                    <label htmlFor="daysOfWeek">Days you can work</label>
                                    <input
                                        className="volunteer_input_bar"
                                        id="daysOfWeek"
                                        name="daysOfWeek"
                                        value={formData.daysOfWeek}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {/* afternoon */}
                                <div className="volunteer_afternoon">
                                    <label htmlFor="afternoon">Your afternoon work time</label>
                                    <input
                                        className="volunteer_input_bar"
                                        id="afternoon"
                                        name="afternoon"
                                        value={formData.afternoon}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            {/* reason */}
                            <div className="volunteer_reason">
                                <label htmlFor="reason">Reason you apply</label>
                                <input
                                    className="volunteer_input_bar"
                                    type="text"
                                    id="reason"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                    <div className="volunteer_button">
                        <Button className="btn-1" to="/" onClick={handleNext}>
                            Submit
                        </Button>
                        {/* <Button className="btn-2" onClick={() => setStep((prevStep) => prevStep - 1)}>
                            Cancel
                        </Button> */}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default VolunteerApplication;
