import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;
        
        if (name === "email") {
            setEmail(value);
        }
        if (name === "password") {
            setPassword(value);
        }
        
        // Clear error message when user starts typing
        if (msg) {
            setMsg("");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        
        // Validate input fields
        if (!email.trim() || !password.trim()) {
            setMsg("Please enter both email and password");
            setIsSubmitting(false);
            return;
        }

        // Validate email format
        if (!/\S+@\S+\.\S+/.test(email)) {
            setMsg("Please enter a valid email address");
            setIsSubmitting(false);
            return;
        }

        try {
            const storedUsers = JSON.parse(localStorage.getItem("user") || "[]");
            
            if (storedUsers.length === 0) {
                setMsg("No users found. Please sign up first.");
                setIsSubmitting(false);
                return;
            }

            // Find matching user
            const matchingUser = storedUsers.find(user => 
                user.email === email && user.password === password
            );

            if (matchingUser) {
                // Store current user session
                localStorage.setItem("currentUser", JSON.stringify(matchingUser));
                alert("Login successful!");
                navigate("/tasks"); // Changed from "/TaskForm" to "/tasks"
            } else {
                setMsg("Invalid email or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            setMsg("An error occurred during login. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className='login-container'>
                <form onSubmit={handleSubmit} className='login-form'>
                    <div className='heading'>
                        <p>Login</p>
                    </div>
                    
                    {msg && <p className='error-message'>{msg}</p>}
                    
                    <div className='account'>
                        <input 
                            type='email' 
                            name='email' 
                            placeholder='Enter your Email'
                            value={email}
                            onChange={handleInput}
                            disabled={isSubmitting}
                            required
                        />
                        <input 
                            type='password' 
                            name='password' 
                            placeholder='Enter your Password'
                            value={password}
                            onChange={handleInput}
                            disabled={isSubmitting}
                            required
                        />
                        <p>
                            Create account ? 
                            <Link to='/'> Signup</Link>
                        </p>
                    </div>
                    
                    <button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;