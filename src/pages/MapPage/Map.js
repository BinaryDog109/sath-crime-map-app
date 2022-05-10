import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";

function initMap(map) {
  // eslint-disable-next-line no-undef
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  // Create an array of alphabetical characters used to label the markers.
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Add some markers to the map.
  const markers = locations.map((position, i) => {
    const label = labels[i % labels.length];
    // eslint-disable-next-line no-undef
    const marker = new google.maps.Marker({
      position,
      label,
    });

    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    marker.addListener("click", () => {
      infoWindow.setContent(label);
      infoWindow.open(map, marker);
    });

    return marker;
  });

  // Add a marker clusterer to manage the markers.
  new MarkerClusterer({
    markers,
    map,
    onClusterClick: (a, b, c) => console.log(a, b, c),
  });
}

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

export const Map = () => {
  const [map, setMap] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);
  const [crimeData, setCrimeData] = useState(null);
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
    if (map) {
      // eslint-disable-next-line no-undef
      const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
      });
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
    const fetchCrimeData = async () => {
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
            distance: 1.5,
          }),
        }
      );
      const json = await res.json();
      setCrimeData(json);
    };

    if (currentPos) {
      fetchCrimeData();
    }
  }, [currentPos]);
  useEffect(() => {
    if (crimeData) {
      // console.log({crimeData})
      // Add some markers to the map.
      const markers = crimeData.map((crime, i) => {
        const label = crime.type;
        // eslint-disable-next-line no-undef
        const marker = new google.maps.Marker({
          position: { lng: +crime.longitude, lat: +crime.latitude },
          label,
        });

        return marker;
      });

      // Add a marker clusterer to manage the markers.
      const cluster = new MarkerClusterer({
        markers,
        map,
        // onClusterClick: (a, b, c) => console.log(a, b, c),
      });
    }
  }, [crimeData, map]);

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
    </GoogleMap>
  );
};
