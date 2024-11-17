import IMAGES from '~/assets/images';
import styles from './FindPet.module.scss';
import classNames from 'classnames/bind';
import FeaturePet from './components/FeaturePet';
import RegisBanner from '~/components/Layout/components/RegisterBanner';
import { createContext, useEffect, useState } from 'react';
import api from '~/config/axios';
import PetList from './components/PetList';
import ShortFilter from './components/ShortFilter';
import FilterMenu from './components/FilterMenu/FilterMenu';

const cx = classNames.bind(styles);

function FindPet() {
    const [currentPage, setCurrentPage] = useState(1);
    const [petList, setPetList] = useState([]);
    const [dataLength, setDataLength] = useState(0);
    const [user, setUser] = useState();
    const [searchName, setSearchName] = useState('');
    const [filter, setFilter] = useState({
        type: 'all',
        gender: 'all',
        age: 'all',
        color: 'all',
        state: 'available',
        vaccine: 'all',
        sort: 'sortByDate',
    });

    const handlePetsData = async () => {
        const { type, gender, age, color, vaccine, sort, state } = filter;
        const query = `petType=${type}&petAge=${age}&petGender=${gender}&petColor=${color}&petVaccin=${vaccine}&petStatus=${state}&keyword=${searchName}&sort=${sort}`;
        console.log(`Query: ${query}`);

        try {
            const response = await api.get(`pets/SearchPets?${query}`, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            const dataLength = response.data.length;
            setDataLength(dataLength);
            setPetList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFinish = async (e) => {
        if (e) e.preventDefault();
        await handlePetsData();

        // const searchParams = {
        //     searchName,
        //     filter,
        // };
    };

    useEffect(() => {
        handlePetsData();

        const loggedUser = JSON.parse(localStorage.getItem('userInfo'));
        if (loggedUser) {
            setUser(loggedUser);
        }
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFilter((pre) => ({ ...pre, [name]: value }));
    };

    const handleSearchChange = (e) => {
        setSearchName(e.target.value.trim());
    };
    console.log(petList);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <img src={IMAGES.findPetBanner} alt="banner" />
            </div>

            <div className={cx('content')}>
                <h1>Find Your Pets</h1>

                <div className={cx('main-content')}>
                    <div className={cx('short-filter')}>
                        <ShortFilter
                            filter={filter}
                            handleFinish={handleFinish}
                            handleFilterChange={handleFilterChange}
                            searchName={searchName}
                            handleSearchChange={handleSearchChange}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>

                    <div className={cx('pet-content')}>
                        <FilterMenu
                            filter={filter}
                            handleFinish={handleFinish}
                            handleFilterChange={handleFilterChange}
                            setCurrentPage={setCurrentPage}
                        />

                        {petList.length === 0 ? (
                            <p className={cx('null-pet-list')}>No pets found for your search</p>
                        ) : (
                            <PetList data={petList} dataLength={petList.length} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                        )}
                    </div>
                </div>
            </div>

            {!user ? <RegisBanner /> : null}
        </div>
    );
}

export default FindPet;
