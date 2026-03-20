import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getMatches = () => api.get('/matches');
export const getMatch = (id) => api.get(`/matches/${id}`);
export const createMatch = (data) => api.post('/matches', data);
export const updateScore = (id, data) => api.post(`/matches/${id}/events`, data);
export const undoScore = (id) => api.post(`/matches/${id}/undo`);
export const createTournament = (data) => api.post('/tournaments', data);

// Club Endpoints
export const getClubs = () => api.get('/clubs');
export const getClub = (id) => api.get(`/clubs/${id}`);
export const createClub = (data) => api.post('/clubs', data);

// AI Endpoints
export const parseReport = (formData) => api.post('/ai/parse-report', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export default api;
