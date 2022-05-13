import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { CommentFormModal } from "./CommentFormModal";
import { CommentListItem } from "./CommentListItem";
import { useGetDocuments } from "../../hooks/useGetDocuments";
import { useUserContext } from "../../hooks/useUserContext";
import { projectFirestore } from "../../firebase/config";
import { Comments } from "./Comments";

export const CommentList = ({ selectedMarkers }) => {
  const user = useUserContext();
  const {uid} = user
  console.log({uid})
  const [open, setOpen] = useState(false);
  const [selectedCrime, setSelectedCrime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  // console.log({ selectedMarkers });
  return (
    <>
      {uid && (
        <CommentFormModal
          user={user}
          open={open}
          setOpen={setOpen}
          selectedMarkers={selectedMarkers}
          selectedCrime={selectedCrime}
          selectedLocation={selectedLocation}
        />
      )}
      <Box>
        <FormControl variant="filled" fullWidth>
          <InputLabel id="select-a-crime">Select a crime</InputLabel>
          <Select
            fullWidth
            autoFocus
            labelId="select-a-crime"
            id="demo-simple-select"
            value={selectedCrime}
            label="Crime"
            onChange={(e) => {
              setSelectedCrime(e.target.value);
            }}
          >
            {selectedMarkers.map((marker) => (
              <MenuItem
                style={{ whiteSpace: "normal" }}
                key={marker.crimeId}
                value={marker.crimeId}
                data-location={marker.crimeLocation}
                onClick={(e) => {
                  setSelectedLocation(e.target.dataset.location);
                }}
              >
                {marker.crimeLocation}:{" "}
                {marker.crimeType === "multiple"
                  ? marker.crimeDetail.map((detail) => `${detail}, `)
                  : marker.crimeDetail}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {uid? (
        <Button
          disabled={!selectedCrime}
          onClick={() => {
            setOpen(true);
          }}
          sx={{ mt: 1 }}
          variant="contained"
        >
          Add a comment
        </Button>
      ) : <Typography>Please <Link href="/login">login</Link> first so that you can comment!</Typography>}
      {useMemo(
        () => selectedCrime && <Comments selectedCrime={selectedCrime} />,
        [selectedCrime]
      )}
    </>
  );
};
