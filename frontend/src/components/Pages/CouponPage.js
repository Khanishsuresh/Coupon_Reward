import React, { useState, useEffect } from "react";
import Navbar from "../Shared/Navbar";
import axios from "axios";
import "../../styles/Pages/CouponPage.css";

const API_BASE_URL = "http://localhost:8080/api/coupons";

const CouponPage = ({ onLogout }) => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState(null);

  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [minimumOrderAmount, setMinimumOrderAmount] = useState("");
  const [validTill, setValidTill] = useState("");
  const [isValid, setIsValid] = useState(true);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      const sortedCoupons = response.data.sort((a, b) => b.id - a.id);
      setCoupons(sortedCoupons);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching coupons:", err);
      setError("Failed to load coupons. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const resetForm = () => {
    setCouponCode("");
    setDiscountAmount("");
    setMinimumOrderAmount("");
    setValidTill("");
    setIsValid(true);
    setCurrentCoupon(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const couponData = {
      couponCode,
      discountAmount: parseInt(discountAmount, 10),
      minimumOrderAmount: parseInt(minimumOrderAmount, 10),
      validTill,
      isValid,
    };

    try {
      if (currentCoupon) {
        await axios.put(`${API_BASE_URL}/${currentCoupon.id}`, couponData);
        alert("Coupon updated successfully!");
      } else {
        await axios.post(API_BASE_URL, couponData);
        alert("Coupon created successfully!");
      }
      fetchCoupons();
      resetForm();
    } catch (err) {
      console.error(
        "Error saving coupon:",
        err.response ? err.response.data : err.message
      );
      alert(
        "Failed to save coupon: " +
          (err.response && err.response.data.message
            ? err.response.data.message
            : "Check console for details.")
      );
    }
  };

  const handleEdit = (coupon) => {
    setCurrentCoupon(coupon);
    setCouponCode(coupon.couponCode);
    setDiscountAmount(coupon.discountAmount);
    setMinimumOrderAmount(coupon.minimumOrderAmount);
    setValidTill(coupon.validTill ? coupon.validTill.split("T")[0] : "");
    setIsValid(coupon.isValid);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        alert("Coupon deleted successfully!");
        fetchCoupons();
      } catch (err) {
        console.error(
          "Error deleting coupon:",
          err.response ? err.response.data : err.message
        );
        alert(
          "Failed to delete coupon: " +
            (err.response && err.response.data.message
              ? err.response.data.message
              : "Check console for details.")
        );
      }
    }
  };

  const handleDeleteWithConfirm = (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      handleDelete(id);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar onLogout={onLogout} />
        <div className="page-container">
          <p>Loading coupons...</p>
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
        <h1 className="page-title">Coupons Management</h1>

        <button
          className="add-button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          Add New Coupon
        </button>

        {showForm && (
          <div className="form-section">
            <h2>{currentCoupon ? "Edit Coupon" : "Create New Coupon"}</h2>
            <form onSubmit={handleSubmit} className="coupon-form">
              <div className="form-group">
                <label>Coupon Code:</label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Discount Amount:</label>
                <input
                  type="number"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Minimum Order Amount:</label>
                <input
                  type="number"
                  value={minimumOrderAmount}
                  onChange={(e) => setMinimumOrderAmount(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Valid Till:</label>
                <input
                  type="date"
                  value={validTill}
                  onChange={(e) => setValidTill(e.target.value)}
                  required
                />
              </div>
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="isValid"
                  checked={isValid}
                  onChange={(e) => setIsValid(e.target.checked)}
                />
                <label htmlFor="isValid">Is Valid</label>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-button">
                  {currentCoupon ? "Update Coupon" : "Create Coupon"}
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="coupons-list-section">
          <h2>All Coupons</h2>
          {coupons.length > 0 ? (
            <table className="coupons-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Code</th>
                  <th>Discount</th>
                  <th>Min Order</th>
                  <th>Valid Till</th>
                  <th>Valid</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id}>
                    <td>{coupon.id}</td>
                    <td>{coupon.couponCode}</td>
                    <td>{coupon.discountAmount}</td>
                    <td>{coupon.minimumOrderAmount}</td>
                    <td>{new Date(coupon.validTill).toLocaleDateString()}</td>
                    <td>{coupon.isValid ? "Yes" : "No"}</td>
                    <td className="actions-cell">
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(coupon)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteWithConfirm(coupon.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No coupons found. Create one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponPage;
