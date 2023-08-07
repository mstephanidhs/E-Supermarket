import { useState } from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

function OfferCard({
  offer,
  stock,
  changeStock,
  handleLike,
  likes,
  dislikes,
  handleDislike,
  likeColor,
  dislikeColor,
  disable,
}) {
  return (
    <>
      <div
        style={{
          textAlign: "center",
          width: "400px",
          margin: "3rem auto",
        }}
      >
        <Card elevation={3} sx={{ maxWidth: 500 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            color="primary"
            style={{ marginTop: "1rem", fontWeight: "600" }}
          >
            {offer.product_name}
          </Typography>
          <CardMedia
            sx={{ height: 260, marginTop: "1rem" }}
            image={offer.img}
            title="product image"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              color="primary"
              style={{ margin: "1rem 0" }}
            >
              Offer Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <strong>Price:</strong> {offer.price}
              </Grid>
              <Grid item xs={4}>
                <strong>Date:</strong> {offer.date_offer}
              </Grid>
              <Grid item xs={4}>
                <strong>In Stock:</strong> {stock === true ? "Yes" : "No"}
              </Grid>
              <Grid item xs={4}>
                <strong>Likes:</strong> {likes}
              </Grid>
              <Grid item xs={4}>
                <strong>Disikes:</strong> {dislikes}
              </Grid>
              <Grid item xs={4}>
                <strong>Username:</strong> {offer.username}
              </Grid>
              <Grid item xs={5}>
                <strong>User Score:</strong> {offer.score}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid
              container
              justifyContent="space-between"
              style={{ margin: "0.5rem" }}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ fontSize: "14px" }}
                  onClick={changeStock}
                >
                  {stock === true ? "Sold Out" : "In Stock"}
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton onClick={handleLike} disabled={disable}>
                <ThumbUpOffAltIcon color={likeColor} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={handleDislike} disabled={disable}>
                <ThumbDownOffAltIcon color={dislikeColor} />
              </IconButton>
            </Grid>
          </CardActions>
        </Card>
      </div>
    </>
  );
}

export default OfferCard;
