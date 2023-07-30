import { useState } from "react";

import { Alert, Grid, Snackbar, Paper, Chip } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import ChangeUsernameForm from "../components/ProfileForms/ChangeUsernameForm";
import ChangePasswordForm from "../components/ProfileForms/ChangePasswordForm";

import { passwordStrength } from "../util/checkPassword";

function Profile() {
  const [username, setUsername] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [error, setError] = useState({ flag: false, message: "" });
  const [openAlert, setOpenAlert] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    setOpenAlert(false);
  };

  const validateUsername = () => {
    setError({ flag: false, message: "" });
    setOpenAlert(true);

    if (username.length === 0)
      return setError({
        flag: true,
        message: "You must fill the Username field!",
      });
  };

  const validatePassword = () => {
    setError({ flag: false, message: "" });
    setOpenAlert(true);

    if (
      oldPassword.length === 0 &&
      newPassword.length === 0 &&
      rePassword.length === 0
    )
      return setError({
        flag: true,
        message: "Invalid Form, you must fill the fields!",
      });

    if (oldPassword.length === 0)
      return setError({
        flag: true,
        message: "Invalid Form, Old Password field cannot be empty!",
      });

    if (newPassword.length === 0)
      return setError({
        flag: true,
        message: "Invalid Form, New Password field cannot be empty!",
      });

    if (rePassword.length === 0)
      return setError({
        flag: true,
        message: "Invalid Form, Re-Password field cannot be empty!",
      });

    if (passwordStrength(newPassword) !== 4)
      return setError({
        flag: true,
        message: "Password is not strong enough!",
      });

    if (newPassword !== rePassword)
      return setError({
        flag: true,
        message: "Passwords do not match!",
      });
  };

  return (
    <>
      {error.flag ? (
        <Snackbar open={openAlert} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {error.message}
          </Alert>
        </Snackbar>
      ) : null}
      <div
        style={{
          textAlign: "center",
          width: "100vh",
          margin: "0 auto",
          marginTop: "10vh",
        }}
      >
        <Paper elevation={3} style={{ padding: "30px", borderRadius: "20px" }}>
          <Chip
            label="Account Details"
            color="primary"
            variant="outlined"
            icon={<AccountBoxIcon />}
            size="medium"
            style={{
              marginTop: "10px",
              marginBottom: "40px",
              fontWeight: 600,
              letterSpacing: "0.75px",
              padding: "0 8px",
            }}
          />
          <Grid
            container
            spacing={12}
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item>
              <ChangeUsernameForm
                setUsername={setUsername}
                validateUsername={validateUsername}
              />
            </Grid>
            <Grid item>
              <ChangePasswordForm
                setOldPassword={setOldPassword}
                setNewPassword={setNewPassword}
                setRePassword={setRePassword}
                validatePassword={validatePassword}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
}

export default Profile;
