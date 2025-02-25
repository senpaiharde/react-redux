const initialState = {
    tasks: [],
    balance: JSON.parse(localStorage.getItem('balance') || "100"), //  Store in localStorage
    isLoading: false,
    filterBy: 'all',
    activityLog: JSON.parse(localStorage.getItem('activityLog') || "[]" )//  Keep activity logs here
};

const taskReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case 'ADD_TASK':
            newState = { 
                ...state, 
                tasks: [...state.tasks, action.payload],
                activityLog: [...state.activityLog, `➕ Added task: "${action.payload.name}"`] //  Log new task
            };
            break;

        case 'REMOVE_TASK':
            newState = { 
                ...state, 
                tasks: state.tasks.filter(task => task.id !== action.payload),
                activityLog: [...state.activityLog, `🗑️ Removed task`] //  Log task removal
            };
            break;

            case "COMPLETE_TASK":
                const completedTask = state.tasks.find(task => task.id === action.payload);
                return {
                    ...state,
                    tasks: state.tasks.map(task =>
                        task.id === action.payload
                            ? { ...task, completed: true, updatedAt: new Date().toLocaleString() }
                            : task
                    ),
                    balance: state.balance + 10,
                    activityLog: [
                        ...state.activityLog,
                        ` Completed Task: ${completedTask?.name || "Unnamed Task"}`
                    ]
                };

        case "UNDO_COMPLETE_TASK":
            const undoneTask = state.tasks.find(task => task.id === action.payload);
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload
                        ? { ...task, completed: false, updatedAt: new Date().toLocaleString() }
                        : task
                ),
                balance: state.balance - 10,
                activityLog: [
                    ...state.activityLog,
                    `↩️ Undid Task: ${undoneTask?.name || "Unnamed Task"}`
                ]
            };

        case 'UPDATE_PROGRESS':
            newState = {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id 
                        ? { ...task, progress: action.payload.progress, updatedAt: new Date().toLocaleString() } 
                        : task
                ),
                activityLog: [...state.activityLog, `📊 Updated progress to ${action.payload.progress}%`] //  Log progress update
            };
            break;

        case 'UPDATE_TASK':
            newState = {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id 
                        ? { ...task, ...action.payload.updatedFields, updatedAt: new Date().toLocaleString() } 
                        : task
                ),
                activityLog: [...state.activityLog, `✏️ Edited task "${action.payload.updatedFields.name || 'Unnamed'}"`] //  Log task edit
            };
            break;

        case 'SET_LOADING':
            newState = { ...state, isLoading: action.payload };
            break;

        case 'LOAD_TASKS':
            newState = { ...state, tasks: action.payload, isLoading: false };
            break;

        case 'SET_TASK_FILTER':
            newState = { ...state, filterBy: action.payload };
            break;

        case 'ADD_ACTIVITY': //  Allow external activity logging
            newState = { ...state, activityLog: [...state.activityLog, action.payload] };
            break;

        default:
            return state;
    }

    //  Store updates in localStorage
    localStorage.setItem('balance', JSON.stringify(newState.balance));
    localStorage.setItem('activityLog', JSON.stringify(newState.activityLog));

    return newState;
};

export default taskReducer;
