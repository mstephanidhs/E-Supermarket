import { Link as RouterLink } from "react-router-dom";

import { Typography, Link } from "@mui/material";

function PopupContent({ store }) {
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
