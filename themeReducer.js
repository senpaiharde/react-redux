const initialState = {
    theme: localStorage.getItem('theme') || "light",
    bgColor: "#ffffff",
};
const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_THEME':
            return{...state, theme: action.payload };
        case 'UPDATE_BACKGROUND':
            return{...state, bgColor: action.payload };    
           
    
        default:
            return state;
           
    }
};
export default themeReducer;