import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material';
import DatePickerComponent from '../DatePickerComponent';
import dayjs from 'dayjs';

const AddTaskModal = ({ open, handleClose, handleSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(null);

    const handleSubmit = () => {
        const newTask = {
            title,
            description,
            due_date: dueDate ? dayjs(dueDate).toISOString() : null,
        };
        handleSave(newTask);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>新しいタスクを追加</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="タスク名"
                            variant="outlined"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="説明"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DatePickerComponent
                            label="期日"
                            value={dueDate ? dayjs(dueDate) : null}
                            onChange={(newValue) => setDueDate(newValue ? dayjs(newValue).toISOString() : null)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">キャンセル</Button>
                <Button onClick={handleSubmit} color="primary">追加</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddTaskModal;
