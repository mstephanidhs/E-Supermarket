import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../context/Auth";
import axios from "axios";

import StoreOffersTable from "../components/StoreOffersTable";

import { CircularProgress, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

const StyledSnackbarContent = styled("div")({
  backgroundColor: "#3f51b5", // Change this to your desired color
  color: "#fff",
  borderRadius: "4px",
  padding: "0.6rem 1.6rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

function StoreOffers() {
  const { storeId, inDistance } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();

  const [storeOffers, setStoreOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(inDistance === "true" ? false : true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const token = "Bearer " + sessionStorage.getItem("token");
  const config = {
    headers: {
      authorization: token,
    },
  };

  const deleteOffer = (offerId) => {
    const storesFlag = storeOffers.length === 1 ? true : false;
    axios
      .delete(`http://localhost:5000/offer/deleteOffer/${offerId}`, config)
      .then((res) => {
        if (storesFlag === true) {
          navigate("/");
          return;
        }
        window.location.reload();
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  useEffect(() => {
    getOffersByStore();
  }, []);

  const getOffersByStore = () => {
    axios
      .get(`http://localhost:5000/offer/offersByStore/${storeId}`, config)
      .then((res) => {
        setStoreOffers(res.data.offersByStore);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  return (
    <>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <StyledSnackbarContent>
          <span>
            You have to be in a 50m distance <br /> from the store to edit an
            offer!
          </span>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            style={{ marginLeft: "0.6rem" }}
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </StyledSnackbarContent>
      </Snackbar>
      {loading ? (
        <CircularProgress />
      ) : (
        <StoreOffersTable
          offers={storeOffers}
          inDistance={inDistance}
          deleteOffer={deleteOffer}
        />
      )}
    </>
  );
}

export default StoreOffers;
