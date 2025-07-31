import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Auth/LoginPage.css';

const API_BASE_URL = 'http://localhost:8080/api/users';

const LoginPage = ({ onLogin, resetTrigger }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setUsername('');
        setEmail('');
        setPassword('');
        setMessage('');
    }, [isRegistering, resetTrigger]);

    const handleAuth = async (e) => {
        e.preventDefault();
        setMessage('');

        if (isRegistering) {
            try {
                const newUser = { username, email, password };
                const response = await axios.post(API_BASE_URL, newUser);
                console.log('Registration successful:', response.data);
                setMessage('Registration successful! Please log in.');
                setIsRegistering(false);
            } catch (error) {
                console.error('Registration failed:', error.response ? error.response.data : error.message);
                if (error.response && error.response.status === 409) {
                    setMessage('Registration failed: Username or Email already exists.');
                } else {
                    setMessage('Registration failed. Please try again.');
                }
            }
        } else {
            try {
                const response = await axios.get(API_BASE_URL);
                const users = response.data;
                const foundUser = users.find(user =>
                    (user.username === username || user.email === username) && user.password === password
                );

                if (foundUser) {
                    console.log('Login successful:', foundUser);
                    onLogin();
                    navigate('/home');
                } else {
                    setMessage('Login failed: Invalid username/email or password.');
                }
            } catch (error) {
                console.error('Login failed:', error.response ? error.response.data : error.message);
                setMessage('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleAuth} className="login-form">
                <h2>{isRegistering ? 'Sign Up' : 'Sign In'}</h2>
                {message && <p className={`auth-message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </div>
                {isRegistering && (
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required={isRegistering}
                            autoComplete="off"
                        />
                    </div>
                )}
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </div>
                <button type="submit" className="login-button">
                    {isRegistering ? 'Sign Up' : 'Sign In'}
                </button>
                <p className="toggle-auth-mode">
                    {isRegistering ? (
                        <>Already have an account? <span onClick={() => setIsRegistering(false)} style={{ cursor: 'pointer', color: '#007bff' }}>Sign In</span></>
                    ) : (
                        <>Don't have an account? <span onClick={() => setIsRegistering(true)} style={{ cursor: 'pointer', color: '#007bff' }}>Sign Up</span></>
                    )}
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
