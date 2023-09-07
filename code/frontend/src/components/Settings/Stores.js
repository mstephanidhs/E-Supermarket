import StoreIcon from '@mui/icons-material/Store';
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

function Stores({
  handleStoreFileChange,
  handleStoreUpload,
  storeAction,
  handleStoreActionChange,
}) {
  return (
    <>
      <Chip
        label='Edit Stores'
        color='primary'
        variant='outlined'
        icon={<StoreIcon />}
        size='medium'
        style={{
          marginTop: '2rem',
          marginBottom: '3rem',
          fontWeight: 600,
          letterSpacing: '0.75px',
          padding: '0 0.6rem',
        }}
      />
      <div>
        <form onSubmit={handleStoreUpload}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <input
                type='file'
                accept='.json'
                onChange={handleStoreFileChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl style={{ width: '8rem' }}>
                  <InputLabel>Action</InputLabel>
                  <Select
                    value={storeAction}
                    label='Action'
                    onChange={handleStoreActionChange}
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

export default Stores;
