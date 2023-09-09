import { Autocomplete, TextField, Grid, Button, Box } from '@mui/material';

function FiltersSecondGraph({
  valueCategory,
  valueSubCategory,
  categories,
  subCategories,
  handleCategoryChange,
  handleSubCategoryChange,
  handleSubmit,
}) {
  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems='center'
        sx={{ marginTop: '1rem', marginLeft: '5.2rem', width: '60vw' }}
      >
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Autocomplete
            value={valueCategory}
            sx={{ width: 200 }}
            options={categories}
            onChange={handleCategoryChange}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderInput={(params) => <TextField {...params} label='Category' />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={3}>
          <Autocomplete
            onChange={handleSubCategoryChange}
            value={valueSubCategory}
            sx={{ width: 200 }}
            options={subCategories}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderInput={(params) => (
              <TextField {...params} label='Subcategory' />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={3}>
          <Box sx={{ marginTop: '0.3rem' }}>
            <Button size='small' onClick={handleSubmit} variant='contained'>
              Show Graph
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default FiltersSecondGraph;
