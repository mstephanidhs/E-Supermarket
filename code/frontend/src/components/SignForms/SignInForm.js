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
        width: "800px",
        margin: "0 auto",
        marginTop: "50px",
      }}
    >
      <Paper elevation={3} style={{ padding: "30px" }}>
        <Typography
          variant="h4"
          color="primary"
          gutterBottom
          style={{ marginTop: "32px", textAlign: "center" }}
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
            style={{ marginBottom: "12px" }}
            onChange={(e) => props.setEmail(e.target.value)}
          ></TextField>
          <TextField
            variant="outlined"
            margin="normal"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            style={{ marginBottom: "32px" }}
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
            sx={{ width: "100px" }}
          >
            Sign In
          </Button>
        </form>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          style={{ marginTop: "12px" }}
        >
          <Grid item xs={3}>
            <Typography sx={{ marginTop: "24px", fontSize: "14px" }}>
              <Link href="/signUp">Create an Account now!</Link>
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
