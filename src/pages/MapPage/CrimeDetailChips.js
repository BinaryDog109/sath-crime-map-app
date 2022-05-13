import { Chip, Tooltip } from "@mui/material";

export const CrimeDetailChips = ({ selectedMarkers }) => {
  return (
    selectedMarkers &&
    selectedMarkers.map((marker, index) =>
      marker.crimeType === "multiple" ? (
        marker.crimeDetail.map((detail, index) => (
          <Tooltip key={index} placement="top" title={marker.crimeLocation}>
            <Chip sx={{ mr: 1, mt: 1 }} label={detail} />
          </Tooltip>
        ))
      ) : (
        <Tooltip key={index} placement="top" title={marker.crimeLocation}>
          <Chip sx={{ mr: 1, mt: 1 }} label={marker.crimeDetail} />
        </Tooltip>
      )
    )
  );
};
