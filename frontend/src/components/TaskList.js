import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

const TaskList = ({ tasks, onDetail }) => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const todayTasks = tasks.filter(task => task.due_date === today && !task.completed);
    const tomorrowTasks = tasks.filter(task => task.due_date === tomorrow && !task.completed);
    const nextSevenDaysTasks = tasks.filter(task => task.due_date > tomorrow && task.due_date <= nextWeek && !task.completed);
    const noDueDateTasks = tasks.filter(task => task.due_date === "0001-01-01T00:00:00Z" && !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    const renderTaskSection = (title, taskList) => (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>{title}</Typography>
            <Grid container spacing={2}>
                {taskList.map(task => (
                    <Grid item xs={12} key={task.id}>
                        <Paper
                            sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                            onClick={() => onDetail(task)}
                        >
                            <Box>
                                <Typography variant="h6">{task.title}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2" color="textSecondary">{task.due_date}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    return (
        <Box>
            {renderTaskSection("No Due Date", noDueDateTasks)}
            {renderTaskSection("Today", todayTasks)}
            {renderTaskSection("Tomorrow", tomorrowTasks)}
            {renderTaskSection("Next 7 Days", nextSevenDaysTasks)}
            {renderTaskSection("Completed", completedTasks)}
        </Box>
    );
};

export default TaskList;
