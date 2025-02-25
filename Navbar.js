import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authActions';
import { changeTheme } from '../actions/themeActions';


const Navbar = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state?.theme?.theme || "light");
    const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated || false);
    const user = useSelector((state) => state?.auth?.user) || { name: "Guest" };
    const balance = useSelector((state) => state?.auth?.balance || 0);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.body.classList.toggle("dark-theme", savedTheme === "dark");
    }, []);

    const handleThemeToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        document.body.classList.toggle("dark-theme", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
        dispatch(changeTheme(newTheme));
    };

    return (
        <nav className="navbar">
            <Link to="/tasks">Tasks</Link>
            <Link to="/shop">Shop</Link>

            <button onClick={handleThemeToggle}>
                {theme === "light" ? "Dark Mode 🌙" : "Light Mode ☀️"}
            </button>

            {isAuthenticated ? (
                <div className="user-info">
                    <span>👤 {user?.name || "Guest"} | 💰 {balance} $</span>
                    <button onClick={() => dispatch(logout())}>Logout</button>
                </div>
            ) : (
                <Link to="/">Login</Link>
            )}
        </nav>
    );
};

export default Navbar;