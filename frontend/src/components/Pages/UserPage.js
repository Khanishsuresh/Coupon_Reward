import React, { useState, useEffect } from 'react';
import Navbar from '../Shared/Navbar';
import axios from 'axios';
import '../../styles/Pages/UserPage.css';

const API_BASE_URL = 'http://localhost:8080/api/users';

const UsersPage = ({ onLogout }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(API_BASE_URL);
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Failed to load users. Please try again.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div>
                <Navbar onLogout={onLogout} />
                <div className="users-container">
                    <p>Loading users...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Navbar onLogout={onLogout} />
                <div className="users-container">
                    <p className="error-message">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar onLogout={onLogout} />
            <div className="users-container">
                <h1 className="page-title">User Management</h1>
                {users.length > 0 ? (
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default UsersPage;