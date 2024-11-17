import React, { useEffect, useState } from 'react';
import api from '~/config/axios';
import './ShowAllPetAdopted.scss';
import Table from 'react-bootstrap/Table';
import { Pagination } from 'antd';

const ShowAllPetAdopted = () => {
    const [petList, setPet] = useState([]);
    const [appliList, setAppliList] = useState([]);
    const [adoptedPet, setAdoptedPet] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const petsPerPage = 10;

    // Lay application
    const getApplication = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            const response = await api.get(`applications/sorted-by-user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const filterApplication = response.data.filter((app) => app.status === 3);
            setAppliList(filterApplication); // Lưu dữ liệu vào state
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
        }
    };
    console.log('Day la appliList', appliList);

    //Lay Pet Data
    const getPet = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await api.get(`pets`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setPet(response.data); // Lưu dữ liệu vào state
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
        }
    };
    console.log('Day la pet List', petList);

    const filterPetByApplication = () => {
        const applicationPetIds = appliList.map((app) => app.petId);
        const filtered = petList.filter((pet) => applicationPetIds.includes(pet.petId));
        setAdoptedPet(filtered);
    };
    console.log('day la adopted pet: ', adoptedPet);

    // Tính toán các thú cưng sẽ hiển thị trên trang hiện tại
    const indexOfLastPet = currentPage * petsPerPage;
    const indexOfFirstPet = indexOfLastPet - petsPerPage;
    const currentPets = adoptedPet.slice(indexOfFirstPet, indexOfLastPet);

    // Hàm chuyển trang
    const onChangePage = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getApplication();
        getPet();
    }, []);

    useEffect(() => {
        filterPetByApplication(); // Lọc pet sau khi cả application và pet đã được lấy
    }, [appliList, petList]);

    return (
        <div className="showAllPet">
            <div className="showAllPet_box">
                <h3 className="showAllPet_box_title">My Adopted Pet</h3>
                <div className="showAllPet_box_header"></div>
                <div className="showAllPet_box_PetBox_wrap">
                    <div className="showAllPet_box_PetBox">
                        <div className="showAllPet_box_PetBox_header">
                            <p>Name</p>
                            <p>Type</p>
                            <p>Breed</p>
                            <p>Color</p>
                            <p>Action</p>
                        </div>
                        {currentPets.map((pet) => (
                            <div className="showAllPet_box_PetBox_eachPet" key={pet.id}>
                                <div className="petInfo">
                                    <div className="petInfo_name">
                                        <p>{pet.petName}</p>
                                    </div>
                                    <div className="petInfo_type">
                                        <p>{pet.petType}</p>
                                    </div>
                                    <div className="petInfo_breed">
                                        <p>{pet.petBreed}</p>
                                    </div>
                                    <div className="petInfo_color">
                                        <p>{pet.petColor}</p>
                                    </div>
                                    <div className="petInfo_action">
                                        <a href={`/my-pet-detail/${pet.petId}`}>View Details</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Phân trang */}
                        <div className="showAllPet_pagination">
                            <Pagination
                                current={currentPage}
                                pageSize={petsPerPage}
                                total={petList.length}
                                onChange={onChangePage}
                                showSizeChanger={false} // Ẩn nút thay đổi số lượng hiển thị
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowAllPetAdopted;
