import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export function SearchPlaces({ setPlace }) {
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
    const {lat, lng} = await getLatLng(results[0])
    console.log({lat, lng})
    //   setOffice({lat, lng})
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
                {!ready ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
