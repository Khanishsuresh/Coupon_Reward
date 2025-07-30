import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import couponService from '../services/couponService';

const CouponsPage = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const fetchCoupons = async () => {
        try {
            const data = await couponService.getAllCoupons();
            setCoupons(data);
        } catch (err) {
            console.error("Failed to fetch coupons:", err);
            setError("Failed to load coupons. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this coupon?')) {
            try {
                await couponService.deleteCoupon(id);
                setMessage('Coupon deleted successfully!');
                setCoupons(coupons.filter((coupon) => coupon.id !== id));
            } catch (err) {
                console.error("Failed to delete coupon:", err);
                setError("Failed to delete coupon. " + (err.message || "Please try again."));
            }
        }
    };

    if (loading) return <div className="main-content-wrapper">Loading coupons...</div>;
    if (error) return <div className="main-content-wrapper message error">Error: {error}</div>;

    return (
        <div className="main-content-wrapper">
            <div className="page-header">
                <h1>Coupons</h1>
                <button onClick={() => navigate('/coupons/new')}>Add New Coupon</button>
            </div>

            {message && <div className="message success">{message}</div>}
            {coupons.length === 0 ? (
                <div className="no-data-message">No coupons found. Start by adding a new coupon!</div>
            ) : (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Code</th>
                            <th>Discount Amt</th>
                            <th>Min Order Amt</th>
                            <th>Valid Till</th>
                            <th>Is Valid</th>
                            <th className="actions-column">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((coupon) => (
                            <tr key={coupon.id}>
                                <td>{coupon.id}</td>
                                <td>{coupon.couponCode}</td>
                                <td>{coupon.discountAmount}</td>
                                <td>{coupon.minimumOrderAmount}</td>
                                <td>{coupon.validTill}</td>
                                <td>{coupon.isValid ? 'Yes' : 'No'}</td>
                                <td className="actions-column">
                                    <button onClick={() => navigate(`/coupons/edit/${coupon.id}`)}>Edit</button>
                                    <button className="btn-danger" onClick={() => handleDelete(coupon.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CouponsPage;