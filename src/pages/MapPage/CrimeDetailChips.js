import { Chip, Tooltip } from "@mui/material";

export const CrimeDetailChips = ({ selectedMarkers }) => {
  return (
    selectedMarkers &&
    selectedMarkers.map((marker, index) => (
      <Tooltip placement="top" title={marker.crimeLocation}>
        <Chip key={index} sx={{ mr: 1, mt: 1 }} label={marker.crimeDetail} />
      </Tooltip>
    ))
  );
};
