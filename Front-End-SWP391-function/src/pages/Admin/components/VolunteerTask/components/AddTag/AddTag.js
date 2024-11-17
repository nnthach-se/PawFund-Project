import Button from '~/components/Button';
import styles from './AddTag.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import api from '~/config/axios';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function AddTag({ setAddAll }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: 'task_label',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await api.post('tags', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            toast.success('Create tag successfully');
            setAddAll('');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <h1>Create New Tag</h1>

            <div className={cx('content')}>
                <form className={cx('form-wrapper')} onSubmit={handleSubmit}>
                    <div className={cx('form-input')}>
                        <div className={cx('input-detail')}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>

                        <div className={cx('input-detail')}>
                            <label htmlFor="type">Type</label>
                            <select id="type" name="type" value={formData.type} onChange={handleChange}>
                                <option value="task_label">Task Label</option>
                                <option value="issue_label">Issue Label</option>
                                <option value="post_label">Post Label</option>
                            </select>
                        </div>

                        <div className={cx('input-detail')}>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>

                    <div className={cx('form-btn')}>
                        <Button type="submit" primary medium mgRight10>
                            Add
                        </Button>
                        <Button outline medium onClick={() => setAddAll('')}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddTag;
