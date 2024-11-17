import Button from '~/components/Button';
import styles from './AddIssue.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import api from '~/config/axios';
import Select from 'react-select';
import React from 'react';

const cx = classNames.bind(styles);

function AddIssue({tagIssueData, taskID, setOpenCreateIssue }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'NOT_STARTED',
        priority: 'High Priority',
        tags: [],
        dueDate: '',
        reporter: {},
    });

    useEffect(() => {
        console.log('Issue tag Data: ', tagIssueData);
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

        const formattedDueDate = formData.dueDate;

        const dataToSend = {
            ...formData,
            dueDate: formattedDueDate,
        };

        console.log(dataToSend);

        try {
            const response = await api.post(`issues/tasks/${taskID}`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('create issue: ', response.data);
            setOpenCreateIssue(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <form className={cx('form-wrapper')} onSubmit={handleSubmit}>
                    <div className={cx('form-input')}>
                        <div className={cx('input-detail')}>
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                        </div>

                        <div className={cx('input-detail')}>
                            <label htmlFor="dueDate">Date</label>
                            <input
                                type="date"
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
                            <label htmlFor="priority">Priority</label>
                            <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
                                <option value="High Priority">High Priority</option>
                                <option value="Medium Priority">Medium Priority</option>
                                <option value="Low Priority">Low Priority</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>

                        <div className={cx('input-detail')}>
                            <label htmlFor="tags">Tags</label>
                            <Select
                                id="tags"
                                name="tags"
                                isMulti
                                options={tagIssueData.map((tag) => ({
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
                            Create
                        </Button>
                        <Button outline medium onClick={() => setOpenCreateIssue(false)}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddIssue;
