import Button from '~/components/Button';
import styles from './Pets.module.scss';
import classNames from 'classnames/bind';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import api from '~/config/axios';
import AddPet from './components/AddPet/AddPet';
import ViewPet from './components/ViewPet/ViewPet';
import Search from './components/Search/Search';
import PetContent from './components/PetContent/PetContent';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';

const cx = classNames.bind(styles);

function Pets() {
    const [currentPage, setCurrentPage] = useState(1);
    const [petList, setPetList] = useState([]);
    const [addPet, setAddPet] = useState(false);
    const [dataLength, setDataLength] = useState(0);
    const [refresh, setRefresh] = useState(0);
    const [petID, setPetID] = useState('');
    const [viewPet, setViewPet] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [activeSort, setActiveSort] = useState('View All');
    const [totalAdopted, setTotalAdopted] = useState(0);
    const [totalAvailable, setTotalAvailable] = useState(0);
    const [filter, setFilter] = useState({
        type: 'all',
        gender: 'all',
        age: 'all',
        color: 'all',
        state: 'all',
        vaccine: 'all',
        sort: 'sortByDate',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        setFilter((pre) => ({ ...pre, [name]: value }));
    };

    const handlePetsData = async () => {
        const { type, gender, age, color, vaccine, sort, state } = filter;
        const query = `petType=${type}&petAge=${age}&petGender=${gender}&petColor=${color}&petVaccin=${vaccine}&petStatus=${state}&keyword=${searchName}&sort=${sort}`;
        try {
            const response = await api.get(`pets/SearchPets?${query}`, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            const dataLength = response.data.length;
            // console.log(response.data);
            setDataLength(dataLength);
            localStorage.setItem('totalPets', dataLength);
            setPetList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePetsAvailable = async () => {
        const query = `petType=all&petAge=all&petGender=all&petColor=all&petVaccin=all&petStatus=Available&keyword=&sort=`;
        try {
            const response = await api.get(`pets/SearchPets?${query}`, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            const dataLength = response.data.length;
            // console.log(response.data);
            setTotalAvailable(dataLength);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePetsAdopted = async () => {
        const query = `petType=all&petAge=all&petGender=all&petColor=all&petVaccin=all&petStatus=Adopted&keyword=&sort=`;
        try {
            const response = await api.get(`pets/SearchPets?${query}`, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            const dataLength = response.data.length;
            // console.log(response.data);
            setTotalAdopted(dataLength);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFinish = async (e) => {
        if (e) e.preventDefault();
        await handlePetsData();

        const searchParams = {
            searchName,
            filter,
        };
        console.log(searchParams);
    };

    useEffect(() => {
        handlePetsData();
        handlePetsAvailable();
        handlePetsAdopted();
    }, [filter, refresh, currentPage, viewPet]);

    const handleAddPet = () => {
        setAddPet(false);
        setRefresh((prev) => prev + 1);
    };

    const handleImportExcel = (e) => {
        let file = e.target.files[0];
        console.log('file check', file);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async function (results) {
                console.log('Finished:', results.data);
                setPetList(results.data);

                try {
                    // Lặp qua từng pet trong petList và gửi từng cái một
                    for (const pet of results.data) {
                        const response = await api.post('pets', pet, {
                            headers: {
                                Authorization: `No Auth`,
                            },
                        });
                        console.log('API Response for pet:', response.data);
                    }
                } catch (error) {
                    console.error('Error uploading data:', error);
                }
            },
        });
    };

    console.log(petList);

    const petPerPage = 12;
    const indexOfLastPet = currentPage * petPerPage;
    const indexOfFirstPet = indexOfLastPet - petPerPage;
    const currentPet = petList.slice(indexOfFirstPet, indexOfLastPet);

    return (
        <>
            {!addPet ? (
                <div className={cx('wrapper')}>
                    <h1>Pets</h1>

                    {!viewPet ? (
                        <>
                            <div className={cx('user-sum')}>
                                <div className={cx('user-sum-item')}>
                                    <div>
                                        <p className={cx('item-number')}>{totalAvailable + totalAdopted}</p>
                                        <p className={cx('item-label')}>Total Pets</p>
                                    </div>
                                    <span>+2.15%</span>
                                </div>
                                <div className={cx('user-sum-item')}>
                                    <div>
                                        <p className={cx('item-number')}>{totalAvailable}</p>
                                        <p className={cx('item-label')}>Available Pets</p>
                                    </div>
                                    <span>+2.15%</span>
                                </div>
                                <div className={cx('user-sum-item')}>
                                    <div>
                                        <p className={cx('item-number')}>{totalAdopted}</p>
                                        <p className={cx('item-label')}>Adopted Pets</p>
                                    </div>
                                    <span>-3.5%</span>
                                </div>
                            </div>

                            <div className={cx('user-content')}>
                                <div className={cx('header')}>
                                    <div className={cx('sort')}>
                                        <p
                                            className={cx({ active: activeSort == 'View All' })}
                                            onClick={() => {
                                                setActiveSort('View All');
                                                setFilter((prev) => ({ ...prev, state: 'all' }));
                                                setCurrentPage(1);
                                            }}
                                        >
                                            View All
                                        </p>
                                        <p
                                            className={cx({ active: activeSort == 'Available' })}
                                            onClick={() => {
                                                setActiveSort('Available');
                                                setFilter((prev) => ({ ...prev, state: 'Available' }));
                                                setCurrentPage(1);
                                            }}
                                        >
                                            Available
                                        </p>
                                        <p
                                            className={cx({ active: activeSort == 'Adopted' })}
                                            onClick={() => {
                                                setActiveSort('Adopted');
                                                setFilter((prev) => ({ ...prev, state: 'Adopted' }));
                                                setCurrentPage(1);
                                            }}
                                        >
                                            Adopted
                                        </p>
                                    </div>

                                    <div className={cx('add-pet')}>
                                        <Button small primary onClick={() => setAddPet(true)}>
                                            <i className="fa-solid fa-plus" style={{ marginRight: '8px' }}></i> Add Pet
                                        </Button>

                                        {/* export excel thu cung  */}
                                        <div className="exportExcel">
                                            <CSVLink
                                                filename={'pet-data.csv'}
                                                className="btn btn-primary"
                                                data={petList}
                                            >
                                                <i class="fa-solid fa-file-export" style={{ marginRight: '8px' }}></i>
                                                Export
                                            </CSVLink>
                                        </div>

                                        <div className={cx('importExcel')}>
                                            <label className="importExcelLabel" htmlFor="importExcelBtn">
                                                <i class="fa-solid fa-file-import" style={{ marginRight: '8px' }}></i>
                                                Import
                                            </label>
                                            <input
                                                onChange={(e) => handleImportExcel(e)}
                                                id="importExcelBtn"
                                                type="file"
                                                hidden
                                            />
                                        </div>
                                    </div>

                                    <Search
                                        filter={filter}
                                        handleFilterChange={handleFilterChange}
                                        searchName={searchName}
                                        setSearchName={setSearchName}
                                        handleFinish={handleFinish}
                                    />
                                </div>

                                <div className={cx('main-content')}>
                                    <div className={cx('content-wrapper')}>
                                        <div className={cx('header-content')}>
                                            <p className={cx('id')}>ID</p>
                                            <p className={cx('image')}>Image</p>
                                            <p className={cx('name')}>Name</p>
                                            <p className={cx('role')}>Status</p>
                                            <p className={cx('date')}>Create Date</p>
                                            <p className={cx('action')}>Action</p>
                                        </div>

                                        {petList.length === 0 ? (
                                            <p
                                                style={{ textAlign: 'center', marginTop: 16 }}
                                                className={cx('null-pet-list')}
                                            >
                                                No pets found for your search
                                            </p>
                                        ) : (
                                            <PetContent
                                                currentPet={currentPet}
                                                setPetID={setPetID}
                                                setViewPet={setViewPet}
                                            />
                                        )}
                                    </div>
                                    <div className={cx('pagination')}>
                                        <Pagination
                                            style={{ display: 'block' }}
                                            current={currentPage}
                                            defaultCurrent={1}
                                            total={dataLength}
                                            pageSize={12}
                                            onChange={(page) => setCurrentPage(page)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <ViewPet id={petID} setViewPet={setViewPet} />
                    )}
                </div>
            ) : (
                <AddPet setAddPet={handleAddPet} />
            )}
        </>
    );
}

export default Pets;
