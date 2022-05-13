import { Box } from "@chakra-ui/react";
import { useLoadScript } from "@react-google-maps/api";

import { useState } from "react";
import { CommentDrawer } from "./CommentDrawer";
import { Map } from "./Map";
import Navbar from "../../components/navbar";
import { UserContext, UserContextProvider } from "../../context/UserContext";
const libraries = ["places"];

export const MapPage = () => {
  // Select a marker
  const [selectedMarkers, setSelectedMarkers] = useState(null);
  // console.log({selectedMarkers})
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_THE_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Navbar />
      <Box position={"relative"}>
        <Box display={"flex"} flexDirection="column" alignItems={"center"}>
          <Map setSelectedMarkers={setSelectedMarkers} />
          <UserContextProvider>
            {selectedMarkers && (
              <CommentDrawer
                overflow={selectedMarkers ? "visible" : "hidden"}
                selectedMarkers={selectedMarkers}
              />
            )}
          </UserContextProvider>
        </Box>
      </Box>
    </>
  );
};
