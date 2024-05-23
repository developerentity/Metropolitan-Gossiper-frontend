'use client'

import * as React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { Trash } from '@phosphor-icons/react/dist/ssr';

type Props = {
    title: string,
    description: string,
    size?: 'small' | "medium"
    onDeleteCallback: () => void,
}

export default function DeleteButton({ title, description, onDeleteCallback, size = 'medium' }: Props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onApprove = () => {
        onDeleteCallback()
        handleClose()
    }

    return (
        <Box>
            <Button
                onClick={handleClickOpen}
                startIcon={<Trash size={24} />}
                variant="contained"
                sx={{ ml: 1 }}>
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="deletion dialog"
                aria-describedby="deletion description"
            >
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={onApprove}>Delete</Button>
                    <Button color="success" onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
}