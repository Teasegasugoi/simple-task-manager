import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import DatePickerComponent from '../DatePickerComponent';
import dayjs from 'dayjs';

const TaskDetailModal = ({ open, handleClose, handleEdit, handleDelete, task }) => {
    const [editedTask, setEditedTask] = useState(task || {});

    useEffect(() => {
        if (task) {
            setEditedTask(task);
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        setEditedTask({ ...editedTask, completed: e.target.checked });
    };

    const handleDateChange = (newValue) => {
        setEditedTask({ ...editedTask, due_date: newValue ? newValue.toISOString() : null });
    };

    const handleSaveChanges = () => {
        handleEdit(editedTask);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>
                タスク詳細
                <Button
                    edge="end"
                    color="inherit"
                    onClick={() => handleDelete(task)}
                    aria-label="delete"
                    sx={{ position: 'absolute', right: 16, top: 16 }}
                >
                    <DeleteIcon />
                </Button>
            </DialogTitle>
            <Box />
            <DialogContent>
                {task ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="タスク名"
                                variant="outlined"
                                fullWidth
                                name="title"
                                value={editedTask.title || ""}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="説明"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                name="description"
                                value={editedTask.description || ""}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DatePickerComponent
                                label="期日"
                                value={editedTask.due_date && editedTask.due_date != "0001-01-01T00:00:00Z" ? dayjs(editedTask.due_date) : null}
                                onChange={handleDateChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!!editedTask.completed}
                                        onChange={handleCheckboxChange}
                                        color="primary"
                                    />
                                }
                                label="完了"
                            />
                        </Grid>
                    </Grid>
                ) : (
                    <Typography>Loading...</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">閉じる</Button>
                <Button onClick={handleSaveChanges} color="primary" startIcon={<SaveIcon />}>保存</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskDetailModal;
