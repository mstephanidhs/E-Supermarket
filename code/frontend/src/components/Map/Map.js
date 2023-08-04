import useGeolocation from "../../hooks/useGeoLocation";
import "leaflet/dist/leaflet.css";
import "./../../static/css/map.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon } from "leaflet";

function Map({ stores }) {
  const location = useGeolocation();

  const userLocation = [location.coordinates.lat, location.coordinates.lng];

  const customIconUser = new Icon({
    iconUrl: require("./../../static/img/userMarker.png"),
    iconSize: [38, 38],
  });

  const customIconRedMarker = new Icon({
    iconUrl: require("./../../static/img/redMarker.png"),
    iconSize: [38, 38],
  });

  const customIconGreenMarker = new Icon({
    iconUrl: require("./../../static/img/greenMarker.png"),
    iconSize: [38, 38],
  });

  return (
    <MapContainer center={[38.246639, 21.734573]} zoom={11}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={userLocation} icon={customIconUser}>
        <Popup>Your Location!</Popup>
      </Marker>

      <MarkerClusterGroup chunkedLoading>
        {stores.map((store, index) => (
          <Marker
            key={index}
            position={[store.latitude, store.longitude]}
            icon={
              store.offer_id !== null
                ? customIconRedMarker
                : customIconGreenMarker
            }
          >
            <Popup>Hello</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default Map;
