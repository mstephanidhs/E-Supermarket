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

function Products({
  handleProductFileChange,
  handleProductUpload,
  productAction,
  handleProductActionChange,
}) {
  return (
    <>
      <Chip
        label="Edit Products"
        color="primary"
        variant="outlined"
        icon={<ProductionQuantityLimitsIcon />}
        size="medium"
        style={{
          marginTop: "4rem",
          marginBottom: "3rem",
          fontWeight: 600,
          letterSpacing: "0.75px",
          padding: "0 0.6rem",
        }}
      />
      <div>
        <form onSubmit={handleProductUpload}>
          <Grid container>
            <Grid item xs={6}>
              <input
                type="file"
                accept=".json"
                onChange={handleProductFileChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl style={{ width: "8rem" }}>
                  <InputLabel>Action</InputLabel>
                  <Select
                    value={productAction}
                    label="Action"
                    onChange={handleProductActionChange}
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

export default Products;
