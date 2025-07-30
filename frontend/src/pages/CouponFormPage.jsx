import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import couponService from '../services/couponService';

const CouponFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState({
        couponCode: '',
        discountAmount: 0,
        minimumOrderAmount: 0,
        validTill: '', // YYYY-MM-DD format
        isValid: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    const isEditMode = id !== undefined;

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            const fetchCoupon = async () => {
                try {
                    const data = await couponService.getCouponById(id);
                    setCoupon(data);
                } catch (err) {
                    console.error("Failed to fetch coupon:", err);
                    setError("Failed to load coupon data. " + (err.message || "Please try again."));
                } finally {
                    setLoading(false);
                }
            };
            fetchCoupon();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCoupon((prev) => ({
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
            const couponToSend = {
                ...coupon,
                discountAmount: parseInt(coupon.discountAmount, 10),
                minimumOrderAmount: parseInt(coupon.minimumOrderAmount, 10),
                // validTill should already be in YYYY-MM-DD if using input type="date"
            };

            if (isEditMode) {
                await couponService.updateCoupon(id, couponToSend);
                setMessage('Coupon updated successfully!');
            } else {
                await couponService.createCoupon(couponToSend);
                setMessage('Coupon created successfully!');
                setCoupon({ couponCode: '', discountAmount: 0, minimumOrderAmount: 0, validTill: '', isValid: true }); // Clear form
            }
            setTimeout(() => navigate('/coupons'), 1500);
        } catch (err) {
            console.error("Failed to save coupon:", err);
            setError("Failed to save coupon. " + (err.message || "Please ensure all fields are valid."));
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <div className="main-content-wrapper">Loading coupon data...</div>;
    if (error) return <div className="main-content-wrapper message error">Error: {error}</div>;

    return (
        <div className="form-container">
            <div className="page-header">
                <h1>{isEditMode ? 'Edit Coupon' : 'Add New Coupon'}</h1>
                <button className="back-button" onClick={() => navigate('/coupons')}>Back to Coupons</button>
            </div>

            {message && <div className="message success">{message}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="couponCode">Coupon Code:</label>
                    <input
                        type="text"
                        id="couponCode"
                        name="couponCode"
                        value={coupon.couponCode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="discountAmount">Discount Amount:</label>
                    <input
                        type="number"
                        id="discountAmount"
                        name="discountAmount"
                        value={coupon.discountAmount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="minimumOrderAmount">Minimum Order Amount:</label>
                    <input
                        type="number"
                        id="minimumOrderAmount"
                        name="minimumOrderAmount"
                        value={coupon.minimumOrderAmount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="validTill">Valid Till:</label>
                    <input
                        type="date"
                        id="validTill"
                        name="validTill"
                        value={coupon.validTill}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="checkbox"
                        id="isValid"
                        name="isValid"
                        checked={coupon.isValid}
                        onChange={handleChange}
                    />
                    <label htmlFor="isValid">Is Valid</label>
                </div>
                <div className="form-actions">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : (isEditMode ? 'Update Coupon' : 'Create Coupon')}
                    </button>
                    <button type="button" className="btn-secondary" onClick={() => navigate('/coupons')} disabled={loading}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CouponFormPage;