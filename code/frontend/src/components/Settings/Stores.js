import StoreIcon from "@mui/icons-material/Store";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

function Stores({
  handleStoreFileChange,
  handleStoreUpload,
  storeAction,
  handleStoreActionChange,
}) {
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
        <form onSubmit={handleStoreUpload}>
          <Grid container>
            <Grid item xs={6}>
              <input
                type="file"
                accept=".json"
                onChange={handleStoreFileChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl style={{ width: "120px" }}>
                  <InputLabel>Action</InputLabel>
                  <Select
                    value={storeAction}
                    label="Action"
                    onChange={handleStoreActionChange}
                  >
                    <MenuItem value="Delete">Delete</MenuItem>
                    <MenuItem value="Update">Update</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            style={{ marginTop: "1.4rem" }}
          >
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Upload JSON
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}

export default Stores;
