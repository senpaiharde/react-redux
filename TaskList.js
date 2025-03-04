import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, completeTask, setTaskFilter, updateTaskProgress, updateTask, undoCompleteTask } from "../actions/taskActions";
import { v4 as uuidv4 } from "uuid";
import ActivityLog from "./ActivityLog";
import Footer from "./footer";



const TaskList = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskGoal, setTaskGoal] = useState(100);
    const [taskDate, setTaskDate] = useState(new Date().toISOString().split("T")[0]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [progressInput, setProgressInput] = useState({});
    const [showAddTask, setShowAddTask] = useState(false);
    const [notification, setNotification] = useState(null);
    const [scrollOffset, setScrollOffset] = useState(0);

    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        dispatch({ type: "LOAD_TASKS", payload: savedTasks });
    }, [dispatch]);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        } else {
            localStorage.removeItem("tasks");
        }
    }, [tasks]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollOffset(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 1500);
    };

    const handleAddTask = () => {
        if (taskName.trim()) {
            const newTask = {
                id: uuidv4(),
                name: taskName,
                completed: false,
                description: taskDescription,
                goal: taskGoal,
                progress: 0,
                createdAt: new Date().toLocaleString(),
                scheduledDate: taskDate
            };
            dispatch(addTask(newTask));
            showNotification(`🎉 Task "${taskName}" added successfully!`);
            setTaskName('');
            setTaskDescription('');
            setTaskGoal(100);
            setShowAddTask(false);
        } else {
            showNotification("❌ Task name cannot be empty!", "error");
        }
    };

    const handleProgressUpdate = (id, value) => {
        const newValue = Math.min(100, Math.max(0, value));
        setProgressInput(prev => ({ ...prev, [id]: newValue }));
        dispatch(updateTaskProgress(id, newValue));
    };

    return (
        <div className={`task-container ${showAddTask ? "blur-background" : ""}`} style={{ "--scroll-offset": `${scrollOffset}px` }}>
            <ActivityLog />

            {/* Add Task & Filter */}
            <div className="task-controls">
                <button className="add-task-button" onClick={() => setShowAddTask(true)}>➕ Add Task</button>

                <label className="filter-label">Filter by Date:</label>
                <input 
                    type="date" 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)} 
                    className="filter-date"
                />
            </div>

            {/* 📌 Add Task Modal */}
            {showAddTask && (
                <div className="task-modal" style={{ top: `calc(50% + ${scrollOffset}px)` }}>
                    <div className="task-modal-content">
                        <h3 className="task-modal-title">📝 Create a New Task</h3>
                        
                        <input type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />

                        <textarea placeholder="Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />

                        <label>📅 Schedule Task:</label>
                        <input type="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} />

                        <label>🎯 Set Goal (%):</label>
                        <input type="number" placeholder="100%" value={taskGoal} onChange={(e) => setTaskGoal(Number(e.target.value))} />

                        {/* Buttons */}
                        <div className="task-modal-buttons">
                            <button className="save-task" onClick={handleAddTask}>✅ Save Task</button>
                            <button className="cancel-task" onClick={() => setShowAddTask(false)}>❌ Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Task Board */}
            <div className="task-board">
                <div className="task-column">
                    <h2>📌 Not Completed</h2>
                    {tasks.filter(task => !task.completed).map(task => (
                        <div key={task.id} className="task-item">
                            <h3>{task.name}</h3>
                            <p>{task.description}</p>
                            <small>📅 Scheduled: {task.scheduledDate}</small>

                           
                            <div className="progress-container">
                             
                               <progress value={progressInput[task.id] ?? task.progress} max="100"></progress>
                              <span className="progress-text">{progressInput[task.id] ?? task.progress}%</span>

   
                                 <input 
                                type="number" 
                                min="0" 
                                max="100" 
                                placeholder="Enter %"
                                value={progressInput[task.id] ?? task.progress} 
                                onChange={(e) => handleProgressUpdate(task.id, Number(e.target.value))}
                                className="progress-input"
                                           />
                                       </div>

                            <button onClick={() => dispatch(completeTask(task.id))}>✅ Complete</button>
                            <button onClick={() => dispatch(removeTask(task.id))}>🗑 Delete</button>
                        </div>
                    ))}
                </div>

                <div className="task-column">
                    <h2>✅ Completed</h2>
                    {tasks.filter(task => task.completed).map(task => (
                        <div key={task.id} className="task-item task-completed">
                            <h3>{task.name}</h3>
                            <p>{task.description}</p>
                            <small>📅 Scheduled: {task.scheduledDate}</small>
                            <button onClick={() => dispatch(undoCompleteTask(task.id))}>🔄 Undo</button>
                            <button onClick={() => dispatch(removeTask(task.id))}>🗑 Delete</button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default TaskList;