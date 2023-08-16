import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../context/Auth";

import axios from "axios";
import { CircularProgress } from "@mui/material";
import OfferCard from "../components/OfferCard";

function Offer() {
  const { offerId } = useParams();
  const auth = useAuth();

  const [loading, setLoading] = useState(true);
  const [offer, setOffer] = useState({});
  const [stock, setStock] = useState(null);
  const [likes, setLikes] = useState(null);
  const [dislikes, setDislikes] = useState(null);
  const [likeColor, setLikeColor] = useState("");
  const [dislikeColor, setDislikeColor] = useState("");
  const [disable, setDisable] = useState();

  const token = "Bearer " + sessionStorage.getItem("token");
  const config = {
    headers: {
      authorization: token,
    },
  };

  const handleDislike = () => {
    if (dislikeColor === "primary") return;

    if (likeColor !== "primary") {
      setDislikeColor("primary");
      setLoading(true);
      setDislikes((prevDislikes) => prevDislikes + 1);

      axios
        .post(
          "http://localhost:5000/reaction/insertReaction",
          {
            userId: sessionStorage.getItem("userId"),
            offerId: offer.offer_id,
            isLike: 0,
          },
          config
        )
        .then((res) => {
          setLoading(false);
        })
        .catch((error) => {
          if (error.response) console.log(error.response.data.message);
        });
    }

    if (likeColor === "primary") {
      setLikeColor("");
      setDislikeColor("primary");
      setLikes((prevLikes) => prevLikes - 1);
      setDislikes((prevDislikes) => prevDislikes + 1);

      axios
        .put(
          `http://localhost:5000/reaction/changeReaction`,
          {
            userId: sessionStorage.getItem("userId"),
            offerId: offer.offer_id,
            reaction: 0,
          },
          config
        )
        .then((res) => {
          setLoading(false);
        })
        .catch((error) => {
          if (error.response) console.log(error.response.data.message);
        });
    }
  };

  const handleLike = () => {
    if (likeColor === "primary") return;

    if (dislikeColor !== "primary") {
      setLikeColor("primary");
      setLoading(true);
      setLikes((prevLikes) => prevLikes + 1);

      axios
        .post(
          "http://localhost:5000/reaction/insertReaction",
          {
            userId: sessionStorage.getItem("userId"),
            offerId: offer.offer_id,
            isLike: 1,
          },
          config
        )
        .then((res) => {
          setLoading(false);
        })
        .catch((error) => {
          if (error.response) console.log(error.response.data.message);
        });
    }

    if (dislikeColor === "primary") {
      setLikeColor("primary");
      setDislikeColor("");
      setLikes((prevLikes) => prevLikes + 1);
      setDislikes((prevDislikes) => prevDislikes - 1);

      axios
        .put(
          `http://localhost:5000/reaction/changeReaction`,
          {
            userId: sessionStorage.getItem("userId"),
            offerId: offer.offer_id,
            reaction: 1,
          },
          config
        )
        .then((res) => {
          setLoading(false);
        })
        .catch((error) => {
          if (error.response) console.log(error.response.data.message);
        });
    }
  };

  const changeStock = () => {
    if (stock === false) {
      getReaction();
      setDisable(false);
    } else {
      setDislikeColor("");
      setLikeColor("");
      setDisable(true);
    }

    setStock((prevStock) => !prevStock);
    setLoading(true);

    axios
      .put(
        "http://localhost:5000/offer/changeStockOffer",
        {
          stock: !stock,
          offerId: offer.offer_id,
        },
        config
      )
      .then((res) => {
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  const fetchOffer = () => {
    axios(`http://localhost:5000/offer/${offerId}`, config)
      .then((res) => {
        setOffer(res.data.offer);
        setStock(res.data.offer.stock === "Yes" ? true : false);
        setLikes(res.data.offer.likes);
        setDislikes(res.data.offer.dislikes);
        setDisable(res.data.offer.stock === "Yes" ? false : true);
        if (res.data.offer.stock === "Yes") getReaction();
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  const getReaction = () => {
    axios
      .get(
        `http://localhost:5000/reaction/getMyReaction/${sessionStorage.getItem(
          "userId"
        )}&${offerId}`
      )
      .then((res) => {
        if (typeof res.data.reaction === "boolean") {
          res.data.reaction === true
            ? setLikeColor("primary")
            : setDislikeColor("primary");
        }
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  useEffect(() => {
    fetchOffer();
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <OfferCard
          offer={offer}
          stock={stock}
          likes={likes}
          dislikes={dislikes}
          changeStock={changeStock}
          handleLike={handleLike}
          handleDislike={handleDislike}
          likeColor={likeColor}
          dislikeColor={dislikeColor}
          disable={disable}
        />
      )}
    </>
  );
}

export default Offer;
