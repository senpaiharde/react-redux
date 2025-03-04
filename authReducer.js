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
    user:safeParseJSON('user', null),
    users: safeParseJSON('users', []),
    isAuthenticated: !!localStorage.getItem("user"),
    balance: safeParseJSON('balance', 100),
    activityLog: safeParseJSON('activityLog', [])
};

const authReducer = (state = initialState, action) => {
    let newState = state;

    switch(action.type){
        case 'LOGIN': {
            newState = {
                ...state, user:action.payload, isAuthenticated:true};
                localStorage.setItem('user',JSON.stringify(action.payload));
            break;
        }
        
        case 'SIGNUP': {
            const newUsers =[...state.users, action.payload]
            newState = {
                ...state, users: newUsers,user:action.payload, isAuthenticated:true};
                localStorage.setItem('user',JSON.stringify(action.payload));
                localStorage.setItem('users',JSON.stringify(newUsers));
            break;
        }

        case 'LOGOUT':
            newState = { ...state, user: null, isAuthenticated: false };
            localStorage.removeItem('user');
            break;

            case 'UPDATE_BALANCE': {
                const newBalance = state.balance + action.payload;
                newState = { ...state, balance: newBalance };
                localStorage.setItem('balance', JSON.stringify(newBalance));
                break;
            }

            case 'ADD_ACTIVITY':
                if (typeof action.payload === "object" && action.payload.action) {
                    const updatedLog = [...state.activityLog, action.payload];
                    newState = { ...state, activityLog: updatedLog };
                    localStorage.setItem("activityLog", JSON.stringify(updatedLog));
                } else {
                    console.error("❌ Invalid activity log entry:", action.payload);
                }
                break;

        case 'UPDATE_PROFILE':
            if (JSON.stringify(state.user) !== JSON.stringify(action.payload)) {
                newState = { ...state, user: action.payload };
                localStorage.setItem('user', JSON.stringify(newState.user));
            }
            break;
        case "CLEAR_ACTIVITY":
            newState = { ...state, activityLog: [] };
            localStorage.removeItem("activityLog");
             break;
            
        
        default:
            return state;
    }

    return newState;
};

export default authReducer;
