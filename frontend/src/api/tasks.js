import axios from 'axios';
import { getUserId } from '../utils/utils';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

export const fetchTasks = async (userId) => {
    const response = await axios.get(`${backendUrl}/api/tasks`, {
        params: { user_id: userId },
    });
    return response.data.tasks;
};

export const addTask = async (userId, newTask) => {
    const response = await axios.post(`${backendUrl}/api/tasks`, { ...newTask, user_id: userId });
    return response.data.task;
};

export const editTask = async (updatedTask) => {
    const response = await axios.put(`${backendUrl}/api/tasks/${updatedTask.id}`, { ...updatedTask });
    return response.data.task;
};

export const deleteTask = async (taskId) => {
    await axios.delete(`${backendUrl}/api/tasks/${taskId}`);
};
