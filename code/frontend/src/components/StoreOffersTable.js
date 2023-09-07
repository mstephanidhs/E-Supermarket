import {
  TableBody,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles((theme) => ({
  activeIconButton: {
    cursor: 'pointer', // Change this to your desired cursor style
  },
  redIcon: {
    color: 'rgba(255, 99, 71, 1)',
  },
}));

function StoreOffersTable({ offers, inDistance, deleteOffer }) {
  const classes = useStyles();

  return (
    <>
      <Typography
        variant='h4'
        gutterBottom
        style={{ marginTop: '3.6rem', textAlign: 'center' }}
        color='primary'
      >
        {offers[0].store_name} Offers
      </Typography>

      <TableContainer
        component={Paper}
        style={{
          margin: 'auto',
          width: '80%',
          marginTop: '3.1rem',
        }}
        sx={{ maxHeight: '30rem' }}
      >
        <Table arial-aria-label='Offers Table' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: 'center' }}>Username</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                Product Name
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                Product Price
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>Offer Date</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Likes</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Dislikes</TableCell>
              <TableCell style={{ textAlign: 'center' }}>In Stock</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((offer, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell style={{ textAlign: 'center' }}>
                  {offer.username}
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  {offer.product_name}
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  {offer.price}
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  {offer.date_offer}
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  {offer.likes}
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  {offer.dislikes}
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  {offer.stock}
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  {inDistance === 'true' ? (
                    <>
                      <IconButton
                        component={RouterLink}
                        to={`/viewOffer/${offer.store_id}/${offer.offer_id}`}
                        className={classes.activeIconButton}
                      >
                        <EditIcon color='primary' />
                      </IconButton>
                      {sessionStorage.getItem('role') === 'admin' ? (
                        <IconButton onClick={() => deleteOffer(offer.offer_id)}>
                          <DeleteIcon className={classes.redIcon} />
                        </IconButton>
                      ) : null}
                    </>
                  ) : (
                    '-'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default StoreOffersTable;
