import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useCRUD } from "../../hooks/useCRUD";
import { useUserContext } from "../../hooks/useUserContext";
import { CommentRatings } from "./CommentRating";


export const CommentFormModal = ({
  user,
  open,
  setOpen,
  selectedMarkers,
  selectedCrime,
  selectedLocation,
}) => {
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const defaultRatingLabel = "alright";

  const [ratingLabel, setRatingLabel] = useState(defaultRatingLabel);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [inputErrors, setInputErros] = useState([]);
  const { addDoc, response } = useCRUD("Comments");
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  useEffect(() => {
    reset();
  }, [selectedMarkers]);

  const form = {
    rating: ratingLabel,
    title,
    comment,
  };
  const reset = () => {
    setRatingLabel(defaultRatingLabel);
    setTitle("");
    setComment("");
    setInputErros([]);
  };
  const validate = (form) => {
    const errors = [];
    let allFieldFilled = true;
    if (!selectedCrime) errors.push("Please select a crime first!");
    // Check if empty
    Object.keys(form).forEach((field) => {
      if (!form[field]) {
        allFieldFilled = false;
      }
    });
    if (!allFieldFilled) errors.push("Please fill in all the fields");
    // Check word limit
    if (form.title.length > 140 || form.comment.length > 140) {
      errors.push("The num of words is above 140");
    }
    if (form.ratingLabel === "unknown") {
      errors.push("Please select one of the three faces");
    }
    setInputErros([...errors]);
    return errors.length === 0;
  };
  
  
  const handleSubmit = (e) => {
    setInputErros([]);
    e.preventDefault();
    const validated = validate(form);
    if (!validated) return;
    else {
      addDoc({
        ...form,
        crimeId: selectedCrime,
        uid: user.uid,
        username: user.username
      });
      reset();
      setOpen(false)
    }
  };
  useEffect(() => {
    if (response.success) {
      setOpenSuccessSnackbar(true);
    }
  }, [response.success]);
  return (
    <div>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSuccessSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSuccessSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully added a comment!
        </Alert>
      </Snackbar>
      {/* Render inside so that the click on the drawer will not close the drawer itself */}
      <Dialog disablePortal open={open} onClose={handleClose}>
        <DialogTitle>Have a say about this</DialogTitle>
        <DialogContent>
          {inputErrors.length > 0 &&
            inputErrors.map((error, index) => (
              <Typography key={index} color={"red"}>
                {error}
              </Typography>
            ))}
          <DialogContentText>
            Inform or warn others of this area:
          </DialogContentText>
          <Chip color="primary" label={selectedLocation} variant="outlined" />
          <form id="comment-form" onSubmit={handleSubmit}>
            <Typography mt={2}>How do you think of that location?</Typography>
            <CommentRatings
              ratingLabel={ratingLabel}
              setRatingLabel={setRatingLabel}
            />
            <TextField
              margin="dense"
              id="comment-title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              id="comment-textarea"
              label="Comment"
              placeholder="Please type your comment here in less than 140 words"
              variant="standard"
              multiline
              maxRows={5}
              fullWidth
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            disabled={response.isPending}
            type="submit"
            form="comment-form"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
