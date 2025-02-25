import React, { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { login, logout } from '../actions/authActions';

const Login = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);

    const handleLogin = () => {
        if(username){
            dispatch(login({username}));
        }
    };


    return(
        <div>
            <h2>{isAuthenticated ? `Welcome ${user.username}` : "login"}</h2>
            {!isAuthenticated ? ( <>
            <input type="text" placeholder='Enter UserName' onChange={(e)=> setUsername(e.target.value)}/>
            <button onClick={handleLogin}>Login</button>
            </> ) : (
                <button onClick={() => dispatch(logout)}>Logout</button>
            )}
        </div>
    )
}

export default Login;

/* page where username can login or handle login and logout 
   prevnt empty logins, logout resets state
*/