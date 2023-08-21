import { useState } from "react";

import {
  Button,
  Grid,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function SignInForm(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleVisibilityPassword = () => {
    setShowPassword((prevPasswordState) => !prevPasswordState);
  };

  return (
    <div
      style={{
        textAlign: "center",
        width: "50rem",
        margin: "0 auto",
        marginTop: "3.5rem",
      }}
    >
      <Paper elevation={3} style={{ padding: "2.6rem" }}>
        <Typography
          variant="h4"
          color="primary"
          gutterBottom
          style={{ marginTop: "1.4rem", textAlign: "center" }}
        >
          Sign In
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            label="Email"
            fullWidth
            required
            style={{ marginBottom: "1.2rem" }}
            onChange={(e) => props.setEmail(e.target.value)}
          ></TextField>
          <TextField
            variant="outlined"
            margin="normal"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            style={{ marginBottom: "2.2rem" }}
            onChange={(e) => props.setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {showPassword ? (
                    <VisibilityIcon
                      style={{ fontSize: "16px", cursor: "pointer" }}
                      onClick={handleVisibilityPassword}
                    />
                  ) : (
                    <VisibilityOffIcon
                      style={{ fontSize: "16px", cursor: "pointer" }}
                      onClick={handleVisibilityPassword}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          ></TextField>
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={() => props.validateForm()}
            sx={{ width: "7rem" }}
          >
            Sign In
          </Button>
        </form>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          style={{ marginTop: "1.2rem" }}
        >
          <Grid item xs={3}>
            <Typography sx={{ marginTop: "1.6rem", fontSize: "14px" }}>
              <Link href="/register">Create an Account now!</Link>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: "14px" }}>
              <Link href="/changePassword">Forgot Your Password?</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default SignInForm;
