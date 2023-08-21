import { useState } from "react";

import {
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function ChangePasswordForm(props) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleVisibilityNewPassword = () => {
    setShowNewPassword((prevNewPasswordState) => !prevNewPasswordState);
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
        marginTop: "4rem",
      }}
    >
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography
          variant="h4"
          color="primary"
          gutterBottom
          style={{ marginTop: "2rem", textAlign: "center" }}
        >
          Password Restoration
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
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            fullWidth
            required
            style={{ marginBottom: "1.2rem" }}
            onChange={(e) => props.setNewPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {showNewPassword ? (
                    <VisibilityIcon
                      style={{ fontSize: "16px", cursor: "pointer" }}
                      onClick={handleVisibilityNewPassword}
                    />
                  ) : (
                    <VisibilityOffIcon
                      style={{ fontSize: "16px", cursor: "pointer" }}
                      onClick={handleVisibilityNewPassword}
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
            style={{ marginBottom: "2.4rem" }}
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
            sx={{ width: "14rem" }}
          >
            Change Password
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default ChangePasswordForm;
