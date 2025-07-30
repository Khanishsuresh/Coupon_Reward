import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import rewardService from '../services/rewardService';

const RewardsPage = () => {
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const fetchRewards = async () => {
        try {
            const data = await rewardService.getAllRewards();
            setRewards(data);
        } catch (err) {
            console.error("Failed to fetch rewards:", err);
            setError("Failed to load rewards. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRewards();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this reward?')) {
            try {
                await rewardService.deleteReward(id);
                setMessage('Reward deleted successfully!');
                setRewards(rewards.filter((reward) => reward.id !== id));
            } catch (err) {
                console.error("Failed to delete reward:", err);
                setError("Failed to delete reward. " + (err.message || "Please try again."));
            }
        }
    };

    if (loading) return <div className="main-content-wrapper">Loading rewards...</div>;
    if (error) return <div className="main-content-wrapper message error">Error: {error}</div>;

    return (
        <div className="main-content-wrapper">
            <div className="page-header">
                <h1>Rewards</h1>
                <button onClick={() => navigate('/rewards/new')}>Add New Reward</button>
            </div>

            {message && <div className="message success">{message}</div>}
            {rewards.length === 0 ? (
                <div className="no-data-message">No rewards found. Start by adding a new reward!</div>
            ) : (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Code</th>
                            <th>Points Required</th>
                            <th>Value</th>
                            <th>Is Active</th>
                            <th className="actions-column">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rewards.map((reward) => (
                            <tr key={reward.id}>
                                <td>{reward.id}</td>
                                <td>{reward.rewardCode}</td>
                                <td>{reward.pointsRequired}</td>
                                <td>{reward.rewardValue}</td>
                                <td>{reward.isActive ? 'Yes' : 'No'}</td>
                                <td className="actions-column">
                                    <button onClick={() => navigate(`/rewards/edit/${reward.id}`)}>Edit</button>
                                    <button className="btn-danger" onClick={() => handleDelete(reward.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RewardsPage;