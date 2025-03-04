import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../actions/authActions';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);

    const handleLogin = () => {
        if (!username || !password) {
            setError("⚠️ Username and password are required!");
            return;
        }

        const result = dispatch(login(username, password));

        result.then(res => {
            if (res.success) {
                setError('');
                navigate('/tasks'); // Redirect to tasks after login
            } else {
                setError(res.message);
            }
        });
    };

    return (
        <div className="auth-container">
            <h2>{isAuthenticated ? `Welcome, ${user.username}` : "Login"}</h2>

            {!isAuthenticated ? (
                <>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="error-message">{error}</p>}

                    <button onClick={handleLogin}>🔓 Login</button>

                    <p>New user? <Link to="/signUp" className="auth-link">Sign up</Link></p>

                </>
            ) : (
                <>
                    <p>You're logged in as {user.username}</p>
                    <button onClick={() => dispatch(logout())}>🔒 Logout</button>
                </>
            )}
        </div>
    );
};

export default Login;
