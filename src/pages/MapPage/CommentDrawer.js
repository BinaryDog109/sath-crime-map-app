import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useState } from "react";
import { Link, List, ListItem } from "@chakra-ui/react";
import { CommentListItem } from "./CommentListItem";
import { Chip } from "@mui/material";

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export function CommentDrawer({ overflow = "visible", selectedMarkers }) {
  console.log({ selectedMarkers });
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            overflow: `${overflow}`,
          },
        }}
      />
      <Box className="yty" onClick={toggleDrawer(!open)}>
        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              position: "absolute",
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",
              right: 0,
              left: 0,
              // bottom: 0,
              
            }}
          >
            <Puller />
          </StyledBox>
          {/* Content */}
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: "100%",
              overflow: "auto",
            }}
          >
            <Box py={2} px={2}>
              {selectedMarkers &&
                selectedMarkers.map((marker, index) => (
                  <Chip
                    key={index}
                    sx={{ mr: 1, mt: 1 }}
                    label={marker.crimeDetail}
                  />
                ))}
            </Box>
            <List p={0}>
              <ListItem className="restaurant-item" listStyleType={"none"}>
                <CommentListItem />
              </ListItem>
              <ListItem className="restaurant-item" listStyleType={"none"}>
                <CommentListItem />
              </ListItem>
            </List>
          </StyledBox>
        </SwipeableDrawer>
      </Box>
    </>
  );
}
