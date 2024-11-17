
import Button from '~/components/Button';
import styles from './Update.module.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);
function Update({handleSubmit, formData, handleChange, closeUpdate}) {
    return (
        <div className={cx('update-content')}>
            <form className={cx('form-wrapper')} onSubmit={handleSubmit}>
                <div className={cx('form')}>
                    <div className={cx('form-input')}>
                        <div className={cx('input-detail')}>
                            <label htmlFor="petName">Name</label>
                            <input
                                type="text"
                                id="petName"
                                name="petName"
                                value={formData.petName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={cx('input-detail')}>
                            <label htmlFor="petBreed">Breed</label>
                            <input
                                type="text"
                                id="petBreed"
                                name="petBreed"
                                value={formData.petBreed}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={cx('input-detail')}>
                            <label htmlFor="petAge">Age</label>
                            <select id="petAge" name="petAge" value={formData.petAge} onChange={handleChange}>
                                <option value="young">Young</option>
                                <option value="grown">Full Grown</option>
                                <option value="old">Old</option>
                            </select>
                        </div>

                        <div className={cx('input-detail')}>
                            <label htmlFor="petGender">Gender</label>
                            <select id="petGender" name="petGender" value={formData.petGender} onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className={cx('form-input')}>
                        <div className={cx('input-detail')}>
                            <label htmlFor="petColor">Colour</label>
                            <select id="petColor" name="petColor" value={formData.petColor} onChange={handleChange}>
                                <option value="black">Black</option>
                                <option value="yellow">Yellow</option>
                                <option value="yellow">White</option>
                            </select>
                        </div>

                        <div className={cx('input-detail')}>
                            <label htmlFor="petSize">Size</label>
                            <input
                                type="number"
                                id="petSize"
                                name="petSize"
                                value={formData.petSize}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={cx('input-detail')}>
                            <label htmlFor="petWeight">Weight</label>
                            <input
                                id="petWeight"
                                type="number"
                                name="petWeight"
                                value={formData.petWeight}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={cx('input-detail')}>
                            <label htmlFor="petVaccin">Vaccine</label>
                            <select id="petVaccin" name="petVaccin" value={formData.petVaccin} onChange={handleChange}>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className={cx('form-des')}>
                    <div className={cx('input-description')}>
                        <label htmlFor="petDescription">Description</label>
                        <textarea
                            id="petDescription"
                            value={formData.petDescription}
                            name="petDescription"
                            onChange={handleChange}
                        ></textarea>
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
