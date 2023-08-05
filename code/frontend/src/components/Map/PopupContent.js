import { Typography } from "@mui/material";

function PopupContent({ store }) {
  return (
    <>
      <Typography
        variant="p"
        gutterBottom
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          fontWeight: "600",
        }}
        color="primary"
      >
        {store.store_name}
      </Typography>
    </>
  );
}

export default PopupContent;
