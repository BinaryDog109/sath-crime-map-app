import { Box } from "@chakra-ui/react";
import NavigationIcon from "@mui/icons-material/Navigation";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import RouteIcon from "@mui/icons-material/Route";
import InfoIcon from "@mui/icons-material/Info";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Button, Fab, Paper, useMediaQuery } from "@mui/material";
import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LoadingModal } from "./LoadingModal";
import { SearchPlaces } from "./SearchPlaces";
import { GoToPremiumAlert } from "./GoToPremiumAlert";
import { folderClusterRenderer } from "./folderClusterRenderer";

import "./Map.css";
import { LegendInfoAlert } from "./LegendInfoAlert";
import { typeIconMap } from "./typeIconMap";

export const Map = ({ setSelectedMarkers }) => {
  const [map, setMap] = useState(null);
  const [open, setOpen] = useState(false); // The loading modal
  const [premiumAlertOpen, setPremiumAlertOpen] = useState(false); // The premium alert modal
  const [infoOpen, setInfoOpen] = useState(false);
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
          icon: (typeIconMap[crime.type] && typeIconMap[crime.type].image) || null,
        });
        // Use an array so that it will have a common interface
        // Notice this is a native event listener, so setting state will be in synchronous order (no batching)
        marker.addListener("click", (e) => {
          setSelectedMarkers(() => null);
          setSelectedMarkers(() => [marker]);
          const { lat, lng } = marker.position;
          console.log({ lat: lat(), lng: lng(), type: marker.crimeType });
        });
        // Adding additional properties
        marker.crimeDetail = crime.detail;
        marker.crimeId = crime.id;
        marker.crimeLocation = crime.location;
        marker.crimeType = crime.type;
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
        renderer: folderClusterRenderer,
        onClusterClick: (_, cluster, __) => {
          setSelectedMarkers(() => null);
          setSelectedMarkers(() => cluster.markers);
          cluster.markers.forEach((marker) => {
            const { lat, lng } = marker.position;
            console.log({ lat: lat(), lng: lng(), type: marker.crimeType });
          });
        },
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
  const matches = useMediaQuery("(min-width:600px)");
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
      <GoToPremiumAlert open={premiumAlertOpen} setOpen={setPremiumAlertOpen} />
      <LegendInfoAlert open={infoOpen} setOpen={setInfoOpen} />
      <Box
        position="absolute"
        left={0}
        top={0}
        h={window.innerHeight - (matches ? 64 : 56)}
        w="100%"
      >
        <Box
          position={"absolute"}
          right={8}
          bottom={56 + 8}
          display={"flex"}
          flexDirection="column"
          alignItems={"end"}
        >
          {directions && (
            <Fab
              onClick={() => {
                if (map) {
                  map.setHeading(mapHeading);
                  map.setTilt(map.getTilt() + 20);
                }
              }}
              sx={{ mt: 1 }}
              size="small"
              color="info"
              aria-label="navigation"
            >
              <NavigationIcon />
            </Fab>
          )}
          <Fab
            onClick={async () => {
              const currentPosition = await getCurrentPosition();
              setCurrentPos(currentPosition);
              if (map) {
                map.panTo(currentPos);
              }
            }}
            sx={{ mt: 1 }}
            size="small"
            color="primary"
            aria-label="locate-user"
          >
            <MyLocationIcon />
          </Fab>
          {directions && (
            <Fab
              onClick={() => {
                setPremiumAlertOpen(true);
              }}
              sx={{ mt: 1 }}
              size="small"
              color="success"
              aria-label="calculate-path"
            >
              <RouteIcon />
            </Fab>
          )}
          {directions && (
            <Fab
              onClick={() => {
                setInfoOpen(true);
              }}
              sx={{ mt: 1 }}
              size="small"
              aria-label="display-info-legend"
            >
              <InfoIcon />
            </Fab>
          )}
        </Box>
        {useMemo(
          () => (
            <>
              <GoogleMap
                options={options}
                mapContainerStyle={{
                  width: "100%",
                  height: `100%`,
                  // height: '500px'
                }}
                onLoad={(map) => {
                  console.log("map launches");
                  setMap(map);
                }}
                // id="marker-example"
                zoom={15}
                center={currentPos}
              >
                <Marker position={currentPos} icon={typeIconMap["user"].image} />
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
            </>
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
