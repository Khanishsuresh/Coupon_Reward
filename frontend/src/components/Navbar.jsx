import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                ✨ CouponReward
            </Link>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/users" className="nav-link">
                        Users
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/user-points" className="nav-link">
                        User Points
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/coupons" className="nav-link">
                        Coupons
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/rewards" className="nav-link">
                        Rewards
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;