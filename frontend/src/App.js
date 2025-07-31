import React, { useState } from "react";
import {BrowserRouter as Router,Routes,Route,Navigate,} from "react-router-dom";
import LoginPage from "./components/Auth/LoginPage";
import HomePage from "./components/Pages/HomePage";
import UsersPage from "./components/Pages/UserPage";
import CouponsPage from "./components/Pages/CouponPage";
import RewardsPage from "./components/Pages/RewardPage";
import UserPointsPage from "./components/Pages/UserPointsPage";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginFormResetTrigger, setLoginFormResetTrigger] = useState(0);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setLoginFormResetTrigger(0);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginFormResetTrigger((prev) => prev + 1);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <LoginPage
                onLogin={handleLogin}
                resetTrigger={loginFormResetTrigger}
              />
            )
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage
              onLogin={handleLogin}
              resetTrigger={loginFormResetTrigger}
            />
          }
        />
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <HomePage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/users"
          element={
            isAuthenticated ? (
              <UsersPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/coupons"
          element={
            isAuthenticated ? (
              <CouponsPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/rewards"
          element={
            isAuthenticated ? (
              <RewardsPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user-points"
          element={
            isAuthenticated ? (
              <UserPointsPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
