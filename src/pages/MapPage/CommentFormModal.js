import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

export const CommentFormModal = ({ open, setOpen }) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {/* Render inside so that the click on the drawer will not close the drawer itself */}
      <Dialog disablePortal open={open} onClose={handleClose}>
        <DialogTitle>Have a say about this</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Inform or warn others of this area...
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="comment-title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            id="comment-textarea"
            label="Comment"
            placeholder="Please type your comment here in less than 140 words"
            variant="standard"
            multiline
            maxRows={5}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
