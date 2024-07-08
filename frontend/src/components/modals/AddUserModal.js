import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const AddUserModal = ({ open, handleClose, handleSave }) => {
    const [userId, setUserId] = useState('');

    const handleSubmit = () => {
        handleSave({ user_id: userId });
        setUserId('');
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ width: 300, margin: 'auto', mt: 5, p: 2, backgroundColor: 'white', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                    ユーザーを追加
                </Typography>
                <TextField
                    fullWidth
                    label="ユーザーID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    margin="normal"
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        追加
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddUserModal;
