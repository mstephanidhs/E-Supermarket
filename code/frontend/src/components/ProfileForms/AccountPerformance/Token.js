import { Chip, Grid, TextField, InputAdornment } from "@mui/material";
import TokenIcon from "@mui/icons-material/Token";
import TodayIcon from "@mui/icons-material/Today";
import ScoreIcon from "@mui/icons-material/Score";

function Token({ totalTokens, previousTokens }) {
  return (
    <>
      <Chip
        label="Your Tokens"
        color="primary"
        variant="outlined"
        icon={<TokenIcon />}
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
            label="Previous Month's Tokens"
            style={{ marginBottom: "30px", width: "300px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TodayIcon style={{ fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
            value={previousTokens}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            disabled
            label="Total Tokens"
            style={{ marginBottom: "30px", width: "300px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ScoreIcon style={{ fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
            value={totalTokens}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Token;
