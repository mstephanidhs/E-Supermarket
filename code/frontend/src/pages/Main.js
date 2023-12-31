import { useEffect, useState } from 'react';
import useGeolocation from '../hooks/useGeoLocation';

import axios from 'axios';

import {
  Alert,
  Autocomplete,
  Button,
  Grid,
  LinearProgress,
  Snackbar,
  TextField,
  Box,
} from '@mui/material';

import Map from '../components/Map/Map';

function Main() {
  const location = useGeolocation();

  const userLocation = [location.coordinates.lat, location.coordinates.lng];

  const [stores, setStores] = useState([]);
  const [storesNames, setStoresNames] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [valueStoreName, setValueStoreName] = useState('');
  const [valueCategoriesNames, setValueCategoriesNames] = useState('');
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState({ flag: false, message: '' });
  const [openAlert, setOpenAlert] = useState(true);

  const token = 'Bearer ' + sessionStorage.getItem('token');
  const config = {
    headers: {
      authorization: token,
    },
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;

    setOpenAlert(false);
  };

  const getAllStores = () => {
    setError({ flag: false, message: '' });
    setOpenAlert(true);

    axios
      .get('http://localhost:4000/store/fetchAllStores', config)
      .then((res) => {
        setStoresNames(res.data.allStores);
      })
      .catch((error) => {
        if (error.response)
          return setError({
            flag: true,
            message: error.response.data.message,
          });

        setLoading(false);
      });
  };

  const getAllCategories = () => {
    setError({ flag: false, message: '' });
    setOpenAlert(true);

    axios
      .get('http://localhost:4000/categories/getAllCategories', config)
      .then((res) => {
        setCategoriesNames(res.data.categories);
      })
      .catch((error) => {
        if (error.response)
          return setError({
            flag: true,
            message: error.response.data.message,
          });

        setLoading(false);
      });
  };

  const getOfferStores = () => {
    setValueStoreName(null);
    setValueCategoriesNames(null);
    setError({ flag: false, message: '' });
    setOpenAlert(true);
    setLoading(true);

    axios
      .get('http://localhost:4000/store/getOfferStores', config)
      .then((res) => {
        setStores(res.data.offerStores);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          setLoading(false);
          return setError({
            flag: true,
            message: error.response.data.message,
          });
        }
      });
  };

  useEffect(() => {
    getAllStores();
    getAllCategories();
    getOfferStores();
  }, []);

  const findStoresByName = (event, newValue) => {
    setValueCategoriesNames(null);

    if (newValue === null) {
      setValueStoreName(null);
      getOfferStores();
      return;
    }

    setValueStoreName(newValue);
    setError({ flag: false, message: '' });
    setOpenAlert(true);
    setLoading(true);

    axios
      .get(`http://localhost:4000/store/${newValue}`, config)
      .then((res) => {
        console.log(res.data.storesByName);
        setStores(res.data.storesByName);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response)
          return setError({
            flag: true,
            message: error.response.data.message,
          });

        setLoading(false);
      });
  };

  const findStoresByCategory = (event, newValue) => {
    setValueStoreName(null);

    if (newValue === null) {
      setValueCategoriesNames(null);
      getOfferStores();
      return;
    }

    setValueCategoriesNames(newValue);
    setError({ flag: false, message: '' });
    setOpenAlert(true);
    setLoading(true);

    axios
      .get(`http://localhost:4000/store/category/${newValue.id}`, config)
      .then((res) => {
        setStores(res.data.storesByCategory);
        setLoading(false);
        if (res.data.storesByCategory.length === 0)
          return setError({
            flag: true,
            message:
              'There are no offers for products in the specific category!',
          });
      })
      .catch((error) => {
        if (error.response) {
          setLoading(false);
          return setError({
            flag: true,
            message: error.response.data.message,
          });
        }
      });
  };

  return (
    <>
      {error.flag ? (
        <Snackbar open={openAlert} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error'>
            {error.message}
          </Alert>
        </Snackbar>
      ) : null}
      {loading === true ? (
        <LinearProgress />
      ) : (
        <>
          <Grid
            container
            sx={{
              marginTop: '4.8rem',
              marginLeft: '6.4rem',
              width: '45rem',
            }}
            spacing={1}
          >
            <Grid
              item
              sx={{ marginBottom: '0.8rem' }}
              xs={12}
              sm={4}
              md={4}
              lg={4}
              xl={4}
            >
              <Autocomplete
                value={valueStoreName}
                onChange={findStoresByName}
                disablePortal
                id='combo-box-demo'
                options={storesNames}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label='Find Store' />
                )}
              />
            </Grid>
            <Grid
              item
              sx={{ marginBottom: '0.8rem' }}
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
            >
              <Autocomplete
                value={valueCategoriesNames}
                onChange={findStoresByCategory}
                disablePortal
                id='combo-box-demo'
                options={categoriesNames}
                sx={{ width: 200 }}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                renderInput={(params) => (
                  <TextField {...params} label='Select Category' />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Box
                sx={{
                  '& button': { m: 1 },
                  marginTop: '0.6rem',
                }}
              >
                <Button size='small' onClick={getOfferStores}>
                  Clear filters
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Map stores={stores} userLocation={userLocation} />
        </>
      )}
    </>
  );
}

export default Main;
