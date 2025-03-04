import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../actions/authActions";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // ✅ Handles the signup process
    const handleSignup = async (e) => {
        e.preventDefault();

        if (!fullname || !username || !password || !confirmPassword) {
            setError("⚠️ All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            setError("⚠️ Passwords do not match!");
            return;
        }

        try {
            const res = await dispatch(signUp(username, password, fullname));

            if (res.success) {
                setError(""); // Clear error if successful
                navigate("/login"); // Redirect to login
            } else {
                setError(res.message); // Show error message
            }
        } catch (err) {
            setError("❌ Something went wrong. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <h2>📝 Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={fullname} 
                    onChange={(e) => setFullname(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                />

                {error && <p className="error-message">{error}</p>}

                <button type="submit">🆕 Sign Up</button>
            </form>

            <p>
                Already have an account? 
                <Link to="/login" className="auth-link"> Login</Link>
            </p>
        </div>
    );
};

export default Signup;
