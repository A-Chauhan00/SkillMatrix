import API from './axios.js'; 

export const registerUser = async (userData) => {
  const response = await API.post('/user/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await API.post('/user/login', credentials);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await API.get('/user/profile');
  return response.data;
};

export const logoutUser=async()=>{
  const response = await API.post('/user/logout');
  return response.data;
}
