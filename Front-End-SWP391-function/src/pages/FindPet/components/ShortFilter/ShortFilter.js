import Button from '~/components/Button';
import styles from './ShortFilter.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ShortFilter({ filter, handleFinish, handleFilterChange, searchName, handleSearchChange, setCurrentPage }) {
    const clearSearch = () => {
        handleSearchChange({ target: { value: '' } });
    };
    return (
        <form onSubmit={handleFinish} className={cx('short-form')}>
            <div className={cx('sort')}>
                <label htmlFor="sort">Sort</label>
                <select id="sort" name="sort" value={filter.sort} onChange={handleFilterChange}>
                    <option value="sortByDate">All</option>
                    <option value="sortByWeight">Weight</option>
                    <option value="sortByAge">Age</option>
                    <option value="sortByName">Name</option>
                </select>
            </div>
            <div className={cx('search-name')}>
                <label htmlFor="searchName">Search by name</label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        id="searchName"
                        placeholder="Enter pet's name"
                        value={searchName}
                        onChange={handleSearchChange}
                    />

                    {searchName && (
                        <span
                            onClick={clearSearch}
                            style={{
                                position: 'absolute',
                                top: '3px',
                                right: '20px',
                                cursor: 'pointer',
                                color: '#aaa',
                            }}
                        >
                            &times;
                        </span>
                    )}
                </div>

                <Button primary small type="submit" onClick={() => setCurrentPage(1)}>
                    Search
                </Button>
            </div>
        </form>
    );
}

export default ShortFilter;
