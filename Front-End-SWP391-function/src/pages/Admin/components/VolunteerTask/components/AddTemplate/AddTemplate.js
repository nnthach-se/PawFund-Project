import Button from '~/components/Button';
import styles from './AddTemplate.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import api from '~/config/axios';

const cx = classNames.bind(styles);

function AddTemplate({ setAddAll }) {
    const [formData, setFormData] = useState({
        name: 'Adoption',
        items: [{ entry: '' }, { entry: '' }, { entry: '' }, { entry: '' }, { entry: '' }],
    });

    const handleChange = (e, index) => {
        const { name, value } = e.target;

        if (name === 'name') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else {
            const updatedItems = [...formData.items];
            updatedItems[index].entry = value;
            setFormData((prevData) => ({
                ...prevData,
                items: updatedItems,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        console.log(formData);

        try {
            const response = await api.post('templates', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);

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
                            <select id="name" name="name" onChange={handleChange} value={formData.name}>
                                <option value="Adoption">Adoption</option>
                                <option value="Event">Event</option>
                            </select>
                        </div>
                        {/* <div className={cx('input-detail')}>
                            <label htmlFor="entry">Entry 1</label>
                            <input type="text" id="entry" name="entry" />
                        </div>
                        <div className={cx('input-detail')}>
                            <label htmlFor="entry">Entry 2</label>
                            <input type="text" id="entry" name="entry" />
                        </div>
                        <div className={cx('input-detail')}>
                            <label htmlFor="entry">Entry 3</label>
                            <input type="text" id="entry" name="entry" />
                        </div>
                        <div className={cx('input-detail')}>
                            <label htmlFor="entry">Entry 4</label>
                            <input type="text" id="entry" name="entry" />
                        </div>
                        <div className={cx('input-detail')}>
                            <label htmlFor="entry">Entry 5</label>
                            <input type="text" id="entry" name="entry" />
                        </div> */}
                        {formData.items.map((item, index) => (
                            <div className={cx('input-detail')} key={index}>
                                <label htmlFor={`entry${index + 1}`}>Entry {index + 1}</label>
                                <input
                                    type="text"
                                    id={`entry${index + 1}`}
                                    name={`entry${index + 1}`}
                                    onChange={(e) => handleChange(e, index)}
                                    value={item.entry}
                                />
                            </div>
                        ))}
                    </div>

                    <div className={cx('form-btn')}>
                        <Button type="submit" primary medium mgRight10>
                            Create
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

export default AddTemplate;
