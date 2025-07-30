import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        setMessage('User deleted successfully!');
        setUsers(users.filter((user) => user.id !== id));
      } catch (err) {
        console.error("Failed to delete user:", err);
        setError("Failed to delete user. " + (err.message || "Please try again."));
      }
    }
  };

  if (loading) return <div className="main-content-wrapper">Loading users...</div>;
  if (error) return <div className="main-content-wrapper message error">Error: {error}</div>;

  return (
    <div className="main-content-wrapper">
      <div className="page-header">
        <h1>Users</h1>
        <button onClick={() => navigate('/users/new')}>Add New User</button>
      </div>

      {message && <div className="message success">{message}</div>}
      {users.length === 0 ? (
        <div className="no-data-message">No users found. Start by adding a new user!</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th className="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td className="actions-column">
                  <button onClick={() => navigate(`/users/edit/${user.id}`)}>Edit</button>
                  <button className="btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersPage;