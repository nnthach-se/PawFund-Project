import Button from '~/components/Button';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Search({ setSearchName, handleFinish, filter, handleFilterChange, searchName }) {
    const handleSearchChange = (e) => {
        setSearchName(e.target.value.trim());
    };
    const clearSearch = () => {
        handleSearchChange({ target: { value: '' } });
    };

    return (
        <div className={cx('search')}>
            <form onSubmit={handleFinish}>
                <label htmlFor="sortBy">Sort by</label>
                <select id="sortBy" name="sortBy" value={filter.sortBy} onChange={handleFilterChange}>
                    <option value="createdAt">Create Date</option>
                    <option value="username">Username</option>
                    <option value="applicationQuantity">Number of Application</option>
                </select>

                <div style={{ position: 'relative' }}>
                    <input type="text" placeholder="Search by name" value={searchName} onChange={handleSearchChange} />

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
                <Button primary small type="submit">
                    Search
                </Button>
            </form>
        </div>
    );
}

export default Search;
