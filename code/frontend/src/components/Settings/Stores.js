import StoreIcon from "@mui/icons-material/Store";
import { Button, Chip } from "@mui/material";

function Stores() {
  return (
    <>
      <Chip
        label="Edit Stores"
        color="primary"
        variant="outlined"
        icon={<StoreIcon />}
        size="medium"
        style={{
          marginTop: "10px",
          marginBottom: "40px",
          fontWeight: 600,
          letterSpacing: "0.75px",
          padding: "0 8px",
        }}
      />
      <div>
        <input type="file" accept=".json" />
        <Button variant="contained">Upload JSON</Button>
      </div>
    </>
  );
}

export default Stores;
