import { Box } from "@chakra-ui/react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Paper } from "@mui/material";
import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LoadingModal } from "./LoadingModal";
import { SearchPlaces } from "./SearchPlaces";

const locations = [
  { lat: -31.56391, lng: 147.154312 },
  { lat: -33.718234, lng: 150.363181 },
  { lat: -33.727111, lng: 150.371124 },
  { lat: -33.848588, lng: 151.209834 },
  { lat: -33.851702, lng: 151.216968 },
  { lat: -34.671264, lng: 150.863657 },
  { lat: -35.304724, lng: 148.662905 },
  { lat: -36.817685, lng: 175.699196 },
  { lat: -36.828611, lng: 175.790222 },
  { lat: -37.75, lng: 145.116667 },
  { lat: -37.759859, lng: 145.128708 },
  { lat: -37.765015, lng: 145.133858 },
  { lat: -37.770104, lng: 145.143299 },
  { lat: -37.7737, lng: 145.145187 },
  { lat: -37.774785, lng: 145.137978 },
  { lat: -37.819616, lng: 144.968119 },
  { lat: -38.330766, lng: 144.695692 },
  { lat: -39.927193, lng: 175.053218 },
  { lat: -41.330162, lng: 174.865694 },
  { lat: -42.734358, lng: 147.439506 },
  { lat: -42.734358, lng: 147.501315 },
  { lat: -42.735258, lng: 147.438 },
  { lat: -43.999792, lng: 170.463352 },
];

export const Map = ({ dest }) => {
  const [map, setMap] = useState(null);
  const [open, setOpen] = useState(false); // The loading modal
  const [currentPos, setCurrentPos] = useState(null);
  const [crimeData, setCrimeData] = useState(null);
  const [directions, setDirections] = useState();

  async function getCurrentPosition() {
    return new Promise(async (res, rej) => {
      const p = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error)
        );
      });
      const position = await p;
      const positionlat = position.coords.latitude;
      const positionlon = position.coords.longitude;
      const currentCoordinate = { lat: positionlat, lng: positionlon };
      res(currentCoordinate);
    });
  }

  // Initialise the map and its utility
  useEffect(() => {
    setOpen(true);
    if (map) {
      // eslint-disable-next-line no-undef
      const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
      });
      setOpen(false);
    }
  }, [map]);
  useEffect(() => {
    const invokeGetPosition = async () => {
      const currentPosition = await getCurrentPosition();
      setCurrentPos(currentPosition);
    };
    invokeGetPosition();
  }, []);
  useEffect(() => {
    const fetchCrimeData = async (km = 1.5) => {
      const res = await fetch(
        "https://open-data-cw2-api.azurewebsites.net/api/map/getAllCoordinateByDistance",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            longitude: currentPos.lng,
            latitude: currentPos.lat,
            distance: km,
          }),
        }
      );
      let json = await res.json();
      if (json.length > 500) json = json.slice(0, 500)
      setCrimeData(json);
    };

    if (currentPos && directions) {

      const km = (directions.routes[0].legs[0].distance.value) / 1000;
      // Currently, if passed in dynamic km, the browser will crash
      console.log({km})
      fetchCrimeData(km);
    }
  }, [currentPos, directions]);
  useEffect(() => {
    if (crimeData && directions) {
      console.log({ crimeData });
      // Add some markers to the map.
      const markers = crimeData.map((crime, i) => {
        const label = crime.type;
        // eslint-disable-next-line no-undef
        const marker = new google.maps.Marker({
          position: { lng: +crime.longitude, lat: +crime.latitude },
          label,
        });
        marker.crimeDetail = crime.detail
        return marker;
      });

      // Add a marker clusterer to manage the markers.
      const cluster = new MarkerClusterer({
        markers,
        map,
        onClusterClick: (a, b, c) => console.log(a, b, c),
      });
      setOpen(false);
    }
  }, [crimeData, map, directions]);
  useEffect(() => {
    console.log({ directions });
  }, [directions]);

  const options = useMemo(
    () => ({
      // mapId: "331fbe194ea4838c",
      // disable default ui, icon
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  return (
    <>
      <Box position="absolute" left={0} top={0} h={window.innerHeight} w="100%">
        <GoogleMap
          options={options}
          mapContainerStyle={{
            width: "100%",
            height: `100%`,
            // height: '500px'
          }}
          onLoad={(map) => {
            setMap(map);
          }}
          // id="marker-example"
          zoom={15}
          center={currentPos}
        >
          <Marker position={currentPos} label="You" />
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "orange",
                  strokeWeight: 5,
                },
              }}
            />
          )}
        </GoogleMap>
      </Box>
      <Paper sx={{ mt: 2, zIndex: 1, backgroundColor: "#fff", width: "80%" }}>
        <SearchPlaces
          setLoadingOpen={setOpen}
          currentPos={currentPos}
          setDirections={setDirections}
        />
      </Paper>
      <LoadingModal open={open} />
    </>
  );
};
