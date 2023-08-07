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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link as RouterLink } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";

const useStyles = makeStyles((theme) => ({
  activeIconButton: {
    cursor: "pointer", // Change this to your desired cursor style
  },
}));

function StoreOffersTable({ offers, inDistance }) {
  const classes = useStyles();

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        style={{ marginTop: "3.6rem", textAlign: "center" }}
        color="primary"
      >
        {offers[0].store_name} Offers
      </Typography>

      <TableContainer
        component={Paper}
        style={{ margin: "auto", width: "80%", marginTop: "35px" }}
        sx={{ maxHeight: "300px" }}
      >
        <Table arial-aria-label="Offers Table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Product Price</TableCell>
              <TableCell>Offer Date</TableCell>
              <TableCell>Likes</TableCell>
              <TableCell>Dislikes</TableCell>
              <TableCell>In Stock</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((offer, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{offer.product_name}</TableCell>
                <TableCell>{offer.price}</TableCell>
                <TableCell>{offer.date_offer}</TableCell>
                <TableCell>{offer.likes}</TableCell>
                <TableCell>{offer.dislikes}</TableCell>
                <TableCell>{offer.stock}</TableCell>
                <TableCell>
                  {inDistance === "true" ? (
                    <IconButton
                      component={RouterLink}
                      to={`/viewStoreOffers/${offer.store_id}/${offer.offer_id}`}
                      className={classes.activeIconButton}
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                  ) : (
                    "-"
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
