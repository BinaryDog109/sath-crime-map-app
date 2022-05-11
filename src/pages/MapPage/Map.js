import { Box } from "@chakra-ui/react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Button, Paper } from "@mui/material";
import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LoadingModal } from "./LoadingModal";
import { SearchPlaces } from "./SearchPlaces";

export const Map = ({ setSelectedMarkers }) => {
  const [map, setMap] = useState(null);
  const [open, setOpen] = useState(false); // The loading modal
  const [currentPos, setCurrentPos] = useState(null);
  const [crimeData, setCrimeData] = useState(null);
  const [directions, setDirections] = useState();
  const [mapHeading, setMapHeading] = useState();

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
      if (json.length > 250) json = json.slice(0, 250);
      setCrimeData(json);
    };

    if (currentPos && directions) {
      const km = directions.routes[0].legs[0].distance.value / 1000;
      // Currently, if passed in dynamic km, the browser will crash
      console.log({ km });
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
        // Use an array so that it will have a common interface
        marker.addListener("click", (e) => setSelectedMarkers([marker]));
        // Adding additional properties
        marker.crimeDetail = crime.detail;
        marker.crimeId = crime.id
        return marker;
      });

      // Add a marker clusterer to manage the markers.
      const clusterer = new MarkerClusterer({
        map,
        markers: markers.filter(
          (marker) =>
            marker.getVisible() &&
            map.getBounds().contains(marker.getPosition())
        ),
        onClusterClick: (_, cluster, __) => setSelectedMarkers(cluster.markers),
      });
      // Optimisation: add the markers only after previous are cleared and tiles are loaded
      // eslint-disable-next-line no-undef
      const listenerId = google.maps.event.addListener(
        map,
        "tilesloaded",
        () => {
          clusterer.clearMarkers();
          clusterer.addMarkers(
            // Clear prev markers and only add markers that are visible & inside the map bounds
            markers.filter(
              (marker) =>
                marker.getVisible() &&
                map.getBounds().contains(marker.getPosition())
            )
          );
          // console.log(clusterer.markers);
        }
      );
      setOpen(false);
      return () => {
        // eslint-disable-next-line no-undef
        google.maps.event.removeListener(listenerId);
      };
    }
  }, [crimeData, map, directions, setSelectedMarkers]);
  useEffect(() => {
    // After directions have been set, face the target
    if (directions) {
      const origin = directions.request.origin.location.toJSON();
      const destination = directions.request.destination.location.toJSON();
      // eslint-disable-next-line no-undef
      const heading = google.maps.geometry.spherical.computeHeading(
        origin,
        destination
      );
      setMapHeading(heading);
    }
  }, [directions, map]);

  const options = useMemo(
    () => ({
      // mapId: "331fbe194ea4838c",
      // disable default ui, icon
      mapId: "4dc76fada40f41c4", // Vector, rotate and tilt
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  return (
    <>
      <Box position="absolute" left={0} top={0} h={window.innerHeight} w="100%">
        {useMemo(
          () => (
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
          ),
          [currentPos, directions, options]
        )}
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
