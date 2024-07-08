import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ja');

const TaskList = ({ tasks, onDetail }) => {
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
    const allTasks = tasks.filter(task => !task.completed);

    const formatDate = (dateString) => {
        return dayjs(dateString).tz('Asia/Tokyo').format('M月D日');
    };

    const renderTaskSection = (title, taskList, show, toggleShow) => (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom sx={{ flexGrow: 1 }}>{title}</Typography>
                <IconButton onClick={toggleShow}>
                    {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Box>
            {show && (
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
            )}
        </Box>
    );

    return (
        <Box>
            {renderTaskSection("全て", allTasks, showAll, () => setShowAll(!showAll))}
            {renderTaskSection("期限なし", noDueDateTasks, showNoDueDate, () => setShowNoDueDate(!showNoDueDate))}
            {renderTaskSection("今日", todayTasks, showToday, () => setShowToday(!showToday))}
            {renderTaskSection("明日", tomorrowTasks, showTomorrow, () => setShowTomorrow(!showTomorrow))}
            {renderTaskSection("完了済み", completedTasks, showCompleted, () => setShowCompleted(!showCompleted))}
            {renderTaskSection("期限切れ", expiredTasks, showExpired, () => setShowExpired(!showExpired))}
        </Box>
    );
};

export default TaskList;
