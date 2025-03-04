import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; 
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './reducers/authReducer';
import taskReducer from './reducers/taskReducer';
import themeReducer from './reducers/themeReducer';
import shopReducer from './reducers/shopReducer';

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    tasks: taskReducer,
    theme: themeReducer,
    shop: shopReducer,
});

// Apply middleware
const middleware = [thunk]; 

// Create store with middleware
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
