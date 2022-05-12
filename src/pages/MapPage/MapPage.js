import { Box } from "@chakra-ui/react";

import { useState } from "react";
import { CommentDrawer } from "./CommentDrawer";
import { Map } from "./Map";
export const MapPage = () => {
  // Select a marker
  const [selectedMarkers, setSelectedMarkers] = useState(null)
  // console.log({selectedMarkers})
  return (
    <Box display={"flex"} flexDirection="column" alignItems={"center"}>
      <Map setSelectedMarkers={setSelectedMarkers} />
      {selectedMarkers && <CommentDrawer overflow={selectedMarkers? "visible" : "hidden"} selectedMarkers={selectedMarkers} />}
    </Box>
  );
};
