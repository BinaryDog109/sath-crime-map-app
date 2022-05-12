import { useLoadScript } from "@react-google-maps/api";
import { MapPage } from "./MapPage/MapPage";
const libraries = ["places"]

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_THE_KEY,
    libraries
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <MapPage />;
}