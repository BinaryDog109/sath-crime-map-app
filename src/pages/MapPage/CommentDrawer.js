import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useEffect, useState } from "react";
import { Link, List, ListItem } from "@chakra-ui/react";
import { CommentListItem } from "./CommentListItem";
import { Chip, Divider, Skeleton, Tab, Tabs } from "@mui/material";
import { CrimeDetailChips } from "./CrimeDetailChips";
import { CommentList } from "./CommentList";
import { CrimeVictimRaceStats } from "./CrimeVictimRaceStats";
import { CommentDrawerTabs } from "./CommentDrawerTabs";

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
  // console.log({ selectedMarkers, overflow });
  const [open, setOpen] = useState(false);
  const [selectedCrime, setSelectedCrime] = useState("");
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  useEffect(() => { 
    setOpen(true)
    return () => {
      console.log("drawer unmounts")
    }
  }, [])
  return (
    <>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: overflow,
          },
        }}
      />
      <Box
        onClick={(e) => {
          if (e.target.closest("[id='menu-']")) return;
          if (!e.target.closest(".drawer-content")) setOpen(!open);
        }}
      >
        <SwipeableDrawer
          container={document.body}
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
            }}
          >
            {/* This is the gray capsule above the title */}
            <Puller />
            <Typography sx={{ p: 2, color: "text.secondary" }}>
              Labels and comments
            </Typography>
          </StyledBox>
          <StyledBox
            className="drawer-content"
            sx={{
              px: 2,
              pb: 2,
              height: "100%",
              overflow: "auto",
            }}
          >
            <CommentDrawerTabs tabNames={["Details", "Comments", "Stats"]}>
              <CrimeDetailChips selectedMarkers={selectedMarkers} />
              <CommentList selectedCrime={selectedCrime} setSelectedCrime={setSelectedCrime} selectedMarkers={selectedMarkers} />
              <CrimeVictimRaceStats crimeId={selectedCrime} /> 
            </CommentDrawerTabs>
          </StyledBox>
        </SwipeableDrawer>
      </Box>
    </>
  );
}
