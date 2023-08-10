import { Chip, Grid, TextField, InputAdornment } from "@mui/material";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function Reactions({ likes, dislikes }) {
  return (
    <>
      <Chip
        label="Your Reactions"
        color="primary"
        variant="outlined"
        icon={<AddReactionIcon />}
        size="medium"
        style={{
          marginTop: "30px",
          marginBottom: "40px",
          fontWeight: 600,
          letterSpacing: "0.75px",
          padding: "0 8px",
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            disabled
            label="Likes"
            style={{ marginBottom: "30px", width: "300px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ThumbUpIcon style={{ fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
            value={likes}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            disabled
            label="Dislikes"
            style={{ marginBottom: "30px", width: "300px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ThumbDownAltIcon style={{ fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
            value={dislikes}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Reactions;
