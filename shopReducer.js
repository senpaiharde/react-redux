const initialState = {
    items: [
        {id: 1, name:"Custom Theme", price:50},
        {id: 2, name:"Premium Badge", price:100},
    ],
    ownedItems: []
};

const shopReducer = (state = initialState, action) => { 
    switch (action.type) {
        case "BUY_ITEM":
            
            return { 
                ...state,
                ownedItems: [...state.ownedItems, action.payload],
            }
    
        default:
            return state;
    }
};

export default shopReducer;