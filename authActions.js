export const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    return{type: "LOGIN", payload:userData};
};
export const logout = () => {
    console.log("Logout function executed!");
    localStorage.removeItem("user");
    return { type: "LOGOUT" };
    
};

  export const signUp = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    return{type:"SIGNUP", payload:userData};
  }

  export const updateBalance = (amount) => ({
    type:"UPDATE_BALANCE",
    payload:amount
  });

  export const addActivity = (activity) => ({
    type:"ADD_ACTIVITY",
    payload:activity
  });
  
  