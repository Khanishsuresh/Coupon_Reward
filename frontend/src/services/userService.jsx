import { API_BASE_URL } from './apiConstants';

const USER_API_URL = `${API_BASE_URL}/users`;

const userService = {
    getAllUsers: async () => {
        const response = await fetch(USER_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    getUserById: async (id) => {
        const response = await fetch(`${USER_API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    createUser: async (user) => {
        const response = await fetch(USER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    updateUser: async (id, user) => {
        const response = await fetch(`${USER_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    deleteUser: async (id) => {
        const response = await fetch(`${USER_API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // No content expected for successful DELETE
    },
};

export default userService;