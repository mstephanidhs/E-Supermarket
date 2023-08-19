import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
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

function Prices({
  handlePricesFileChange,
  handlePricesUpload,
  pricesAction,
  handlePricesActionChange,
}) {
  return (
    <>
      <Chip
        label="Edit Products Prices"
        color="primary"
        variant="outlined"
        icon={<ProductionQuantityLimitsIcon />}
        size="medium"
        style={{
          marginTop: "4rem",
          marginBottom: "40px",
          fontWeight: 600,
          letterSpacing: "0.75px",
          padding: "0 8px",
        }}
      />
      <div>
        <form onSubmit={handlePricesUpload}>
          <Grid container>
            <Grid item xs={6}>
              <input
                type="file"
                accept=".json"
                onChange={handlePricesFileChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl style={{ width: "120px" }}>
                  <InputLabel>Action</InputLabel>
                  <Select
                    value={pricesAction}
                    label="Action"
                    onChange={handlePricesActionChange}
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

export default Prices;
