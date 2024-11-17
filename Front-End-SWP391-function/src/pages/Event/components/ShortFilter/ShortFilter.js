import Button from '~/components/Button';
import styles from './ShortFilter.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ShortFilter({ filter, handleFinish, handleFilterChange, searchName, handleSearchChange }) {
    const clearSearch = () => {
        handleSearchChange({ target: { value: '' } });
    };
    return (
        <form onSubmit={handleFinish} className={cx('short-form')}>
            <div className={cx('sort')}>
                <label htmlFor="sort">Sort</label>
                <select id="sort" name="sort" value={filter.sort} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="sortByDate">Date</option>
                    <option value="sortByName">Name</option>
                </select>
            </div>
            <div className={cx('type')}>
                <label htmlFor="type">Type</label>
                <select id="type" name="type" value={filter.type} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="food">Foods</option>
                    <option value="health">Health</option>
                </select>
            </div>
            <div className={cx('search-name')}>
                <label htmlFor="searchName">Search by title</label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        id="searchName"
                        placeholder="Enter title"
                        value={searchName}
                        onChange={handleSearchChange}
                    />

                    {searchName && (
                        <span
                            onClick={clearSearch}
                            style={{
                                position: 'absolute',
                                top: '3px',
                                right: '20px', // Điều chỉnh vị trí
                                cursor: 'pointer',
                                color: '#aaa', // Màu sắc cho dấu "x"
                            }}
                        >
                            &times; {/* Dấu "x" */}
                        </span>
                    )}
                </div>

                <Button primary small type="submit">
                    Search
                </Button>
            </div>
        </form>
    );
}

export default ShortFilter;
