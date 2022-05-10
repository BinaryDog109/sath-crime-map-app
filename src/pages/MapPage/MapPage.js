import { Box, Flex, HStack, Input } from "@chakra-ui/react";
import { Paper } from "@mui/material";

import { GoogleMap } from "@react-google-maps/api";
import { useEffect, useMemo } from "react";
import { MapWithMarkerClusterer } from "../../components/MapClusterTest";
import { CommentDrawer } from "./CommentDrawer";
import { Map } from "./Map";
import { SearchPlaces } from "./SearchPlaces";
export const MapPage = () => {
  const center = { lat: 48.8584, lng: 2.2945 };

  return (
    <Box display={"flex"} flexDirection="column" alignItems={"center"}>
      <Box position="absolute" left={0} top={0} h={window.innerHeight} w="100%">
        <Map />
      </Box>
      <Paper  sx={{ mt: 2, zIndex: 1, backgroundColor: "#fff", width: "80%" }}>
        <SearchPlaces />
      </Paper>

      <CommentDrawer />
    </Box>
  );
};
