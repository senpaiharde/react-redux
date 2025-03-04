import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import users from '../data/usersData';


//  LOGIN FUNCTION
export const login = (username , password) => (dispatch, getState) => {
    const storedUSers = getState().auth.users.length > 0 ? getState().auth.users : users;
    
    const user = storedUSers.find(user => user.name === username && user.password === password );
    
    if(user){
        dispatch({type:"LOGIN", payload:user });
        dispatch({
            type: "ADD_ACTIVITY",
            payload:{date: new Date().toLocaleString(), action: "🔓 Logged In", name:user.username}
            
        });
        return{success:true, massage:"Login successful!" };
    }else{
        return{success:false, message:"Invaild Username or Passowrd loser!"};
    }
};



// signup FUNCTION
export const signUp = (username, password, fullname) => (dispatch, getState) => {
    const storedUSers = getState().auth.users.length > 0 ? getState().auth.users : users;
    
    if(storedUSers.some(user => user.name === username)){
        return{success:false,  message:"username already exists!" };

    }

    const newUser = { 
        _id: Math.random().toString(36).substr(2, 5), /// gerneratting a random id
        username,
        password,
        fullname,
        CreatedAt: Date.now(),
        updatedAt: Date.now(),
    };
    dispatch({
        type:"SIGNUP", 
        payload: newUser

    });
    dispatch({
        type:"ADD_ACTIVITY",
        payload:{date: new Date().toLocaleString(), action:"🆕 Signed Up",name: newUser.username}
    });

    return{success:true, message:"User Registered successfully!" };
  }




// logout FUNCTION
export const logout = () => (dispatch, getState) => {
    const user = getState().auth.user;

    if(user){
        dispatch({
            type:"ADD_ACTIVITY",
            payload:{date: new Date().toLocaleString(), action: "🔒 Logged Out",name: user.username}
        });
    }
    dispatch({type: "LOGOUT"});
};

  

  export const updateBalance = (amount) => ({
    type:"UPDATE_BALANCE",
    payload:amount
  });

  export const addActivity = (activity, taskName) => (dispatch, getState) =>{
    const currentLog = getState().auth.activityLog || [];

    const newEntry = {
        date: new Date().toLocaleString(),
        action: activity,
        name: taskName || "Unknown Task",

    };

    //  Prevent unnecessary logs  checks if there is simular log if not only then creates a new save
    if(!currentLog.includes(activity)){
        const updatedLog = [...currentLog, newEntry];
        localStorage.setItem("activityLog", JSON.stringify(updatedLog));
        dispatch({type:"ADD_ACTIVITY", payload:activity})

    }

  }
  
  export const updateProfile = (updatedUserData) => (dispatch, getState) => {
    const currentState = getState().auth.user;

    //  Prevent unnecessary updates  checks if there is simular keys if not only then creates a new save
    const isDifferent = Object.keys(updatedUserData).some(
        key => updatedUserData[key] !== currentState[key]
    );

    if(isDifferent){
        const updatedUser = {...currentState, ...updatedUserData};
        localStorage.setItem('user', JSON.stringify(updatedUser));
        dispatch({type:'UPDATE_PROFILE', payload: updatedUser})

        dispatch({
            type:"ADD_ACTIVITY",
            payload: { date: new Date().toLocaleString(), action: "⚙️ Updated Profile", name: updatedUser.username }
        })
    }
    
};


export const clearActivitys = () => (dispatch) => {
    localStorage.removeItem("activityLog");
    dispatch({ type: "CLEAR_ACTIVITY" });
};
