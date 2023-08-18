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
  handleFileChange,
  handleUpload,
  action,
  handleActionChange,
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
        <form onSubmit={handleUpload}>
          <Grid container>
            <Grid item xs={6}>
              <input type="file" accept=".json" onChange={handleFileChange} />
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl style={{ width: "120px" }}>
                  <InputLabel>Action</InputLabel>
                  <Select
                    value={action}
                    label="Action"
                    onChange={handleActionChange}
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
          {/* <input type="file" accept=".json" onChange={handleFileChange} />
          <Button variant="contained" type="submit">
            Upload JSON
          </Button> */}
        </form>
      </div>
    </>
  );
}

export default Stores;
