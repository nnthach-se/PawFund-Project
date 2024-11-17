import Button from '~/components/Button';
import styles from './FilterMenu.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function FilterMenu({ filter, handleFinish, handleFilterChange, setCurrentPage }) {
    
    const handleReset = (e) => {
        e.preventDefault();
        handleFilterChange({ target: { name: 'type', value: 'all' } });
        handleFilterChange({ target: { name: 'gender', value: 'all' } });
        handleFilterChange({ target: { name: 'age', value: 'all' } });
        handleFilterChange({ target: { name: 'color', value: 'all' } });
        handleFilterChange({ target: { name: 'state', value: 'available' } });
        handleFilterChange({ target: { name: 'vaccine', value: 'all' } });
    };
    return (
        <div className={cx('filter-menu')}>
            <form className={cx('form')} onSubmit={handleFinish}>
                <label htmlFor="type">Select pet type</label>
                <select id="type" name="type" value={filter.type} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                </select>

                <label htmlFor="gender">Gender</label>
                <select id="gender" name="gender" value={filter.gender} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <label htmlFor="age">Age</label>
                <select id="age" name="age" value={filter.age} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="young">Young</option>
                    <option value="full grown">Full Grown</option>
                    <option value="old">Old</option>
                </select>

                <label htmlFor="color">Colour</label>
                <select id="color" name="color" value={filter.color} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="black">Black</option>
                    <option value="yellow">Yellow</option>
                </select>

                <label htmlFor="state">State</label>
                <select id="state" name="state" value={filter.state} onChange={handleFilterChange}>
                    <option value="available">Available</option>
                    <option value="adopted">Adopted</option>
                </select>

                <label htmlFor="vaccine">Vaccine</label>
                <select id="vaccine" name="vaccine" value={filter.vaccine} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>

                <div className={cx('button-all')}>
                    <Button primary small className={cx('submit-btn')} type="submit" onClick={() => setCurrentPage(1)}>
                        Search
                    </Button>
                    <Button outline small className={cx('submit-btn')} onClick={handleReset}>
                        Clear
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default FilterMenu;
