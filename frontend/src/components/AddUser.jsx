import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddUser.css';
import { AuthContext } from '../App';

function AddUser() {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  // Access the isLoggedIn state and setIsLoggedIn function from the AuthContext
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    // Make an API request to add a new user
    axios
      .post('http://127.0.0.1:5000/users', user)
      .then((response) => {
        console.log('User added successfully!');
        setUser({ name: user.email, email: user.email, password: user.password });
        setIsLoggedIn(true); // Update the isLoggedIn state to true
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="add-user-container">
      <h2 className="add-user-heading">Add User</h2>
      <form className="add-user-form">
        <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleInputChange} />
        <button className="add-user-button" type="button" onClick={handleAddUser}>
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;
