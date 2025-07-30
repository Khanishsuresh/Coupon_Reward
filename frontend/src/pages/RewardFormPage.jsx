import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import rewardService from '../services/rewardService';

const RewardFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reward, setReward] = useState({
        rewardCode: '',
        pointsRequired: 0,
        rewardValue: 0,
        isActive: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    const isEditMode = id !== undefined;

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            const fetchReward = async () => {
                try {
                    const data = await rewardService.getRewardById(id);
                    setReward(data);
                } catch (err) {
                    console.error("Failed to fetch reward:", err);
                    setError("Failed to load reward data. " + (err.message || "Please try again."));
                } finally {
                    setLoading(false);
                }
            };
            fetchReward();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setReward((prev) => ({
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
            const rewardToSend = {
                ...reward,
                pointsRequired: parseInt(reward.pointsRequired, 10),
                rewardValue: parseInt(reward.rewardValue, 10),
            };

            if (isEditMode) {
                await rewardService.updateReward(id, rewardToSend);
                setMessage('Reward updated successfully!');
            } else {
                await rewardService.createReward(rewardToSend);
                setMessage('Reward created successfully!');
                setReward({ rewardCode: '', pointsRequired: 0, rewardValue: 0, isActive: true }); // Clear form
            }
            setTimeout(() => navigate('/rewards'), 1500);
        } catch (err) {
            console.error("Failed to save reward:", err);
            setError("Failed to save reward. " + (err.message || "Please ensure all fields are valid."));
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <div className="main-content-wrapper">Loading reward data...</div>;
    if (error) return <div className="main-content-wrapper message error">Error: {error}</div>;

    return (
        <div className="form-container">
            <div className="page-header">
                <h1>{isEditMode ? 'Edit Reward' : 'Add New Reward'}</h1>
                <button className="back-button" onClick={() => navigate('/rewards')}>Back to Rewards</button>
            </div>

            {message && <div className="message success">{message}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="rewardCode">Reward Code:</label>
                    <input
                        type="text"
                        id="rewardCode"
                        name="rewardCode"
                        value={reward.rewardCode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pointsRequired">Points Required:</label>
                    <input
                        type="number"
                        id="pointsRequired"
                        name="pointsRequired"
                        value={reward.pointsRequired}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rewardValue">Reward Value:</label>
                    <input
                        type="number"
                        id="rewardValue"
                        name="rewardValue"
                        value={reward.rewardValue}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={reward.isActive}
                        onChange={handleChange}
                    />
                    <label htmlFor="isActive">Is Active</label>
                </div>
                <div className="form-actions">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : (isEditMode ? 'Update Reward' : 'Create Reward')}
                    </button>
                    <button type="button" className="btn-secondary" onClick={() => navigate('/rewards')} disabled={loading}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RewardFormPage;