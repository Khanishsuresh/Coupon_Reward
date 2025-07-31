import React, { useState, useEffect } from 'react';
import Navbar from '../Shared/Navbar';
import axios from 'axios';
import '../../styles/Pages/RewardPage.css';

const API_BASE_URL = 'http://localhost:8080/api/rewards';

const RewardPage = ({ onLogout }) => {
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [currentReward, setCurrentReward] = useState(null);

    const [rewardCode, setRewardCode] = useState('');
    const [pointsRequired, setPointsRequired] = useState('');
    const [rewardValue, setRewardValue] = useState('');
    const [isActive, setIsActive] = useState(true);

    const fetchRewards = async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            const sortedRewards = response.data.sort((a, b) => b.id - a.id);
            setRewards(sortedRewards);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching rewards:', err);
            setError('Failed to load rewards. Please try again.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRewards();
    }, []);

    const resetForm = () => {
        setRewardCode('');
        setPointsRequired('');
        setRewardValue('');
        setIsActive(true);
        setCurrentReward(null);
        setShowForm(false);
    };

    const handleEdit = (reward) => {
        setCurrentReward(reward);
        setRewardCode(reward.rewardCode);
        setPointsRequired(reward.pointsRequired);
        setRewardValue(reward.rewardValue);
        setIsActive(reward.isActive);
        setShowForm(true);
    };

    const handleSubmitWithAlert = async (e) => {
        e.preventDefault();
        const rewardData = {
            rewardCode,
            pointsRequired: parseInt(pointsRequired, 10),
            rewardValue: parseInt(rewardValue, 10),
            isActive
        };

        try {
            if (currentReward) {
                await axios.put(`${API_BASE_URL}/${currentReward.id}`, rewardData);
                alert('Reward updated successfully!');
            } else {
                await axios.post(API_BASE_URL, rewardData);
                alert('Reward created successfully!');
            }
            fetchRewards();
            resetForm();
        } catch (err) {
            console.error('Error saving reward:', err.response ? err.response.data : err.message);
            alert('Failed to save reward: ' + (err.response && err.response.data.message ? err.response.data.message : 'Check console for details.'));
        }
    };
    
    const handleDeleteWithConfirm = async (id) => {
        if (window.confirm('Are you sure you want to delete this reward?')) {
            try {
                await axios.delete(`${API_BASE_URL}/${id}`);
                alert('Reward deleted successfully!');
                fetchRewards();
            } catch (err) {
                console.error('Error deleting reward:', err.response ? err.response.data : err.message);
                alert('Failed to delete reward: ' + (err.response && err.response.data.message ? err.response.data.message : 'Check console for details.'));
            }
        }
    };
    
    if (loading) {
        return (
            <div>
                <Navbar onLogout={onLogout} />
                <div className="page-container">
                    <p>Loading rewards...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Navbar onLogout={onLogout} />
                <div className="page-container">
                    <p className="error-message">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar onLogout={onLogout} />
            <div className="page-container">
                <h1 className="page-title">Rewards Management</h1>

                <button className="add-button" onClick={() => { resetForm(); setShowForm(true); }}>
                    Add New Reward
                </button>

                {showForm && (
                    <div className="form-section">
                        <h2>{currentReward ? 'Edit Reward' : 'Create New Reward'}</h2>
                        <form onSubmit={handleSubmitWithAlert} className="reward-form">
                            <div className="form-group">
                                <label>Reward Code:</label>
                                <input
                                    type="text"
                                    value={rewardCode}
                                    onChange={(e) => setRewardCode(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Points Required:</label>
                                <input
                                    type="number"
                                    value={pointsRequired}
                                    onChange={(e) => setPointsRequired(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Reward Value:</label>
                                <input
                                    type="number"
                                    value={rewardValue}
                                    onChange={(e) => setRewardValue(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group checkbox-group">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                />
                                <label htmlFor="isActive">Is Active</label>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="submit-button">
                                    {currentReward ? 'Update Reward' : 'Create Reward'}
                                </button>
                                <button type="button" className="cancel-button" onClick={resetForm}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="rewards-list-section">
                    <h2>All Rewards</h2>
                    {rewards.length > 0 ? (
                        <table className="rewards-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Code</th>
                                    <th>Points Required</th>
                                    <th>Value</th>
                                    <th>Active</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rewards.map(reward => (
                                    <tr key={reward.id}>
                                        <td>{reward.id}</td>
                                        <td>{reward.rewardCode}</td>
                                        <td>{reward.pointsRequired}</td>
                                        <td>{reward.rewardValue}</td>
                                        <td>{reward.isActive ? 'Yes' : 'No'}</td>
                                        <td className="actions-cell">
                                            <button className="edit-button" onClick={() => handleEdit(reward)}>Edit</button>
                                            <button className="delete-button" onClick={() => handleDeleteWithConfirm(reward.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No rewards found. Create one!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RewardPage;
