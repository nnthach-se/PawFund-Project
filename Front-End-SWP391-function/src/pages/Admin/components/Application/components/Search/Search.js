import Button from '~/components/Button';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('search')}>
            <form>
                <label htmlFor="sort">Sort by</label>
                <select id="sort" name="sort">
                    <option value="all">All</option>
                    <option value="sortByPetName">Pet's Name</option>
                    <option value="sortByCreateDate">Create Date</option>
                    <option value="sortByUpdateDate">Approval Date</option>
                </select>

                <input type="text" placeholder="Search by name" />
                <Button primary small type="submit">
                    Search
                </Button>
            </form>
        </div>
    );
}

export default Search;
