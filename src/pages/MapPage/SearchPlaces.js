import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import { useCallback, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export function SearchPlaces({ currentPos, setDirections, setLoadingOpen }) {
  const fetchDirection = useCallback(
    (destination) => {
      if (!currentPos) return;
      setLoadingOpen(true)
      // eslint-disable-next-line no-undef
      const service = new google.maps.DirectionsService();
      service.route(
        {
          origin: currentPos,
          destination: destination,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          }
        }
      );
    },
    [currentPos, setDirections, setLoadingOpen]
  );
  //   places library is required for this hook
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
  } = usePlacesAutocomplete();
  const [open, setOpen] = useState(false);
  const handleSelect = async (e, data) => {
    if (!data) return;
    setValue(data.description, false);
    console.log("select", data.description);
    const results = await getGeocode({ address: data.description });
    const coords = await getLatLng(results[0]);
    fetchDirection(coords);
  };
  return (
    <Autocomplete
      onChange={handleSelect}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option) => option.description}
      options={data}
      loading={!ready}
      renderInput={(params) => (
        <TextField
          fullWidth
          size="small"
          variant="filled"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          {...params}
          label="Search where you want to go"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {!ready ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
