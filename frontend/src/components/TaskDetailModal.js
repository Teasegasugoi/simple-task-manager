import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

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
                    onClick={handleDelete}
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
                                label="Task Name"
                                variant="outlined"
                                fullWidth
                                name="title"
                                value={editedTask.title || ""}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!!editedTask.completed}
                                        onChange={handleCheckboxChange}
                                        color="primary"
                                    />
                                }
                                label="Completion status"
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
