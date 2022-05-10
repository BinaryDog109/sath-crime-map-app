import { Box } from "@mui/material";
import { GoogleMap } from "@react-google-maps/api";
import { useEffect, useMemo } from "react";
import { MapWithMarkerClusterer } from "../../components/MapClusterTest";
import { CommentDrawer } from "./CommentDrawer";
import { Map } from "./Map";
import {SearchPlaces} from "./SearchPlaces"
export const MapPage = () => {

  return (
    <>
      <Map />
      <CommentDrawer />
      <SearchPlaces />
    </>
  );
};
