import React, { useState } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ja');

const TaskList = ({ tasks, onDetail, currentView }) => {
    const [showAll, setShowAll] = useState(true);
    const [showToday, setShowToday] = useState(true);
    const [showTomorrow, setShowTomorrow] = useState(true);
    const [showNoDueDate, setShowNoDueDate] = useState(true);
    const [showCompleted, setShowCompleted] = useState(true);
    const [showExpired, setShowExpired] = useState(true);

    const today = dayjs().tz('Asia/Tokyo').startOf('day').format('YYYY-MM-DD');
    const tomorrow = dayjs().tz('Asia/Tokyo').add(1, 'day').startOf('day').format('YYYY-MM-DD');

    const todayTasks = tasks.filter(task => task.due_date.startsWith(today) && !task.completed);
    const tomorrowTasks = tasks.filter(task => task.due_date.startsWith(tomorrow) && !task.completed);
    const noDueDateTasks = tasks.filter(task => task.due_date === "0001-01-01T00:00:00Z" && !task.completed);
    const completedTasks = tasks.filter(task => task.completed);
    const expiredTasks = tasks.filter(task => task.due_date < today && task.due_date !== "0001-01-01T00:00:00Z" && !task.completed);
    const allTasks = tasks;

    const formatDate = (dateString) => {
        return dayjs(dateString).tz('Asia/Tokyo').format('M月D日');
    };

    const renderTaskSection = (title, taskList, show, toggleShow) => (
        <Box sx={{ mb: 4 }}>
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
                                {task.due_date === "0001-01-01T00:00:00Z" ? (
                                    <Typography variant="body2" color="textSecondary">期限なし</Typography>
                                ) : (
                                    <Typography variant="body2" color="textSecondary">{formatDate(task.due_date)}</Typography>
                                )}
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    return (
        <Box>
            {currentView === '全て' && renderTaskSection("全て", allTasks, showAll, () => setShowAll(!showAll))}
            {currentView === '期限なし' && renderTaskSection("期限なし", noDueDateTasks, showNoDueDate, () => setShowNoDueDate(!showNoDueDate))}
            {currentView === '今日' && renderTaskSection("今日", todayTasks, showToday, () => setShowToday(!showToday))}
            {currentView === '明日' && renderTaskSection("明日", tomorrowTasks, showTomorrow, () => setShowTomorrow(!showTomorrow))}
            {currentView === '完了済み' && renderTaskSection("完了済み", completedTasks, showCompleted, () => setShowCompleted(!showCompleted))}
            {currentView === '期限切れ' && renderTaskSection("期限切れ", expiredTasks, showExpired, () => setShowExpired(!showExpired))}
        </Box>
    );
};

export default TaskList;
