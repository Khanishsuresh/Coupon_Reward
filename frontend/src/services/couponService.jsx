import { API_BASE_URL } from './apiConstants';

const COUPON_API_URL = `${API_BASE_URL}/coupons`;

const couponService = {
    getAllCoupons: async () => {
        const response = await fetch(COUPON_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    getCouponById: async (id) => {
        const response = await fetch(`${COUPON_API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    createCoupon: async (coupon) => {
        const response = await fetch(COUPON_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(coupon),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    updateCoupon: async (id, coupon) => {
        const response = await fetch(`${COUPON_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(coupon),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    deleteCoupon: async (id) => {
        const response = await fetch(`${COUPON_API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    },
};

export default couponService;