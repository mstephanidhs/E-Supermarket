import { useState } from "react";

import {
  Button,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function SignUpForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleVisibilityPassword = () => {
    setShowPassword((prevPasswordState) => !prevPasswordState);
  };

  const handleVisibilityRePassword = () => {
    setShowRePassword((prevRePasswordState) => !prevRePasswordState);
  };

  return (
    <div
      style={{
        textAlign: "center",
        width: "50rem",
        margin: "0 auto",
        marginTop: "3.5rem",
        marginBottom: "2.4rem",
      }}
    >
      <Paper elevation={3} style={{ padding: "2.6rem" }}>
        <Typography
          variant="h4"
          color="primary"
          gutterBottom
          style={{ marginTop: "1.4rem", textAlign: "center" }}
        >
          Sign Up
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            label="Username"
            fullWidth
            required
            style={{ marginBottom: "1.2rem" }}
            onChange={(e) => props.setUsername(e.target.value)}
          ></TextField>
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
            style={{ marginBottom: "1.2rem" }}
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
          <TextField
            variant="outlined"
            margin="normal"
            label="Re-enter Password"
            type={showRePassword ? "text" : "password"}
            fullWidth
            required
            style={{ marginBottom: "2rem" }}
            onChange={(e) => props.setRePassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {showRePassword ? (
                    <VisibilityIcon
                      style={{ fontSize: "16px", cursor: "pointer" }}
                      onClick={handleVisibilityRePassword}
                    />
                  ) : (
                    <VisibilityOffIcon
                      style={{ fontSize: "16px", cursor: "pointer" }}
                      onClick={handleVisibilityRePassword}
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
            Sign Up
          </Button>
        </form>
        <Typography
          sx={{ textAlign: "left", marginTop: "1.8rem", fontSize: "14px" }}
        >
          <Link href="/login">Have already an account?</Link>
        </Typography>
      </Paper>
    </div>
  );
}

export default SignUpForm;
