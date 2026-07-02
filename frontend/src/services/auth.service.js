import api from './api';

/**
 * Perform login requests.
 */
const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data; // StandardApiResponse shape: { success, message, data: { user, token } }
};

/**
 * Perform registration requests.
 */
const register = async (name, email, password, role) => {
  const response = await api.post('/auth/register', { name, email, password, role });
  return response.data;
};


/**
 * Fetch profile details of current logged-in session.
 */
const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export default {
  login,
  register,
  getMe,
};
