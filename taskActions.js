export const setLoading = (isLoading) => ({
    type:"SET_LOADING",
    payload: isLoading,
});

export const loadTasks = (tasks) => ({
    type:"LOAD_TASKS",
    payload: tasks,
});



export const addTask = (task) => ({
    type: 'ADD_TASK',
    payload: task,
});


export const removeTask = (id) => ({
    type:'REMOVE_TASK',
    payload: id,
});


export const completeTask = (id) => (dispatch, getState) => {
    const state = getState();
    const task = state.tasks.tasks.find(task => task.id === id); // Get the task name

    dispatch({ type: 'COMPLETE_TASK', payload: id });

    if (task) {
        dispatch({ type: 'ADD_ACTIVITY', payload: `✅ Completed Task: "${task.name}"` });
    } else {
        dispatch({ type: 'ADD_ACTIVITY', payload: `✅ Completed Task (Unknown)` });
    }
};


export const setTaskFilter = (filter) => ({
    type:"SET_TASK_FILTER",
    payload:filter,
});

export const updateTaskProgress = (id, progress) => ({
    type:"UPDATE_PROGRESS",
    payload:{id,progress}
});

export const updateTask = (id, updatedFields) => ({
    type:'UPDATE_TASK',
    payload:{id, updatedFields}
});

export const undoCompleteTask = (id) => (dispatch, getState) => {
    const state = getState();
    const task = state.tasks.tasks.find(task => task.id === id);

    dispatch({ type: 'UNDO_COMPLETE_TASK', payload: id });

    if (task) {
        dispatch({ type: 'ADD_ACTIVITY', payload: `↩️ Undid Task: "${task.name}"` });
    } else {
        dispatch({ type: 'ADD_ACTIVITY', payload: `↩️ Undid Task (Unknown)` });
    }
};