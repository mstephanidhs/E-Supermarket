import { useEffect, useState } from "react";
import useGeolocation from "../hooks/useGeoLocation";

import axios from "axios";

import {
  Alert,
  Autocomplete,
  Button,
  Grid,
  LinearProgress,
  Snackbar,
  TextField,
  Box,
} from "@mui/material";

import Map from "../components/Map/Map";

function Main() {
  const location = useGeolocation();

  const userLocation = [location.coordinates.lat, location.coordinates.lng];

  const [stores, setStores] = useState(null);
  const [storesNames, setStoresNames] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [valueStoreName, setValueStoreName] = useState("");
  const [valueCategoriesNames, setValueCategoriesNames] = useState("");
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState({ flag: false, message: "" });
  const [openAlert, setOpenAlert] = useState(true);

  const token = "Bearer " + sessionStorage.getItem("token");
  const config = {
    headers: {
      authorization: token,
    },
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    setOpenAlert(false);
  };

  const getAllStores = () => {
    setError({ flag: false, message: "" });
    setOpenAlert(true);

    axios
      .get("http://localhost:5000/store/fetchAllStores", config)
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
    setError({ flag: false, message: "" });
    setOpenAlert(true);

    axios
      .get("http://localhost:5000/categories/getAllCategories", config)
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
    setError({ flag: false, message: "" });
    setOpenAlert(true);
    setLoading(true);

    axios
      .get("http://localhost:5000/store/getOfferStores", config)
      .then((res) => {
        setStores(res.data.offerStores);
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
    setError({ flag: false, message: "" });
    setOpenAlert(true);
    setLoading(true);

    axios
      .get(`http://localhost:5000/store/${newValue}`, config)
      .then((res) => {
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
    setError({ flag: false, message: "" });
    setOpenAlert(true);
    setLoading(true);

    axios
      .get(`http://localhost:5000/store/category/${newValue.id}`, config)
      .then((res) => {
        setStores(res.data.storesByCategory);
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

  return (
    <>
      {error.flag ? (
        <Snackbar open={openAlert} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
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
            sx={{ marginTop: "4.8rem", marginLeft: "6.4rem", width: "100vh" }}
          >
            <Grid item>
              <Autocomplete
                value={valueStoreName}
                onChange={findStoresByName}
                disablePortal
                id="combo-box-demo"
                options={storesNames}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="Find Store" />
                )}
              />
            </Grid>
            <Grid item>
              <Autocomplete
                value={valueCategoriesNames}
                onChange={findStoresByCategory}
                disablePortal
                id="combo-box-demo"
                options={categoriesNames}
                sx={{ width: 200, marginLeft: "1.6rem" }}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                renderInput={(params) => (
                  <TextField {...params} label="Select Category" />
                )}
              />
            </Grid>
            <Grid item>
              <Box
                sx={{
                  "& button": { m: 1 },
                  marginTop: "0.6rem",
                  marginLeft: "0.6rem",
                }}
              >
                <Button size="small" onClick={getOfferStores}>
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
