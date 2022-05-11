import { Chip } from "@mui/material";

export const CrimeDetailChips = ({ selectedMarkers }) => {
  return (
    selectedMarkers &&
    selectedMarkers.map((marker, index) => (
      <Chip key={index} sx={{ mr: 1, mt: 1 }} label={marker.crimeDetail} />
    ))
  );
};
