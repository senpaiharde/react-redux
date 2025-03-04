import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
    const tasks = useSelector(state => state.tasks.tasks);

    // Get today's date in YYYY-MM-DD format
    const todayDate = new Date().toISOString().split("T")[0];

    // Filter tasks completed today
    const completedToday = tasks.filter(task => task.completed && task.scheduledDate === todayDate).length;
    const totalTasksToday = tasks.filter(task => task.scheduledDate === todayDate).length;

   
    const progressPercentage = totalTasksToday > 0 ? Math.round((completedToday / totalTasksToday) * 100) : 0;

    return (
        <footer className="app-footer">
            <div className="footer-content">
                <h3>📆 Today: {new Date().toLocaleDateString()}</h3>
                <p>✅ Completed Today: {completedToday} / {totalTasksToday} tasks</p>

                <div className="progress-container">
                    <progress value={progressPercentage} max="100"></progress>
                    <span>{progressPercentage}% Completed</span>
                </div>

                <p>🚀 Stay Productive & Keep Going! 🚀</p>
            </div>
        </footer>
    );
};

export default Footer;
