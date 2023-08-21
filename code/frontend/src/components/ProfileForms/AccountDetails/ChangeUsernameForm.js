import { Button, Grid, TextField } from "@mui/material";

function ChangeUsernameForm(props) {
  return (
    <Grid container justifyContent="left" alignItems="center">
      <form>
        <Grid item>
          <TextField
            variant="outlined"
            margin="normal"
            label="New Username"
            fullWidth
            required
            style={{ marginBottom: "2rem" }}
            onChange={(e) => props.setUsername(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item>
          <Button
            type="button"
            variant="contained"
            onClick={() => props.validateUsername()}
            sx={{ width: "12rem" }}
          >
            Change Username
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

export default ChangeUsernameForm;
