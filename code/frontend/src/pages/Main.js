import { useEffect, useState } from "react";

import axios from "axios";
import { useAuth } from "../context/Auth";

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
  const [stores, setStores] = useState(null);
  const [storesNames, setStoresNames] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState({ flag: false, message: "" });
  const [openAlert, setOpenAlert] = useState(true);

  const auth = useAuth();

  const token = "Bearer " + auth.user.token;
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
    setLoading(true);

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
    setLoading(true);

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
    getOfferStores();
    getAllCategories();
  }, []);

  const findStoresByName = (event, newValue) => {
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
    setError({ flag: false, message: "" });
    setOpenAlert(true);
    setLoading(true);

    axios
      .get(`http://localhost:5000/store/category/${newValue}`, config)
      .then((res) => {
        // console.log(res.data.storesByCategory);
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
                onChange={findStoresByCategory}
                disablePortal
                id="combo-box-demo"
                options={categoriesNames}
                sx={{ width: 200, marginLeft: "1.6rem" }}
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
          <Map stores={stores} />
        </>
      )}
    </>
  );
}

export default Main;
