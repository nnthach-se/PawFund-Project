import Button from '~/components/Button';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Search({ filter, handleFilterChange, searchName, setSearchName, handleFinish }) {
    const handleSearchChange = (e) => {
        setSearchName(e.target.value.trim());
    };
    const clearSearch = () => {
        handleSearchChange({ target: { value: '' } });
    };

    return (
        <div className={cx('search')}>
            <form onSubmit={handleFinish}>
                <label htmlFor="sort">Sort by</label>
                <select id="sort" name="sort" value={filter.sort} onChange={handleFilterChange}>
                    <option value="sortByDate">All</option>
                    <option value="sortByName">Name</option>
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
