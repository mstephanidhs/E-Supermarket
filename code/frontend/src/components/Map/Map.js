import useGeolocation from '../../hooks/useGeoLocation';
import 'leaflet/dist/leaflet.css';
import './../../static/css/misc.css';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Icon } from 'leaflet';

import PopupContent from './PopupContent';

function Map({ stores, userLocation }) {
  const userCoordinates = {
    lat: userLocation[0],
    lng: userLocation[1],
  };

  const customIconUser = new Icon({
    iconUrl: require('./../../static/img/userMarker.png'),
    iconSize: [38, 38],
  });

  const customIconRedMarker = new Icon({
    iconUrl: require('./../../static/img/redMarker.png'),
    iconSize: [38, 38],
  });

  const customIconGreenMarker = new Icon({
    iconUrl: require('./../../static/img/greenMarker.png'),
    iconSize: [38, 38],
  });

  return (
    <MapContainer center={[38.246639, 21.734573]} zoom={11}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      <Marker position={userLocation} icon={customIconUser}>
        <Popup>Your Location!</Popup>
      </Marker>

      <MarkerClusterGroup chunkedLoading>
        {stores.map((store, index) => {
          return (
            <Marker
              key={index}
              position={[store.latitude, store.longitude]}
              icon={
                store.offer_id !== null
                  ? customIconRedMarker
                  : customIconGreenMarker
              }
            >
              <Popup>
                <PopupContent store={store} userCoordinates={userCoordinates} />
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default Map;
