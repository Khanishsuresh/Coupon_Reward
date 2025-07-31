import React, { useState, useEffect } from 'react';
import Navbar from '../Shared/Navbar';
import '../../styles/Pages/HomePage.css';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const HomePage = ({ onLogout }) => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [activeCoupons, setActiveCoupons] = useState(0);
    const [activeRewards, setActiveRewards] = useState(0);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get(`${API_BASE_URL}/users`);
                const allUsers = usersResponse.data;
                setTotalUsers(allUsers.length);

                const couponsResponse = await axios.get(`${API_BASE_URL}/coupons`);
                const activeAndValidCoupons = couponsResponse.data.filter(coupon =>
                    coupon.isValid && new Date(coupon.validTill) >= new Date()
                );
                setActiveCoupons(activeAndValidCoupons.length);

                const rewardsResponse = await axios.get(`${API_BASE_URL}/rewards`);
                const activeRewardsCount = rewardsResponse.data.filter(reward => reward.isActive).length;
                setActiveRewards(activeRewardsCount);

                const userPointsResponse = await axios.get(`${API_BASE_URL}/user-points`);
                const allUserPoints = userPointsResponse.data;

                const combinedLeaderboard = allUserPoints.map(up => {
                    const user = allUsers.find(u => u.id === up.user.id);
                    return {
                        username: user ? user.username : 'Unknown User',
                        totalPoints: up.totalPoints,
                        pointsEarned: up.pointsEarned,
                        pointsSpent: up.pointsSpent
                    };
                }).sort((a, b) => b.totalPoints - a.totalPoints);

                setLeaderboard(combinedLeaderboard);

                setLoading(false);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data. Please try again.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div>
                <Navbar onLogout={onLogout} />
                <div className="home-content">
                    <p>Loading dashboard data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Navbar onLogout={onLogout} />
                <div className="home-content">
                    <p className="error-message">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar onLogout={onLogout} />
            <div className="home-content">
                <h1 className="page-title">Coupon Reward Management</h1>

                <div className="summary-section">
                    <div className="summary-box">
                        <h3>Total Users</h3>
                        <p>{totalUsers}</p>
                    </div>
                    <div className="summary-box">
                        <h3>Active Coupons</h3>
                        <p>{activeCoupons}</p>
                    </div>
                    <div className="summary-box">
                        <h3>Active Rewards</h3>
                        <p>{activeRewards}</p>
                    </div>
                </div>

                <div className="leaderboard-section">
                    <h2>Leaderboard</h2>
                    {leaderboard.length > 0 ? (
                        <table className="leaderboard-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>User</th>
                                    <th>Total Points</th>
                                    <th>Points Earned</th>
                                    <th>Points Spent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map((entry, index) => (
                                    <tr key={entry.username || index}>
                                        <td>{index + 1}</td>
                                        <td>{entry.username}</td>
                                        <td>{entry.totalPoints}</td>
                                        <td>{entry.pointsEarned}</td>
                                        <td>{entry.pointsSpent}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No user points data available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;