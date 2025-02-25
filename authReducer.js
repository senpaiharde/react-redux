const safeParseJSON = (key, defaultValue) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error parsing localStorage key "${key}":`, error);
        return defaultValue;
    }
};

const initialState = { 
    user: safeParseJSON('user', null),
    isAuthenticated: !!localStorage.getItem("user"),
    balance: safeParseJSON('balance', 100),
    activityLog: safeParseJSON('activityLog', [])
};

const authReducer = (state = initialState, action) => {
    let newState = state; // Keep reference to the original state

    switch(action.type){
        case 'LOGIN':
        case 'SIGNUP':
            newState = { ...state, user: action.payload, isAuthenticated: true };
            localStorage.setItem('user', JSON.stringify(action.payload));
            break;

        case 'LOGOUT':
            newState = { ...state, user: null, isAuthenticated: false };
            localStorage.removeItem('user');
            break;

        case 'UPDATE_BALANCE':
            newState = { ...state, balance: state.balance + action.payload };
            localStorage.setItem('balance', JSON.stringify(newState.balance));
            break;

            case 'ADD_ACTIVITY':
                newState = {...state, activityLog: [...state.activityLog, action.payload]};
                localStorage.setItem('activityLog', JSON.stringify(newState.activityLog)); //  Fix Typo
                break;

        default:
            return state;
    }

    return newState;
};

export default authReducer;