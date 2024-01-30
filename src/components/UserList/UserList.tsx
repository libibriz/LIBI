import React, { FC, useEffect, useState, useRef } from 'react';
import ApiService from '../../services/Api.service';
import userModel from '../../Model/userModel';
import User_Details from '../User_Details/User_Details';
import My_Modal from '../My_Modal/My_Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

interface UserListProps {}

const UserList: FC<UserListProps> = () => {
  const [users, setUsers] = useState<userModel[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<userModel[]>([]);
  const [selectedUser, setSelectedUser] = useState<userModel | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadItems();
  }, []);

  const addUser = (userToAdd: userModel) => {
    alert("User added");
    const updatedUsers = [...users, userToAdd];
    const updatedUsers1 = [...filteredUsers, userToAdd];
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers1);
  };

  const loadItems = async () => {
    setLoading(true); 
    try {
      const response = await ApiService.getListApi();
      const data = response.data;
      const usersData = data.map((user: any) =>
        new userModel(user.name, user.id, user.username, user.email)
      );
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }finally {
      setLoading(false); // בסיום הבקשה, כבה את הטעינה
    }
  };

  const filterUsers = (searchTerm: string) => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSearchInputChange = () => {
    if (searchInputRef.current) {
      filterUsers(searchInputRef.current.value);
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      console.log(`Deleting user: ${selectedUser.name}`);
      setShowModal(false);
    }
  };

  const handleShowModal = (user: userModel) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <User_Details addUser={addUser}/>
        </div>
        <div className="col-md-6">
          <My_Modal
            modalTitle="Delete User"
            onApproveClick={handleDeleteUser}
            showModal={showModal}
            onClose={() => setShowModal(false)}
          >
            {selectedUser && `Are you sure you want to delete ${selectedUser.name}?`}
          </My_Modal>
          <div className="user-list-container">
            <input
              type="text"
              placeholder="Search by name"
              ref={searchInputRef}
              onChange={handleSearchInputChange}
              className="form-control"
            />
          {loading && ( // אם טוען, הצג את הגלגלת
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p>Loading...</p>
          </div>
        )}
        {!loading && ( // אם לא טוען, הצג את הטבלה
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td><button onClick={() => handleShowModal(user)} className="btn btn-danger">Delete</button></td>
                    <td>{user.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
