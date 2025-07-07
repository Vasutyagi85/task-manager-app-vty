
import React, { useState } from 'react';
import main from "../utils/signupimg.jpg";
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const userDetail = {
        name: "",
        email: "",
        password: ""
    };
    
    const [data, setData] = useState(userDetail);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const navigate = useNavigate();
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!data.name.trim()) {
            newErrors.name = "Name is required";
        } else if (data.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }
        
        if (!data.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = "Please enter a valid email";
        }
        
        if (!data.password) {
            newErrors.password = "Password is required";
        } else if (data.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleInput = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
        
        // Clear specific error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        
        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }
        
        try {
            const existingUsers = JSON.parse(localStorage.getItem("user") || "[]");
            
            // Check if user already exists
            const userExists = existingUsers.some(user => user.email === data.email);
            if (userExists) {
                alert("User with this email already exists!");
                setIsSubmitting(false);
                return;
            }
            
            // Add new user
            const updatedUsers = [...existingUsers, data];
            localStorage.setItem("user", JSON.stringify(updatedUsers));
            
            alert("Signup successful!");
            setData(userDetail); // Reset form
            navigate("/Login");
            
        } catch (error) {
            console.error("Signup error:", error);
            alert("An error occurred during signup. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div>
            <div className='main-page'>
                <form onSubmit={handleSubmit}>
                    <div className='heading'>
                        <p>Sign Up</p>
                    </div>
                    <div className='account'>
                        <div className='input-group'>
                            <input 
                                type='text' 
                                name='name' 
                                placeholder='Enter your Name' 
                                value={data.name}
                                onChange={handleInput}
                                className={errors.name ? 'error' : ''}
                                disabled={isSubmitting}
                            />
                            {errors.name && <span className='error-message'>{errors.name}</span>}
                        </div>
                        
                        <div className='input-group'>
                            <input 
                                type='email' 
                                name='email' 
                                placeholder='Enter your Email'
                                value={data.email}
                                onChange={handleInput}
                                className={errors.email ? 'error' : ''}
                                disabled={isSubmitting}
                            />
                            {errors.email && <span className='error-message'>{errors.email}</span>}
                        </div>
                        
                        <div className='input-group'>
                            <input 
                                type='password' 
                                name='password' 
                                placeholder='Enter your Password'
                                value={data.password}
                                onChange={handleInput}
                                className={errors.password ? 'error' : ''}
                                disabled={isSubmitting}
                            />
                            {errors.password && <span className='error-message'>{errors.password}</span>}
                        </div>
                        
                        <p>
                            Already have an account ? 
                            <Link to='/Login'> Login</Link>
                        </p>
                    </div>
                    <button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Signing up...' : 'Signup'}
                    </button>
                </form>
                <div>
                    <img src={main} alt='Signup illustration'/>
                </div>
            </div>
        </div>
    );
};

export default Signup;