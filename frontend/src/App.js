import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import EditTaskModal from './components/EditTaskModal';
import DeleteTaskModal from './components/DeleteTaskModal';
import TaskDetailModal from './components/TaskDetailModal';
import { getUserId } from './utils/utils';
import axios from 'axios';

function App() {
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [deletingTask, setDeletingTask] = useState(null);
    const [detailTask, setDetailTask] = useState(null);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

    const fetchTasks = useCallback(async () => {
        const userId = getUserId();
        try {
            const response = await axios.get(`${backendUrl}/api/tasks`, {
                params: { user_id: userId },
            });
            setTasks(response.data.tasks);
        } catch (error) {
            console.error(error);
        }
    }, [backendUrl]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const handleOpenEdit = (task) => {
        setEditingTask(task);
        setOpenEdit(true);
    };
    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpenDelete = (task) => {
        setDeletingTask(task);
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setDeletingTask(null);
        setOpenDelete(false);
    };

    const handleOpenDetail = (task) => {
        setDetailTask(task);
        setOpenDetail(true);
    };
    const handleCloseDetail = () => {
        setDetailTask(null);
        setOpenDetail(false);
    };

    const handleSaveAdd = async (newTask) => {
        const userId = getUserId();
        try {
            const response = await axios.post(`${backendUrl}/api/tasks`, { ...newTask, user_id: userId });
            setTasks([...tasks, response.data.task]);
        } catch (error) {
            console.error(error);
        }
        handleCloseAdd();
    };

    const handleSaveEdit = async (updatedTask) => {
        const userId = getUserId();
        try {
            const response = await axios.put(`${backendUrl}/api/tasks/${updatedTask.id}`, { ...updatedTask, user_id: userId });
            setTasks(tasks.map(task => task.id === updatedTask.id ? response.data.task : task));
        } catch (error) {
            console.error(error);
        }
        handleCloseEdit();
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`${backendUrl}/api/tasks/${deletingTask.id}`);
            setTasks(tasks.filter(task => task.id !== deletingTask.id));
        } catch (error) {
            console.error(error);
        }
        handleCloseDelete();
        handleCloseDetail();
    };

    const handleToggleComplete = (taskId, completed) => {
        const updatedTask = tasks.find(task => task.id === taskId);
        if (updatedTask) {
            const updatedTasks = tasks.map(task =>
                task.id === taskId ? { ...task, completed } : task
            );
            setTasks(updatedTasks);
            updatedTask.completed = completed;
            handleSaveEdit(updatedTask);
        }
    };

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        マイタスク
                    </Typography>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ ml: 2 }} onClick={handleOpenAdd}>
                        Add Task
                    </Button>
                </Box>
                <TaskList tasks={tasks} onEdit={handleOpenEdit} onDelete={handleOpenDelete} onDetail={handleOpenDetail} />
                <AddTaskModal open={openAdd} handleClose={handleCloseAdd} handleSave={handleSaveAdd} />
                <EditTaskModal open={openEdit} handleClose={handleCloseEdit} handleSave={handleSaveEdit} task={editingTask} />
                <DeleteTaskModal open={openDelete} handleClose={handleCloseDelete} handleConfirm={handleConfirmDelete} task={deletingTask} />
                <TaskDetailModal
                    open={openDetail}
                    handleClose={handleCloseDetail}
                    handleEdit={() => {
                        handleOpenEdit(detailTask);
                        handleCloseDetail();
                    }}
                    handleDelete={() => {
                        handleOpenDelete(detailTask);
                        handleCloseDetail();
                    }}
                    task={detailTask}
                    onToggleComplete={handleToggleComplete}
                />
            </Box>
        </Container>
    );
}

export default App;
