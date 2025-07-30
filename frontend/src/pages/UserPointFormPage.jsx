import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userPointsService from '../services/userPointsService';
import userService from '../services/userService'; // To list users for selection

const UserPointFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userPoint, setUserPoint] = useState({
        user_id: null, // This will store the user object, or just the ID for sending
        totalPoints: 0,
        pointsEarned: 0,
        pointsSpent: 0,
    });
    const [users, setUsers] = useState([]); // For dropdown of users
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    const isEditMode = id !== undefined;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedUsers = await userService.getAllUsers();
                setUsers(fetchedUsers);

                if (isEditMode) {
                    const data = await userPointsService.getUserPointsById(id);
                    // Ensure user_id is the full user object if backend expects it this way for display,
                    // or just set user_id to the ID for form selection
                    setUserPoint({
                        ...data,
                        user_id: data.user_id ? data.user_id.id : '', // Set ID for dropdown selection
                    });
                }
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError("Failed to load data for form. " + (err.message || "Please try again."));
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserPoint((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage('');

        try {
            // Find the selected user object from the fetched users list
            const selectedUser = users.find(u => String(u.id) === String(userPoint.user_id));
            if (!selectedUser) {
                throw new Error("Please select a valid user.");
            }

            // Backend expects 'user_id' as a User object, not just an ID
            const userPointToSend = {
                ...userPoint,
                user_id: selectedUser,
                totalPoints: parseInt(userPoint.totalPoints, 10),
                pointsEarned: parseInt(userPoint.pointsEarned, 10),
                pointsSpent: parseInt(userPoint.pointsSpent, 10),
            };

            if (isEditMode) {
                await userPointsService.updateUserPoints(id, userPointToSend);
                setMessage('User points updated successfully!');
            } else {
                await userPointsService.createUserPoints(userPointToSend);
                setMessage('User points created successfully!');
                setUserPoint({ user_id: '', totalPoints: 0, pointsEarned: 0, pointsSpent: 0 }); // Clear form
            }
            setTimeout(() => navigate('/user-points'), 1500);
        } catch (err) {
            console.error("Failed to save user points:", err);
            setError("Failed to save user points. " + (err.message || "Please ensure all fields are valid."));
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="main-content-wrapper">Loading form data...</div>;
    if (error) return <div className="main-content-wrapper message error">Error: {error}</div>;

    return (
        <div className="form-container">
            <div className="page-header">
                <h1>{isEditMode ? 'Edit User Points' : 'Add New User Points'}</h1>
                <button className="back-button" onClick={() => navigate('/user-points')}>Back to User Points</button>
            </div>

            {message && <div className="message success">{message}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="user_id">User:</label>
                    <select
                        id="user_id"
                        name="user_id"
                        value={userPoint.user_id || ''}
                        onChange={handleChange}
                        required
                        disabled={isEditMode && userPoint.user_id !== null} // Disable user selection in edit mode if already set
                    >
                        <option value="">Select a User</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username} (ID: {user.id})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="totalPoints">Total Points:</label>
                    <input
                        type="number"
                        id="totalPoints"
                        name="totalPoints"
                        value={userPoint.totalPoints}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pointsEarned">Points Earned:</label>
                    <input
                        type="number"
                        id="pointsEarned"
                        name="pointsEarned"
                        value={userPoint.pointsEarned}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pointsSpent">Points Spent:</label>
                    <input
                        type="number"
                        id="pointsSpent"
                        name="pointsSpent"
                        value={userPoint.pointsSpent}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : (isEditMode ? 'Update User Points' : 'Create User Points')}
                    </button>
                    <button type="button" className="btn-secondary" onClick={() => navigate('/user-points')} disabled={loading}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserPointFormPage;