import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userService from '../services/userService';

const UserFormPage = () => {
    const { id } = useParams(); // Get ID from URL for edit mode
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    const isEditMode = id !== undefined;

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            const fetchUser = async () => {
                try {
                    const data = await userService.getUserById(id);
                    setUser(data);
                } catch (err) {
                    console.error("Failed to fetch user:", err);
                    setError("Failed to load user data. " + (err.message || "Please try again."));
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage('');

        try {
            if (isEditMode) {
                await userService.updateUser(id, user);
                setMessage('User updated successfully!');
            } else {
                await userService.createUser(user);
                setMessage('User created successfully!');
                setUser({ username: '', email: '', password: '' }); // Clear form for new entry
            }
            setTimeout(() => navigate('/users'), 1500); // Redirect after a short delay
        } catch (err) {
            console.error("Failed to save user:", err);
            setError("Failed to save user. " + (err.message || "Please ensure all fields are valid."));
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <div className="main-content-wrapper">Loading user data...</div>;
    if (error) return <div className="main-content-wrapper message error">Error: {error}</div>;

    return (
        <div className="form-container">
            <div className="page-header">
                <h1>{isEditMode ? 'Edit User' : 'Add New User'}</h1>
                <button className="back-button" onClick={() => navigate('/users')}>Back to Users</button>
            </div>

            {message && <div className="message success">{message}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : (isEditMode ? 'Update User' : 'Create User')}
                    </button>
                    <button type="button" className="btn-secondary" onClick={() => navigate('/users')} disabled={loading}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserFormPage;