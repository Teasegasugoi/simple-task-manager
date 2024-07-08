import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

export const fetchUsers = async () => {
    const response = await axios.get(`${backendUrl}/api/users`);
    return response.data.users;
}

export const addUser = async (newUser) => {
    const response = await axios.post(`${backendUrl}/api/users`, newUser);
    return response.data.user;
};
