import { API_BASE_URL } from './apiConstants';

const USER_POINTS_API_URL = `${API_BASE_URL}/user-points`;

const userPointsService = {
    getAllUserPoints: async () => {
        const response = await fetch(USER_POINTS_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    getUserPointsById: async (id) => {
        const response = await fetch(`${USER_POINTS_API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    createUserPoints: async (userPoints) => {
        const response = await fetch(USER_POINTS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userPoints),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    updateUserPoints: async (id, userPoints) => {
        const response = await fetch(`${USER_POINTS_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userPoints),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    deleteUserPoints: async (id) => {
        const response = await fetch(`${USER_POINTS_API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    },
};

export default userPointsService;