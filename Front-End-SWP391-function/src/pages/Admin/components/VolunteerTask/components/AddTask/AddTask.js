import Button from '~/components/Button';
import styles from './AddTask.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import api from '~/config/axios';
import Select from 'react-select';

const cx = classNames.bind(styles);

function AddTask({ tagTaskData, setAddAll }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'NOT_STARTED',
        category: 'Adoption',
        tags: [],
        dueDate: '',
        owner: {},
        team: [],
    });
    useEffect(() => {
        console.log('Task tag Data: ', tagTaskData);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTagChange = (selectedOptions) => {
        const selectedTags = selectedOptions ? selectedOptions.map((option) => ({ name: option.value })) : [];

        console.log('Selected Tags:', selectedTags);

        setFormData({
            ...formData,
            tags: selectedTags,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const dueDateParts = formData.dueDate.split('T');
        const formattedDueDate = `${dueDateParts[0]} ${dueDateParts[1].substring(0, 5)}`;

        const dataToSend = {
            ...formData,
            dueDate: formattedDueDate,
        };

        console.log(dataToSend);

        try {
            const response = await api.post('tasks', dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Response:', response.data);
            setAddAll('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h1>Create New Task</h1>
            <div className={cx('content')}>
                <form className={cx('form-wrapper')} onSubmit={handleSubmit}>
                    <div className={cx('form-input')}>
                        <div className={cx('input-detail')}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>

                        <div className={cx('input-detail')}>
                            <label htmlFor="dueDate">Date & Time</label>
                            <input
                                type="datetime-local"
                                id="dueDate"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={cx('input-detail')}>
                            <label htmlFor="status">Status</label>
                            <select id="status" name="status" value={formData.status} onChange={handleChange}>
                                <option value="NOT_STARTED">NOT_STARTED</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="DONE">DONE</option>
                                <option value="URGENT">URGENT</option>
                                <option value="ON_HOLD">ON_HOLD</option>
                                <option value="OVERDUE">OVERDUE</option>
                                <option value="CANCELLED">CANCELLED</option>
                            </select>
                        </div>
                        <div className={cx('input-detail')}>
                            <label htmlFor="category">Category</label>
                            <select id="category" name="category" value={formData.category} onChange={handleChange}>
                                <option value="Adoption">Adoption</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="DONE">DONE</option>
                            </select>
                        </div>

                        <div className={cx('input-detail')}>
                            <label htmlFor="tags">Tags</label>
                            <Select
                                id="tags"
                                name="tags"
                                isMulti
                                options={tagTaskData.map((tag) => ({
                                    value: tag.name,
                                    label: tag.name,
                                }))}
                                value={formData.tags.map((tag) => ({
                                    value: tag.name,
                                    label: tag.name,
                                }))}
                                onChange={handleTagChange}
                            />
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
        </div>
    );
}

export default AddTask;
