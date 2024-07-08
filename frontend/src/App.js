import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Button, Box, Grid, Paper, List, ListItem, ListItemText, Avatar, Badge } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskList from './components/TaskList';
import AddTaskModal from './components/modals/AddTaskModal';
import DeleteTaskModal from './components/modals/DeleteTaskModal';
import TaskDetailModal from './components/modals/TaskDetailModal';
import { fetchTasks, addTask, editTask, deleteTask } from './api/tasks';
import useModal from './hooks/useModal';
import { getUserId } from './utils/utils';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ja');

function App() {
    const [userId, setUserId] = useState('');
    const [tasks, setTasks] = useState([]);
    const [detailTask, setDetailTask] = useState(null);
    const [isAddOpen, openAddModal, closeAddModal] = useModal();
    const [isDeleteOpen, openDeleteModal, closeDeleteModal] = useModal();
    const [isDetailOpen, openDetailModal, closeDetailModal] = useModal();
    const [currentView, setCurrentView] = useState('全て');

    const today = dayjs().tz('Asia/Tokyo').startOf('day').format('YYYY-MM-DD');
    const tomorrow = dayjs().tz('Asia/Tokyo').add(1, 'day').startOf('day').format('YYYY-MM-DD');

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
        setUserId(getUserId);
    }, [loadTasks]);

    const handleSaveAdd = async (newTask) => {
        try {
            const addedTask = await addTask(newTask);
            setTasks([...tasks, addedTask]);
        } catch (error) {
            console.error(error);
        }
        closeAddModal();
    };

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

    const handleConfirmDelete = async () => {
        try {
            await deleteTask(detailTask.id);
            setTasks(tasks.filter(task => task.id !== detailTask.id));
        } catch (error) {
            console.error(error);
        }
        closeDeleteModal();
    };

    const todayTasksCount = tasks.filter(task => task.due_date.startsWith(today) && !task.completed).length;
    const tomorrowTasksCount = tasks.filter(task => task.due_date.startsWith(tomorrow) && !task.completed).length;
    const noDueDateTasksCount = tasks.filter(task => task.due_date === "0001-01-01T00:00:00Z" && !task.completed).length;
    const completedTasksCount = tasks.filter(task => task.completed).length;
    const expiredTasksCount = tasks.filter(task => task.due_date < today && task.due_date !== "0001-01-01T00:00:00Z" && !task.completed).length;
    const allTasksCount = tasks.filter(task => !task.completed).length;

    return (
        <Grid container>
            <Grid item xs={3}>
                <Paper elevation={3} sx={{ height: '100vh'}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginX: 5, paddingY: 3}}>
                        <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}></Avatar>
                        <Typography variant="h6">{userId} さん</Typography>
                    </Box>
                    <List>
                        {[
                            { text: '全て', count: allTasksCount },
                            { text: '期限なし', count: noDueDateTasksCount },
                            { text: '今日', count: todayTasksCount },
                            { text: '明日', count: tomorrowTasksCount },
                            { text: '完了済み', count: completedTasksCount },
                            { text: '期限切れ', count: expiredTasksCount }
                        ].map(({ text, count }) => (
                            <ListItem
                                button
                                key={text}
                                onClick={() => setCurrentView(text)}
                                selected={currentView === text}
                                sx={{
                                    padding: '10px 16px',
                                    backgroundColor: currentView === text ? '#e0f7fa' : 'inherit',
                                    '&:hover': {
                                        backgroundColor: '#b2ebf2',
                                    },
                                    '& .MuiBadge-root': {
                                        marginLeft: 'auto'
                                    }
                                }}
                            >
                                <ListItemText primary={text} />
                                <Badge badgeContent={count} color="primary" sx={{ marginX: 3}}/>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <Container>
                    <Box sx={{ mt: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h4" gutterBottom>
                                {currentView}
                            </Typography>
                            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={openAddModal}>
                                タスクを追加
                            </Button>
                        </Box>
                        <TaskList
                            tasks={tasks}
                            onDetail={(task) => { setDetailTask(task); openDetailModal(); }}
                            currentView={currentView}
                        />
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
            </Grid>
        </Grid>
    );
}

export default App;
