import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Shared/Navbar.css';

const Navbar = ({ onLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/home">
                    <span className="logo-icon" role="img" aria-label="coupon-icon">✨</span>
                    Coupon Reward App
                </Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/coupons">Coupons</Link></li>
                <li><Link to="/rewards">Rewards</Link></li>
                <li><Link to="/users">Users</Link></li>
                <li><Link to="/user-points">User Points</Link></li>
                <li><button onClick={onLogout} className="navbar-logout-btn">Logout</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;