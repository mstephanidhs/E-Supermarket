import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { CircularProgress, Alert, Snackbar } from '@mui/material';
import OfferCard from '../components/OfferCard';

function Offer() {
  const { offerId } = useParams();

  const [loading, setLoading] = useState(true);
  const [offer, setOffer] = useState({});
  const [stock, setStock] = useState(null);
  const [score, setScore] = useState(null);
  const [likes, setLikes] = useState(null);
  const [dislikes, setDislikes] = useState(null);
  const [likeColor, setLikeColor] = useState('');
  const [dislikeColor, setDislikeColor] = useState('');
  const [disable, setDisable] = useState(false);

  const [success, setSuccess] = useState({ flag: false, message: '' });
  const [openAlert, setOpenAlert] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;

    setOpenAlert(false);
  };

  const token = 'Bearer ' + sessionStorage.getItem('token');
  const config = {
    headers: {
      authorization: token,
    },
  };

  const handleDislike = () => {
    setDislikeColor('primary');
    setDislikes((prevDislikes) => prevDislikes + 1);
    setLoading(true);

    axios
      .post(
        'http://localhost:5000/reaction/insertReaction',
        {
          offerUserId: offer.user_id,
          reactionUserId: parseInt(sessionStorage.getItem('userId')),
          offerId: offer.offer_id,
          isLike: 0,
        },
        config
      )
      .then((res) => {
        setDisable(true);
        setLoading(false);
        setScore((prevScore) => prevScore - 1);
        setSuccess({
          flag: true,
          message: 'You just disliked the specific offer!',
        });
        setTimeout(() => {
          handleClose();
        }, 2000);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  const handleLike = () => {
    setSuccess({ flag: false, message: '' });
    setOpenAlert(true);

    setLikeColor('primary');
    setLikes((prevLikes) => prevLikes + 1);
    setLoading(true);

    axios
      .post(
        'http://localhost:5000/reaction/insertReaction',
        {
          offerUserId: offer.user_id,
          reactionUserId: parseInt(sessionStorage.getItem('userId')),
          offerId: offer.offer_id,
          isLike: 1,
        },
        config
      )
      .then((res) => {
        setDisable(true);
        setLoading(false);
        setScore((prevScore) => prevScore + 5);
        setSuccess({
          flag: true,
          message: 'You just liked the specific offer!',
        });
        setTimeout(() => {
          handleClose();
        }, 2000);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  const changeStock = () => {
    setSuccess({ flag: false, message: '' });
    setOpenAlert(true);

    setStock((prevStock) => !prevStock);
    setLoading(true);

    axios
      .put(
        'http://localhost:5000/offer/changeStockOffer',
        {
          stock: !stock,
          offerId: offer.offer_id,
        },
        config
      )
      .then((res) => {
        setLoading(false);
        setSuccess({
          flag: true,
          message: 'The stock of the product was updated successfully!',
        });
        setTimeout(() => {
          handleClose();
        }, 2000);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  const fetchOffer = () => {
    axios(`http://localhost:5000/offer/${offerId}`, config)
      .then((res) => {
        setOffer(res.data.offer);
        setScore(res.data.offer.score);
        setStock(res.data.offer.stock === 'Yes' ? true : false);
        setLikes(res.data.offer.likes);
        setDislikes(res.data.offer.dislikes);
        getReaction();
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
          'userId'
        )}&${offerId}`
      )
      .then((res) => {
        console.log(res.data);
        if (typeof res.data.reaction === 'boolean') {
          res.data.reaction === true
            ? setLikeColor('primary')
            : setDislikeColor('primary');
          setDisable(true);
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
      {success.flag ? (
        <Snackbar open={openAlert} onClose={handleClose}>
          <Alert onClose={handleClose} severity='success'>
            {success.message}
          </Alert>
        </Snackbar>
      ) : null}
      {loading ? (
        <CircularProgress />
      ) : (
        <OfferCard
          score={score}
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
