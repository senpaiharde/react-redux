import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authActions';
import { changeTheme } from '../actions/themeActions';
import ProfileSettings from './ProfileSettings';



const Navbar = () => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state?.theme?.theme || "light");
    const isAuthenticated = useSelector(state => state?.auth?.isAuthenticated || false);
    const user = useSelector(state => state.auth?.user) || { name: "Guest", borderColor: "#000", bgColor: "#fff" };
    const balance = useSelector(state => state?.auth?.balance || 0);
    const tasks = useSelector(state => state.tasks.tasks);

    const [showProfileSettings, setShowProfileSettings] = useState(false);


    const todayDate = new Date().toISOString().split('T')[0];

    const totalTasksToday = tasks.filter(task => task.scheduledDate === todayDate).length;
    const completedToday = tasks.filter(task => task.completed && task.scheduledDate === todayDate).length;

    const progressPercentage = totalTasksToday > 0 ? Math.round((completedToday / totalTasksToday) * 100) : 0;



    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        if (savedTheme !== theme) {
            document.body.classList.toggle("dark-theme", savedTheme === "dark");
        }
    }, [theme]);

    const handleThemeToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        document.body.classList.toggle("dark-theme", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
        dispatch(changeTheme(newTheme));
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/tasks">📋 Tasks</Link>
                <Link to="/shop">🛒 Shop</Link>
            </div>

            {/* Progress Bar - Task Completion */}
            <div className="nav-progress">
                <p>📆 {new Date().toLocaleDateString()} - {completedToday} / {totalTasksToday} Tasks Completed</p>
                <div className="progress-container">
                    <progress value={progressPercentage} max="100"></progress>
                    <span>{progressPercentage}% Completed</span>
                </div>
            </div>

            <div className="nav-right">
                <button onClick={handleThemeToggle}>
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>

                {isAuthenticated ? (
                    <div className="user-info" style={{
                        border: `3px solid ${user?.borderColor || "#000"}`,
                        backgroundColor: `${user?.bgColor || "#fff"}`,
                        padding: "5px",
                        borderRadius: "5px"
                    }}>
                        <span>👤 {user?.name || "Guest"} | 💰 {balance} $</span>
                        <button onClick={() => setShowProfileSettings(true)}>⚙️</button>
                        <button onClick={() => dispatch(logout())}>🚪 Logout</button>
                    </div>
                ) : (
                    <Link to="/">🔐 Login</Link>
                )}
            </div>

            {showProfileSettings && 
                (<ProfileSettings key='profile-settings' onClose={() => setShowProfileSettings(false)} />)}
        </nav>
    );
};
export default Navbar;
