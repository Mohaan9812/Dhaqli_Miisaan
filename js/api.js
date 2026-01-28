const API_URL = window.location.origin.includes('localhost')
    ? 'http://localhost:3000/api'
    : '/api';

const api = {
    // Auth
    register: async (email, password) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return response.json();
    },

    login: async (email, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return { ok: response.ok, ...data };
    },

    logout: () => {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    },

    getUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    },

    // Transactions
    getTransactions: async () => {
        const user = api.getUser();
        if (!user) return [];

        const response = await fetch(`${API_URL}/transactions`, {
            headers: { 'user-id': user.id }
        });
        return response.json();
    },

    addTransaction: async (data) => {
        const user = api.getUser();
        if (!user) return null;

        const response = await fetch(`${API_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-id': user.id
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
};
