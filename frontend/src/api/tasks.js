import axios from 'axios';
import { getUserId } from '../utils/utils';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

export const fetchTasks = async () => {
    const userId = getUserId();
    const response = await axios.get(`${backendUrl}/api/tasks`, {
        params: { user_id: userId },
    });
    return response.data.tasks;
};

export const addTask = async (newTask) => {
    const userId = getUserId();
    const response = await axios.post(`${backendUrl}/api/tasks`, { ...newTask, user_id: userId });
    return response.data.task;
};

export const editTask = async (updatedTask) => {
    const userId = getUserId();
    const response = await axios.put(`${backendUrl}/api/tasks/${updatedTask.id}`, { ...updatedTask, user_id: userId });
    return response.data.task;
};

export const deleteTask = async (taskId) => {
    await axios.delete(`${backendUrl}/api/tasks/${taskId}`);
};
