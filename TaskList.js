import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, completeTask, setTaskFilter, updateTaskProgress, setLoading, updateTask, undoCompleteTask } from "../actions/taskActions";
import { v4 as uuidv4 } from 'uuid';
import ActivityLog from "./ActivityLog";

const TaskList = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskGoal, setTaskGoal] = useState(100);
    const [progressInput, setProgressInput] = useState({}); // Stores live input state
    const [showAddTask, setShowAddTask] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [taskAnimation, setTaskAnimation] = useState({}); // Tracks animation state
    const [notification, setNotifitcation] = useState(null);

    const tasks = useSelector(state => state.tasks.tasks);
    const filterBy = useSelector(state => state.tasks.filterBy);
    const dispatch = useDispatch();

    // Show loading animation before displaying tasks
    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 500);
    }, []);

    // Load tasks from localStorage
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        if (!localStorage.getItem('tasks_loaded') && savedTasks.length > 0) {
            dispatch({ type: 'LOAD_TASKS', payload: savedTasks });
            localStorage.setItem('tasks_loaded', true);
        }
    }, [dispatch]);

    // Save tasks to localStorage only when necessary
    useEffect(() => {
        if (tasks.length > 0) {
            const savedTasks = JSON.stringify(tasks);
            if (localStorage.getItem('tasks') !== savedTasks) {
                localStorage.setItem('tasks', savedTasks);
            }
        }
    }, [tasks]);

    // Prevent Hot Module Replacement from causing reloads
    useEffect(() => {
        return () => {
            console.log("Cleaning up old tasks on HMR update...");
            localStorage.removeItem('tasks_loaded');
        };
    }, []);


    const showNotification = (message, type='sucess') => {
        setNotifitcation({message, type});
        setTimeout(() => setNotifitcation, 1500);
    }

    const handleAddTask = () => {
        if (taskName.trim()) {
            const newTask = {
                id: uuidv4(),
                name: taskName,
                completed: false,
                description: taskDescription,
                goal: 100,
                progress: 0,
                createdAt: new Date().toLocaleString(),
                updatedAt: new Date().toLocaleString()
            };
            dispatch(addTask(newTask));
            showNotification(`🎉 Task "${taskName}" added successfully!`);
            setTaskName('');
            setTaskDescription('');
            setShowAddTask(false);
        }else{
            showNotification('❌ Task name cannot be empty!", "error"')
        }
    };

    const handleUpdateTask = () => {
        if (editingTask) {
            dispatch(updateTask(editingTask.id, { name: taskName, description: taskDescription, goal: taskGoal }));
            setEditingTask(null);
            setShowAddTask(false);
        }
    };

    // Live update progress input and immediately update Redux
    const handleProgressUpdate = (id, value) => {
        const newValue = Math.min(100, Math.max(0, value)); // Limit between 0-100%
        setProgressInput(prev => ({ ...prev, [id]: newValue })); // Update input state
        dispatch(updateTaskProgress(id, newValue)); // Update Redux immediately
    };

    // Handle task completion and undo with animation
    const handleTaskAction = (id, action) => {
        setTaskAnimation(prev => ({ ...prev, [id]: true }));
        setTimeout(() => {
            dispatch(action(id));
            setTaskAnimation(prev => ({ ...prev, [id]: false }));
        }, 400);
    };

    // Delete Task with Confirmation
    const handleDeleteTask = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(removeTask(id));
        }
    };

    // Assign colors based on task progress
    const getTaskColor = (task) => {
        if (task.completed) return 'task-completed';
        if (task.progress >= 70) return 'task-high-progress';
        if (task.progress >= 30) return 'task-medium-progress';
        return 'task-low-progress';
    };

    // Task Item Component
    const TaskItem = ({ task }) => {
        return (
            <li className={`task-item ${getTaskColor(task)} ${taskAnimation[task.id] ? 'fade-out' : ''}`}>
                <div className="task-content">
                    <h3>{task.name}</h3>
                    <p>{task.description}</p>
                    <small>📅 Created: {task.createdAt}</small>
                    <small>🔄 Updated: {task.updatedAt}</small>

                    {/* Progress Bar with % */}
                    <div className="progress-container">
                        <progress value={progressInput[task.id] ?? task.progress} max="100"></progress>
                        <span className="progress-text">{progressInput[task.id] ?? task.progress}%</span>
                    </div>

                    {/* Progress Input */}
                    <input
                        type="number"
                        placeholder="Progress"
                        value={progressInput[task.id] ?? task.progress}
                        max="100"
                        min="0"
                        onChange={(e) => handleProgressUpdate(task.id, Number(e.target.value))}
                    />

                    <div className="task-buttons">
                        {task.completed ? (
                            <button onClick={() => handleTaskAction(task.id, undoCompleteTask)}>⬅️ Undo</button>
                        ) : (
                            <button onClick={() => handleTaskAction(task.id, completeTask)}>➡️ Complete</button>
                        )}
                        <button onClick={() => {
                            setTaskName(task.name);
                            setTaskDescription(task.description);
                            setEditingTask(task);
                            setShowAddTask(true);
                        }}>✏️ Edit</button>
                        <button onClick={() => handleDeleteTask(task.id)}>❌ Delete</button>
                    </div>
                </div>
            </li>
        );
    };

    return (
        <div className="task-list-container">
            {loading ? <div className="loading-spinner"></div> : (
                <>
                {notification && (
                        <div className={`notification ${notification.type}`}>
                            {notification.message}
                        </div>
                    )}
                    <button className="add-task-button" onClick={() => setShowAddTask(true)}>+ Add Task</button>
                    <ActivityLog />
                    {showAddTask && (
                        <div className="task-form">
                            <input type="text" placeholder="Task Name" value={taskName}
                                onChange={(e) => setTaskName(e.target.value)} />
                            <textarea placeholder="Task Description" value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)} />
                            <input type="number" placeholder="Goal (e.g 100%)" value={taskGoal}
                                onChange={(e) => setTaskGoal(Number(e.target.value))} />

                            <button onClick={editingTask ? handleUpdateTask : handleAddTask}>
                                {editingTask ? "Update Task" : "Add Task"}
                            </button>
                        </div>
                    )}

                    <div className="task-filters">
                        <button onClick={() => dispatch(setTaskFilter('all'))}>All</button>
                        <button onClick={() => dispatch(setTaskFilter('active'))}>Active</button>
                        <button onClick={() => dispatch(setTaskFilter('completed'))}>Completed</button>
                    </div>

                    <div className="task-board">
                        <div className="task-column">
                            <h2>📌 Not Completed</h2>
                            <ul>{tasks.filter(task => !task.completed).map(task => <TaskItem key={task.id} task={task} />)}</ul>
                        </div>
                        <div className="task-column">
                            <h2>✅ Completed</h2>
                            <ul>{tasks.filter(task => task.completed).map(task => <TaskItem key={task.id} task={task} />)}</ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskList;


/*
filter tasks
prevents empy tasks
show user progress in tasks 

*/