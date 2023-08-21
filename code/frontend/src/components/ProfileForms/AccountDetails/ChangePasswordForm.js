import { useState } from "react";

import { Button, InputAdornment, TextField, Grid } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function ChangePasswordForm(props) {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleVisibilityOldPassword = () => {
    setShowOldPassword((prevOldPasswordState) => !prevOldPasswordState);
  };

  const handleVisibilityNewPassword = () => {
    setShowNewPassword((prevNewPasswordState) => !prevNewPasswordState);
  };

  const handleVisibilityRePassword = () => {
    setShowRePassword((prevRePasswordState) => !prevRePasswordState);
  };

  return (
    <Grid container justifyContent="center" alignItems="right">
      <form>
        <Grid item>
          <TextField
            variant="outlined"
            margin="normal"
            label="Current Password"
            type={showOldPassword ? "text" : "password"}
            fullWidth
            required
            style={{ marginBottom: "1rem" }}
            onChange={(e) => props.setOldPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {showOldPassword ? (
                    <VisibilityIcon
                      style={{ fontSize: "16px", cursor: "pointer" }}
                      onClick={handleVisibilityOldPassword}
                    />
                  ) : (
                    <VisibilityOffIcon
                      style={{ fontSize: "16px", cursor: "pointer" }}
                      onClick={handleVisibilityOldPassword}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            margin="normal"
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            fullWidth
            required
            style={{ marginBottom: "1rem" }}
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
        </Grid>
        <Grid item>
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
        </Grid>
        <Grid item>
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={() => props.validatePassword()}
            sx={{ width: "12rem" }}
          >
            Change Password
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

export default ChangePasswordForm;
