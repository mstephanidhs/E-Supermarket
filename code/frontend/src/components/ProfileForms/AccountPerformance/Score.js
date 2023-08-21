import { Chip, Grid, TextField, InputAdornment } from "@mui/material";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import TodayIcon from "@mui/icons-material/Today";
import ScoreIcon from "@mui/icons-material/Score";

function Score({ currentScore, totalScore }) {
  return (
    <>
      <Chip
        label="Your Score"
        color="primary"
        variant="outlined"
        icon={<ScoreboardIcon />}
        size="medium"
        style={{
          marginTop: "1.6rem",
          marginBottom: "3rem",
          fontWeight: 600,
          letterSpacing: "0.75px",
          padding: "0 0.6rem",
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            disabled
            label="Current Month's Score"
            style={{ marginBottom: "2rem", width: "18rem" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TodayIcon style={{ fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
            value={currentScore}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            disabled
            label="Total Score"
            style={{ marginBottom: "2rem", width: "18rem" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ScoreIcon style={{ fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
            value={totalScore}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Score;
