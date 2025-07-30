import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import UserFormPage from './pages/UserFormPage';
import UserPointsPage from './pages/UserPointsPage';
import UserPointFormPage from './pages/UserPointFormPage';
import CouponsPage from './pages/CouponsPage';
import CouponFormPage from './pages/CouponFormPage';
import RewardsPage from './pages/RewardsPage';
import RewardFormPage from './pages/RewardFormPage';
import './styles/General.css'; // General styles for page content

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content-wrapper"> {/* Wrapper for main content to apply padding/margin */}
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* User Routes */}
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/new" element={<UserFormPage />} />
          <Route path="/users/edit/:id" element={<UserFormPage />} />

          {/* UserPoints Routes */}
          <Route path="/user-points" element={<UserPointsPage />} />
          <Route path="/user-points/new" element={<UserPointFormPage />} />
          <Route path="/user-points/edit/:id" element={<UserPointFormPage />} />

          {/* Coupon Routes */}
          <Route path="/coupons" element={<CouponsPage />} />
          <Route path="/coupons/new" element={<CouponFormPage />} />
          <Route path="/coupons/edit/:id" element={<CouponFormPage />} />

          {/* Reward Routes */}
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/rewards/new" element={<RewardFormPage />} />
          <Route path="/rewards/edit/:id" element={<RewardFormPage />} />

          {/* Add a 404 Not Found Page later if desired */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;