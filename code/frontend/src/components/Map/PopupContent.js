import { Link as RouterLink } from "react-router-dom";

import { Typography, Link } from "@mui/material";

import { L } from "leaflet";

function PopupContent({ store, userCoordinates }) {
  const withinDistance = (coord1, coord2, maxDistance) => {
    const distance = L.latLng(coord1.lat, coord1.lng).distanceTo(
      L.latLng(coord2.lat, coord2.lng)
    );
    return distance <= maxDistance;
  };

  return (
    <>
      <div>
        <Typography
          variant="p"
          gutterBottom
          style={{
            fontWeight: "600",
            fontSize: "16px",
          }}
          color="primary"
        >
          {store.store_name}
        </Typography>
      </div>
      {store.offer_id !== null ? (
        <>
          <br />
          <Link
            style={{ fontSize: "12px" }}
            component={RouterLink}
            to={`/viewStoreOffers/${store.store_id}`}
          >
            See Products
          </Link>
        </>
      ) : null}
    </>
  );
}

export default PopupContent;
