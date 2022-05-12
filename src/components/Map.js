import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./Places";
import Distance from "./Distance";

// type LatLngLiteral = google.maps.LatLngLiteral;
// type DirectionsResult = google.maps.DirectionsResult;
// type MapOptions = google.maps.MapOptions;

export default function Map() {
  const center = useMemo(() => ({ lat: 43, lng: -80 }), []);
  const [office, setOffice] = useState(center); // office would be {lat:xxx, lng: xxx} (LatLngLiteral)
  const [directions, setDirections] = useState()

  const options = useMemo(
    () => ({
      mapId: "331fbe194ea4838c",
      // disable default ui, icon
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const mapRef = useRef(); // Google Map ref
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const houses = useMemo(() => generateHouses(office), [office]);
  console.log({ houses });
  const fetchDirection = house => {
    if (!office) return
    // eslint-disable-next-line no-undef
    const service = new google.maps.DirectionsService()
    service.route(
      {
        origin: house,
        destination: office,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result)
        }
      }
    )
  }
  return (
    <div className="container">
      <div className="controls">
        <h1>Commute?</h1>
        <Places
          setOffice={(position) => {
            setOffice(position);
            mapRef.current?.panTo(position);
          }}
        />
        {!office && "Please select your office"}
      </div>
      <div className="map">
        <GoogleMap
          options={options}
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          onLoad={onLoad}
        >
          {directions && <DirectionsRenderer directions={directions} options={{
            polylineOptions: {
              zIndex: 50,
              strokeColor: '#d3d3d3',
              strokeWeight: 5
            }
          }} />}
          {/* Use a beach flag to display the office */}
          {office && (
            <Marker
              position={office}
              icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            ></Marker>
          )}
          <MarkerClusterer>
            {(clusterer) =>
              houses.map((house) => (
                <Marker
                  clusterer={clusterer}
                  key={house.lat + house.lng}
                  position={house}
                  onClick={()=>fetchDirection(house)}
                ></Marker>
              ))
            }
          </MarkerClusterer>
          {/* The radius of a Circle is by meters */}
          <Circle
            center={office}
            radius={15000}
            options={closeOptions}
          ></Circle>
          <Circle
            center={office}
            radius={30000}
            options={middleOptions}
          ></Circle>
          <Circle center={office} radius={45000} options={farOptions}></Circle>
        </GoogleMap>
      </div>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateHouses = (position) => {
  const _houses = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};
