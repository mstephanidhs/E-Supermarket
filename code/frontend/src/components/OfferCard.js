import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

function OfferCard({
  offer,
  likes,
  dislikes,
  score,
  stock,
  changeStock,
  handleLike,
  disable,
  likeColor,
  handleDislike,
  dislikeColor,
}) {
  return (
    <div
      style={{
        textAlign: 'center',
        width: '40rem',
        margin: '3rem auto',
      }}
    >
      <Card elevation={3} sx={{ maxWidth: 800, height: 500, borderRadius: 5 }}>
        <Grid container spacing={8}>
          <Grid item xs={6}>
            <CardMedia
              sx={{ height: 400, width: 400, marginTop: '1rem' }}
              image={offer.img}
              title='product image'
            />
          </Grid>
          <Grid item xs={6}>
            <CardContent>
              <Typography
                gutterBottom
                variant='p'
                component='div'
                color='primary'
                style={{
                  marginTop: '4rem',
                  textAlign: 'left',
                  fontWeight: '700',
                }}
              >
                {offer.product_name}
              </Typography>
              <Grid container>
                <Grid item sx={{ marginTop: '1rem' }}>
                  <Typography
                    gutterBottom
                    variant='p'
                    style={{
                      textAlign: 'left',
                      fontWeight: '500',
                      fontSize: '14px',
                    }}
                  >
                    {offer.price}, {''}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant='p'
                    style={{
                      fontSize: '11px',
                    }}
                  >
                    {offer.date_offer}
                  </Typography>
                </Grid>
              </Grid>
              <Typography
                gutterBottom
                variant='p'
                component='div'
                style={{
                  marginTop: '2.5rem',
                  fontSize: '18px',
                  fontWeight: '500',
                }}
                color='primary'
              >
                Offer Details
              </Typography>
              <Grid container justifyContent='space-between'>
                <Grid item xs={6}>
                  <Typography
                    gutterBottom
                    variant='p'
                    component='div'
                    style={{
                      textAlign: 'left',
                      marginTop: '1rem',
                    }}
                  >
                    Likes: {likes}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    gutterBottom
                    variant='p'
                    component='div'
                    style={{
                      marginTop: '1rem',
                    }}
                  >
                    Disikes: {dislikes}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    gutterBottom
                    variant='p'
                    component='div'
                    style={{
                      textAlign: 'left',
                      marginTop: '1rem',
                    }}
                  >
                    Username: {offer.username}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    gutterBottom
                    variant='p'
                    component='div'
                    style={{
                      marginTop: '1rem',
                    }}
                  >
                    User Score: {score}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    gutterBottom
                    variant='p'
                    component='div'
                    style={{
                      marginTop: '1rem',
                      textAlign: 'left',
                    }}
                  >
                    In Stock: {stock === true ? 'Yes' : 'No'}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid
                container
                justifyContent='space-between'
                style={{ marginTop: '0.5rem' }}
              >
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    style={{ fontSize: '14px' }}
                    onClick={changeStock}
                  >
                    {stock === true ? 'Sold Out' : 'In Stock'}
                  </Button>
                </Grid>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={handleLike}
                  disabled={disable}
                  sx={{ marginTop: '0.5rem' }}
                >
                  <ThumbUpOffAltIcon color={likeColor} />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={handleDislike}
                  disabled={disable}
                  sx={{ marginTop: '0.5rem', marginRight: '0.5rem' }}
                >
                  <ThumbDownOffAltIcon color={dislikeColor} />
                </IconButton>
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default OfferCard;
