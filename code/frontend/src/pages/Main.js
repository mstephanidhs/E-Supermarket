import { useEffect, useState } from "react";

import axios from "axios";
import { useAuth } from "../context/Auth";

import {
  Alert,
  Autocomplete,
  LinearProgress,
  Snackbar,
  TextField,
} from "@mui/material";

import Map from "../components/Map/Map";

function Main() {
  const [stores, setStores] = useState(null);
  const [storesNames, setStoresNames] = useState([]);
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

  const getOfferStores = () => {
    setError({ flag: false, message: "" });
    setOpenAlert(true);

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
  }, []);

  const findStoresByName = (event, newValue) => {
    setError({ flag: false, message: "" });
    setOpenAlert(true);
    setLoading(true);

    axios
      .get(`http://localhost:5000/store/${newValue}`, config)
      .then((res) => {
        console.log(res.data.storesByName);
        setStores(res.data.storesByName);
        setLoading(false);
      })
      .catch();
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
          <Autocomplete
            onChange={findStoresByName}
            disablePortal
            id="combo-box-demo"
            options={storesNames}
            sx={{ width: 200, marginLeft: "6.4rem", marginTop: "4.8rem" }}
            renderInput={(params) => (
              <TextField {...params} label="Find Store" />
            )}
          />
          <Map stores={stores} />
        </>
      )}
    </>
  );
}

export default Main;
