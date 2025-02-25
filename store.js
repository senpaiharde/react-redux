import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import authReducer from "./reducers/authReducer";
import taskReducer from "./reducers/taskReducer";
import themeReducer from "./reducers/themeReducer";
import shopReducer from "./reducers/shopReducer";



const rootReducer = combineReducers({
    auth: authReducer,
    tasks: taskReducer,
    theme : themeReducer,
    shop: shopReducer,

});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;