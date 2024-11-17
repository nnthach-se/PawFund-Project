import Button from '~/components/Button';
import styles from './Update.module.scss';
import classNames from 'classnames/bind';
import api from '~/config/axios';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Update({ setUpdate, formData, setFormData, closeUpdate, id, handleTaskData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token');
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        try {
            const response = await api.put(
                `users/${id}`,
                { ...formData, roles: [formData.roles] },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

        setUpdate(false);
        handleTaskData();
        console.log(formData);
    };

    return (
        <div className={cx('update-content')}>
            <form className={cx('form-wrapper')} onSubmit={handleSubmit}>
                <div className={cx('form')}>
                    <div className={cx('input-detail')}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>

                    <div className={cx('input-detail')}>
                        <label htmlFor="firstname">First Name</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>

                    <div className={cx('input-detail')}>
                        <label htmlFor="lastname">Last Name</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>

                    <div className={cx('input-detail')}>
                        <label htmlFor="roles">Age</label>
                        <select id="roles" name="roles" value={formData.roles} onChange={handleChange}>
                            <option value="ADMIN">Admin</option>
                            <option value="VOLUNTEER">Volunteer</option>
                            <option value="USER">User</option>
                        </select>
                    </div>
                </div>

                <div className={cx('form-btn')}>
                    <Button type="submit" primary medium mgRight10>
                        Save
                    </Button>
                    <Button outline medium onClick={closeUpdate}>
                        Close
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Update;
