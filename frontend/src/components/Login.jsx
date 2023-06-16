import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

// Import the AuthContext from App.js
import { AuthContext } from '../App';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Access the isLoggedIn state and setIsLoggedIn function from the AuthContext
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = () => {
    // Make an API request to perform login
    axios
      .post('http://127.0.0.1:5000/login', { email, password })
      .then((response) => {
        console.log('Login successful!');
        setIsLoggedIn(true); // Update the isLoggedIn state to true
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setError('Invalid email or password');
      });
  };

  const handleSignup = () => {
    navigate('/sign-up');
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login Page</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="login-button" type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p className="signup-text">
        Don't have an account?{' '}
        <button className="signup-button" type="button" onClick={handleSignup}>
          Signup
        </button>
      </p>
      {/* <p className="isLoggedIn-text">isLoggedIn: {isLoggedIn ? 'true' : 'false'}</p> Display the value of isLoggedIn */}
    </div>
  );
}

export default Login;
