import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userPointsService from '../services/userPointsService';
import userService from '../services/userService'; // To fetch user details if needed

const UserPointsPage = () => {
    const [userPoints, setUserPoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const fetchUserPoints = async () => {
        try {
            const data = await userPointsService.getAllUserPoints();
            // If you need to display username instead of user_id, you'll need to fetch user details for each UserPoints object.
            // This is a simplified example; for large datasets, consider backend joins or caching.
            // For now, it will display user_id.id
            setUserPoints(data);
        } catch (err) {
            console.error("Failed to fetch user points:", err);
            setError("Failed to load user points. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserPoints();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user points entry?')) {
            try {
                await userPointsService.deleteUserPoints(id);
                setMessage('User points entry deleted successfully!');
                setUserPoints(userPoints.filter((entry) => entry.id !== id));
            } catch (err) {
                console.error("Failed to delete user points:", err);
                setError("Failed to delete user points. " + (err.message || "Please try again."));
            }
        }
    };

    if (loading) return <div className="main-content-wrapper">Loading user points...</div>;
    if (error) return <div className="main-content-wrapper message error">Error: {error}</div>;

    return (
        <div className="main-content-wrapper">
            <div className="page-header">
                <h1>User Points</h1>
                <button onClick={() => navigate('/user-points/new')}>Add New User Points</button>
            </div>

            {message && <div className="message success">{message}</div>}
            {userPoints.length === 0 ? (
                <div className="no-data-message">No user points entries found. Start by adding one!</div>
            ) : (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Total Points</th>
                            <th>Points Earned</th>
                            <th>Points Spent</th>
                            <th className="actions-column">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userPoints.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.id}</td>
                                <td>{entry.user_id ? entry.user_id.id : 'N/A'}</td> {/* Access user_id.id */}
                                <td>{entry.totalPoints}</td>
                                <td>{entry.pointsEarned}</td>
                                <td>{entry.pointsSpent}</td>
                                <td className="actions-column">
                                    <button onClick={() => navigate(`/user-points/edit/${entry.id}`)}>Edit</button>
                                    <button className="btn-danger" onClick={() => handleDelete(entry.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserPointsPage;