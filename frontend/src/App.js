import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import DeleteTaskModal from './components/DeleteTaskModal';
import TaskDetailModal from './components/TaskDetailModal';
import { fetchTasks, addTask, editTask, deleteTask } from './api/tasks';
import useModal from './hooks/useModal';

function App() {

    // Tasks
    const [tasks, setTasks] = useState([]);
    const [detailTask, setDetailTask] = useState(null);

    // Modal
    const [isAddOpen, openAddModal, closeAddModal] = useModal();
    const [isDeleteOpen, openDeleteModal, closeDeleteModal] = useModal();
    const [isDetailOpen, openDetailModal, closeDetailModal] = useModal();

    // Load tasks
    const loadTasks = useCallback(async () => {
        try {
            const tasks = await fetchTasks();
            setTasks(tasks);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    // タスク追加
    const handleSaveAdd = async (newTask) => {
        try {
            const addedTask = await addTask(newTask);
            setTasks([...tasks, addedTask]);
        } catch (error) {
            console.error(error);
        }
        closeAddModal();
    };

    // 詳細画面での編集
    const handleSaveDetailEdit = async (updatedTask) => {
        try {
            const editedTask = await editTask(updatedTask);
            setTasks(tasks.map(task => task.id === updatedTask.id ? editedTask : task));
            setDetailTask(editedTask);
        } catch (error) {
            console.error(error);
        }
        closeDetailModal();
    };

    // 詳細画面でのタスク削除
    const handleConfirmDelete = async () => {
        try {
            await deleteTask(detailTask.id);
            setTasks(tasks.filter(task => task.id !== detailTask.id));
        } catch (error) {
            console.error(error);
        }
        closeDeleteModal();
    };


    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        マイタスク
                    </Typography>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ ml: 2 }} onClick={openAddModal}>
                        Add Task
                    </Button>
                </Box>
                <TaskList tasks={tasks} onDetail={(task) => { setDetailTask(task); openDetailModal(); }} />
                <AddTaskModal open={isAddOpen} handleClose={closeAddModal} handleSave={handleSaveAdd} />
                <DeleteTaskModal
                    open={isDeleteOpen}
                    handleClose={closeDeleteModal}
                    handleConfirm={handleConfirmDelete}
                    task={detailTask}
                />
                <TaskDetailModal
                    open={isDetailOpen}
                    handleClose={closeDetailModal}
                    handleEdit={handleSaveDetailEdit}
                    handleDelete={() => {
                        openDeleteModal();
                        closeDetailModal();
                    }}
                    task={detailTask}
                />
            </Box>
        </Container>
    );
}

export default App;
