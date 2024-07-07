import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, Typography, Checkbox, FormControlLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskDetailModal = ({ open, handleClose, handleEdit, handleDelete, task, onToggleComplete }) => {
    if (!task) return null;

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Design task detail
                <Button
                    edge="end"
                    color="inherit"
                    onClick={handleEdit}
                    aria-label="edit"
                    sx={{ position: 'absolute', right: 16, top: 16 }}
                >
                    <EditIcon />
                </Button>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h6" gutterBottom>Details</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            value={task.title}
                            InputProps={{
                                readOnly: true,
                                style: { backgroundColor: '#f5f5f5' },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={task.description}
                            InputProps={{
                                readOnly: true,
                                style: { backgroundColor: '#f5f5f5' },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={task.completed}
                                    onChange={(e) => onToggleComplete(task.id, e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Completion status"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button onClick={handleDelete} color="primary" startIcon={<DeleteIcon />}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskDetailModal;
