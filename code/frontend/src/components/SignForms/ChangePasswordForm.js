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
          Password Restoration
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
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            fullWidth
            required
            style={{ marginBottom: "12px" }}
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
            style={{ marginBottom: "32px" }}
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
            sx={{ width: "200px" }}
          >
            Change Password
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default ChangePasswordForm;
