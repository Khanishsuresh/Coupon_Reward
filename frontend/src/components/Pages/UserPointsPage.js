import React, { useState, useEffect } from 'react';
import Navbar from '../Shared/Navbar';
import axios from 'axios';
import '../../styles/Pages/UserPointsPage.css';

const API_BASE_URL = 'http://localhost:8080/api';

const UserPointsPage = ({ onLogout }) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const usersResponse = await axios.get(`${API_BASE_URL}/users`);
                const allUsers = usersResponse.data;

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
                console.error('Error fetching leaderboard data:', err);
                setError('Failed to load leaderboard data. Please try again.');
                setLoading(false);
            }
        };

        fetchLeaderboardData();
    }, []);

    if (loading) {
        return (
            <div>
                <Navbar onLogout={onLogout} />
                <div className="page-container">
                    <p>Loading leaderboard...</p>
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
                <h1 className="page-title">User Points Leaderboard</h1>
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
    );
};

export default UserPointsPage;
