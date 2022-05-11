import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CommentRatings } from "./CommentRating";

export const CommentFormModal = ({ open, setOpen, selectedMarkers }) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [selected, setSelected] = useState("");
  const [ratingLabel, setRatingLabel] = useState("It is alright")
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const form = {
    selected,
    ratingLabel,
    title,
    comment
  }
  console.log({form})
  return (
    <div>
      {/* Render inside so that the click on the drawer will not close the drawer itself */}
      <Dialog disablePortal open={open} onClose={handleClose}>
        <DialogTitle>Have a say about this</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Inform or warn others of this area...
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select a crime
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selected}
              label="Crime"
              onChange={(e) => {
                setSelected(e.target.value);
              }}
            >
              {selectedMarkers.map((marker) => (
                <MenuItem style={{whiteSpace: 'normal'}} key={marker.crimeId} value={marker.crimeId}>
                  {marker.crimeLocation} {marker.crimeDetail}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography mt={2}>How do you think of that location?</Typography>
          <CommentRatings ratingLabel={ratingLabel} setRatingLabel={setRatingLabel} />
          <TextField
            autoFocus
            margin="dense"
            id="comment-title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
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
            onChange={(e)=>{setComment(e.target.value)}}
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
