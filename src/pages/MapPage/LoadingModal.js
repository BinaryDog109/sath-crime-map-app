import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";

export const LoadingModal = ({open}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  
  return (
    <Modal
      keepMounted
      open={open}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          Loading
        </Typography>
        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          I am collecting the precious data...
        </Typography>
      </Box>
    </Modal>
  );
};
