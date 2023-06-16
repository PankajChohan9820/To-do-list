import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import AddUser from './components/AddUser';
import Login from './components/Login';
import TaskManager from './components/TaskManager';
import './App.css';

// Create a context for login status
export const AuthContext = React.createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set the login status here based on your logic

  const handleLogout = () => {
    // Make an API request to perform logout
    console.log('Logout successful!');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Router>
        <div className="App">
          <header className="header">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                {isLoggedIn ? (
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                ) : (
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                )}
              </ul>
            </nav>
          </header>

          <Routes>
            <Route path="/sign-up" element={<AddUser />} />
            <Route path="/" element={isLoggedIn ? <TaskManager /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
