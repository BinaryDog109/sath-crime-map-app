import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const GoToPremiumAlert = ({open, setOpen}) => {
  
  const navigate = useNavigate()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Go premium to enable safe path calculation?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Premium users can enjoy the safe path calculation, ads prevention, and
          more!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>navigate("/price")}>Take me to Premium!</Button>
        <Button onClick={handleClose} autoFocus>
          Nah
        </Button>
      </DialogActions>
    </Dialog>
  );
};
