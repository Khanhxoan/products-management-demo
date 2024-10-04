import React from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const CustomDialog = ({ open, handleClose, dialogTitle, dialogContent, handleSubmit }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{dialogContent}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained">
                    No
                </Button>
                <Button onClick={handleSubmit} autoFocus variant="outlined">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomDialog;
