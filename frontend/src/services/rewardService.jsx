import { API_BASE_URL } from './apiConstants';

const REWARD_API_URL = `${API_BASE_URL}/rewards`;

const rewardService = {
    getAllRewards: async () => {
        const response = await fetch(REWARD_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    getRewardById: async (id) => {
        const response = await fetch(`${REWARD_API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    createReward: async (reward) => {
        const response = await fetch(REWARD_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reward),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    updateReward: async (id, reward) => {
        const response = await fetch(`${REWARD_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reward),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    deleteReward: async (id) => {
        const response = await fetch(`${REWARD_API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    },
};

export default rewardService;