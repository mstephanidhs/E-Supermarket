import useGeolocation from "../../hooks/useGeoLocation";
import "leaflet/dist/leaflet.css";
import "./../../static/css/map.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";

function Map() {
  const location = useGeolocation();

  const userLocation = [location.coordinates.lat, location.coordinates.lng];

  const customIcon = new Icon({
    iconUrl: require("./../../static/img/userMarker.png"),
    iconSize: [38, 38],
  });

  return (
    <MapContainer center={[38.246639, 21.734573]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={userLocation} icon={customIcon}>
        <Popup>Your Location!</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
