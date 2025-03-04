import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import Shop from "./components/Shop";
import Navbar from "./components/Navbar";
import Signup from './components/Signup';


const App = () => {
    const theme = useSelector(state => state.theme.theme); 
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
      <div className={`app-container ${theme}`}>
        <Navbar />
        <Routes> 
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
          <Route 
            path="/tasks" 
            element={<ProtectedRoute isAuthenticated={isAuthenticated}><TaskList /></ProtectedRoute>} 
          />
          <Route 
            path="/shop" 
            element={<ProtectedRoute isAuthenticated={isAuthenticated}><Shop /></ProtectedRoute>} 
          />
        </Routes>
      </div>
    );
};

export default App;
