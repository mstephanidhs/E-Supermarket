import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../context/Auth";
import axios from "axios";

import StoreOffersTable from "../components/StoreOffersTable";

import { CircularProgress } from "@mui/material";

function StoreOffers() {
  const { storeId } = useParams();
  const auth = useAuth();

  const [storeOffers, setStoreOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = "Bearer " + auth.user.token;
  const config = {
    headers: {
      authorization: token,
    },
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
      {loading ? (
        <CircularProgress />
      ) : (
        <StoreOffersTable offers={storeOffers} />
      )}
    </>
  );
}

export default StoreOffers;
