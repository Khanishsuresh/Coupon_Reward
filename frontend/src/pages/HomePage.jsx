import React from 'react';

const HomePage = () => {
    return (
        <div className="main-content-wrapper">
            <div className="page-header">
                <h1>Welcome to the Coupon Reward System!</h1>
            </div>
            <p>
                This is a full-stack application designed to manage users, their accumulated points, and various coupons and rewards.
                Explore the navigation bar to manage different aspects of the system.
            </p>
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                <button onClick={() => window.location.href = '/users'}>Manage Users</button>
                <button onClick={() => window.location.href = '/coupons'}>View Coupons</button>
                <button onClick={() => window.location.href = '/rewards'}>View Rewards</button>
            </div>
            <p style={{ marginTop: '3rem', textAlign: 'center', color: '#777' }}>
                Built with Spring Boot Backend and React Frontend.
            </p>
        </div>
    );
};

export default HomePage;