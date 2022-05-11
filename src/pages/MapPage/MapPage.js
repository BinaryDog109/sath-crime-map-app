import { Box, Flex, HStack, Input } from "@chakra-ui/react";
import { Paper } from "@mui/material";

import { GoogleMap } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { MapWithMarkerClusterer } from "../../components/MapClusterTest";
import { CommentDrawer } from "./CommentDrawer";
import { Map } from "./Map";
import { SearchPlaces } from "./SearchPlaces";
export const MapPage = () => {
  // Select a marker
  const [selectedMarkers, setSelectedMarkers] = useState(null)
  return (
    <Box display={"flex"} flexDirection="column" alignItems={"center"}>
      <Map setSelectedMarkers={setSelectedMarkers} />
      <CommentDrawer overflow={selectedMarkers? "visible" : "hidden"} selectedMarkers={selectedMarkers} />
    </Box>
  );
};
