import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

function Prices({
  handlePricesFileChange,
  handlePricesUpload,
  pricesAction,
  handlePricesActionChange,
}) {
  return (
    <>
      <Chip
        label='Edit Products Prices'
        color='primary'
        variant='outlined'
        icon={<ProductionQuantityLimitsIcon />}
        size='medium'
        style={{
          marginTop: '4rem',
          marginBottom: '3rem',
          fontWeight: 600,
          letterSpacing: '0.75px',
          padding: '0 0.6rem',
        }}
      />
      <div>
        <form onSubmit={handlePricesUpload}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <input
                type='file'
                accept='.json'
                onChange={handlePricesFileChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl style={{ width: '8rem' }}>
                  <InputLabel>Action</InputLabel>
                  <Select
                    value={pricesAction}
                    label='Action'
                    onChange={handlePricesActionChange}
                  >
                    <MenuItem value='Delete'>Delete</MenuItem>
                    <MenuItem value='Update'>Update</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid container justifyContent='center' style={{ marginTop: '2rem' }}>
            <Grid item>
              <Button variant='contained' color='primary' type='submit'>
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
