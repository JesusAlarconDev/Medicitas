const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3005';

export const api = {
  baseUrl: API_BASE_URL,
  endpoints: {
    auth: {
      login: `${API_BASE_URL}/api/auth/login`,
      register: `${API_BASE_URL}/api/auth/register`,
      profile: `${API_BASE_URL}/api/auth/profile`,
    },
    users: {
      appointments: (userId) => `${API_BASE_URL}/api/users/${userId}/appointments`,
    },
    reservations: {
      base: `${API_BASE_URL}/api/reservations`,
      byId: (id) => `${API_BASE_URL}/api/reservations/${id}`,
    },
    admin: {
      timeBlocks: `${API_BASE_URL}/api/admin/time-blocks`,
    },
  },
};

export default api;
