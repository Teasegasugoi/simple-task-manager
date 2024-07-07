import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const DeleteTaskModal = ({ open, handleClose, handleConfirm, task }) => {
    if (!task) return null;

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogContent>
                <Typography>
                    "{task.title}" を削除しますか？
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">いいえ</Button>
                <Button onClick={handleConfirm} color="primary">はい</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteTaskModal;
