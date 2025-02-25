import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { buyItem } from "../actions/shopActions";

const Shop = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.shop.items);
    const balance = useSelector(state => state.tasks.balance);
    const ownedItems = useSelector(state => state.shop.ownedItems);
    /* loading owned items form localstorage */
    useEffect(()=>{
        const savedItems = JSON.parse(localStorage.getItem('ownedItems'));
        if(savedItems){
            dispatch({type: "SET_OWNED_ITEMS", payload: savedItems});
        }
    },[dispatch]);
    /* handling the items you buy and updating the localstorage */
    const handleBuyItem = (item) => {
        dispatch(buyItem(item));
        const updateOwnedItems = [...ownedItems, item.id];
        localStorage.setItem('ownedItems', JSON.stringify(updateOwnedItems))
    }

    return (
        <div>
            <h2>Shop</h2>
            <p>Your Balance: ${balance}</p>
         {items.map(item => (
            <div key={item.id} className="shop-item">
                <h3>{item.name} - ${item.price}</h3>
                <button
                disabled = {balance < item.price || ownedItems.includes(item.id)}
                onClick={() => handleBuyItem(item)}
                >
                    {ownedItems.includes(item.id) ? "Purchased" : "buy"} 
                </button>
            </div>
         ))}
        </div>
    );
};
export default Shop;

/* user can only buy items once , checking balance when buying, and storing the items that got bought */