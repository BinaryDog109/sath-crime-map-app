import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

//   type PlacesProps = {
//     setOffice: (position: google.maps.LatLngLiteral) => void;
//   };

export default function Places({ setOffice }) {
  //   places library is required for this hook
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  //   console.log({status}, {data})
  const handleSelect = async (val) => {
    console.log({val})
      setValue(val, false)
      clearSuggestions()

      const results = await getGeocode({address: val})
      console.log({results})
      const {lat, lng} = await getLatLng(results[0])
        // setOffice({lat, lng})
  }
  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="search an office address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}
