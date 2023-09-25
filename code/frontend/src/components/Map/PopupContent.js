import { Link as RouterLink } from 'react-router-dom';

import { Typography, Link } from '@mui/material';

import { getDistanceInMeters } from '../../util/distanceBetween2Markers';

function PopupContent({ store, userCoordinates }) {
  // if the user is in 50m distance from the store
  const inDistance =
    getDistanceInMeters(
      userCoordinates.lat,
      userCoordinates.lng,
      store.latitude,
      store.longitude
    ) <= 50000
      ? true
      : false;

  return (
    <>
      <div>
        <Typography
          variant='p'
          gutterBottom
          style={{
            fontWeight: '600',
            fontSize: '16px',
          }}
          color='primary'
        >
          {store.store_name}
        </Typography>
      </div>
      {store.offer_id !== null ? (
        <>
          <br />
          <Link
            style={{ fontSize: '12px' }}
            component={RouterLink}
            to={`/viewStoreOffers/${store.store_id}/${inDistance}`}
          >
            See Products
          </Link>
        </>
      ) : null}
      {inDistance === true ? (
        <>
          <br />
          <Link
            style={{ fontSize: '12px' }}
            component={RouterLink}
            to={`/addStoreOffer/${store.store_id}`}
          >
            Add Offer
          </Link>
        </>
      ) : null}
    </>
  );
}

export default PopupContent;
