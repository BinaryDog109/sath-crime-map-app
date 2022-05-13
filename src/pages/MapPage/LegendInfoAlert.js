import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { typeIconMap } from "./typeIconMap";

export const LegendInfoAlert = ({ open, setOpen }) => {
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
        {"Information about the icons"}
      </DialogTitle>
      <DialogContent>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {Object.keys(typeIconMap).map((type, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar src={typeIconMap[type].image} />
              </ListItemAvatar>
              <ListItemText>
                  <Typography>{typeIconMap[type].description}</Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Got it!</Button>
      </DialogActions>
    </Dialog>
  );
};
