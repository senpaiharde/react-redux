import { addActivity } from "./authActions";
import { useDispatch, useSelector } from "react-redux";

export const setLoading = (isLoading) => ({
    type: "SET_LOADING",
    payload: isLoading,
});

export const loadTasks = (tasks) => (dispatch, getState) => {
    const state = getState();
    
    // Prevent duplicate loading
    if (JSON.stringify(state.tasks.tasks) === JSON.stringify(tasks)) return;

    dispatch({
        type: "LOAD_TASKS",
        payload: tasks,
    });

    if (tasks.length > 0) {
        dispatch({
            type: "ADD_ACTIVITY",
            payload: {
                date: new Date().toLocaleString(),
                action: "📂 Loaded Tasks",
                name: `${tasks.length} tasks loaded`,
            },
        });
    }
};

export const addTask = (task) => (dispatch, getState) => {
    const state = getState();

    // Prevent adding duplicate tasks
    if (state.tasks.tasks.some((t) => t.id === task.id)) return;

    dispatch({
        type: "ADD_TASK",
        payload: task,
    });

    dispatch({
        type: "ADD_ACTIVITY",
        payload: {
            date: new Date().toLocaleString(),
            action: "➕ Added Task",
            name: task.name,
        },
    });
};

export const removeTask = (id) => (dispatch, getState) => {
    const state = getState();
    const task = state.tasks.tasks.find((task) => task.id === id);

    if (!task) return; // Prevent removing non-existent tasks

    dispatch({
        type: "REMOVE_TASK",
        payload: id,
    });

    dispatch({
        type: "ADD_ACTIVITY",
        payload: {
            date: new Date().toLocaleString(),
            action: "🗑 Removed Task",
            name: task.name,
        },
    });
};

export const completeTask = (id) => (dispatch, getState) => {
    const state = getState();
    const task = state.tasks.tasks.find((task) => task.id === id);

    if (!task || task.completed) return; // Prevent completing an already completed task

    dispatch({ type: "COMPLETE_TASK", payload: id });

    dispatch({
        type: "ADD_ACTIVITY",
        payload: {
            date: new Date().toLocaleString(),
            action: "✅ Completed Task",
            name: task.name,
        },
    });
};

export const setTaskFilter = (filter) => ({
    type: "SET_TASK_FILTER",
    payload: filter,
});

export const updateTaskProgress = (id, progress) => (dispatch, getState) => {
    const state = getState();
    const task = state.tasks.tasks.find((task) => task.id === id);

    if (!task || task.progress === progress) return; // Prevent unnecessary updates

    dispatch({
        type: "UPDATE_PROGRESS",
        payload: { id, progress },
    });

    dispatch({
        type: "ADD_ACTIVITY",
        payload: {
            date: new Date().toLocaleString(),
            action: `📊 Updated Task Progress`,
            name: `${task.name} → ${progress}%`,
        },
    });
};

export const updateTask = (id, updatedFields) => (dispatch, getState) => {
    const state = getState();
    const task = state.tasks.tasks.find((task) => task.id === id);

    if (!task) return; // Prevent updating non-existent tasks

    dispatch({
        type: "UPDATE_TASK",
        payload: { id, updatedFields },
    });

    dispatch({
        type: "ADD_ACTIVITY",
        payload: {
            date: new Date().toLocaleString(),
            action: `✏️ Updated Task`,
            name: task.name,
        },
    });
};

export const undoCompleteTask = (id) => (dispatch, getState) => {
    const state = getState();
    const task = state.tasks.tasks.find((task) => task.id === id);

    if (!task || !task.completed) return; // Prevent undoing an already active task

    dispatch({ type: "UNDO_COMPLETE_TASK", payload: id });

    dispatch({
        type: "ADD_ACTIVITY",
        payload: {
            date: new Date().toLocaleString(),
            action: "↩️ Undid Task",
            name: task.name,
        },
    });
};
