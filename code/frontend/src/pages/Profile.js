import { useEffect, useState } from "react";

import axios from "axios";
import { useAuth } from "./../context/Auth";

import {
  Alert,
  Grid,
  Snackbar,
  Paper,
  Chip,
  CircularProgress,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import ChangeUsernameForm from "../components/ProfileForms/ChangeUsernameForm";
import ChangePasswordForm from "../components/ProfileForms/ChangePasswordForm";
import OffersTable from "../components/ProfileForms/OffersTable";

import { passwordStrength } from "../util/checkPassword";

function Profile() {
  const auth = useAuth();

  const [username, setUsername] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [offers, setOffers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [alert, setAlert] = useState({
    flag: false,
    message: "",
    severity: "error",
  });
  const [openAlert, setOpenAlert] = useState(true);

  const token = "Bearer " + auth.user.token;
  const config = {
    headers: {
      authorization: token,
    },
  };

  useEffect(() => {
    offersByUserID();
  }, []);

  const offersByUserID = () => {
    axios
      .get(
        `http://localhost:5000/offer/offersByUser/${sessionStorage.getItem(
          "userId"
        )}`,
        config
      )
      .then((res) => {
        setOffers(res.data.offersByUser);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    setOpenAlert(false);
  };

  const validateUsername = () => {
    setAlert({ flag: false, message: "", severity: "error" });
    setOpenAlert(true);

    if (username.length === 0)
      return setAlert({
        severity: "error",
        flag: true,
        message: "You must fill the Username field!",
      });

    axios
      .put(
        "http://localhost:5000/profile/changeUsername",
        {
          newName: username,
        },
        config
      )
      .then((res) => {
        if (res.status === 200)
          return setAlert({
            flag: true,
            message: res.data.message,
            severity: "success",
          });
      })
      .catch((error) => {
        if (error.response) {
          return setAlert({
            severity: "error",
            flag: true,
            message: error.response.data.message,
          });
        }
      });
  };

  const validatePassword = () => {
    setAlert({ flag: false, message: "", severity: "error" });
    setOpenAlert(true);

    if (
      oldPassword.length === 0 &&
      newPassword.length === 0 &&
      rePassword.length === 0
    )
      return setAlert({
        severity: "error",
        flag: true,
        message: "Invalid Form, you must fill the fields!",
      });

    if (oldPassword.length === 0)
      return setAlert({
        severity: "error",
        flag: true,
        message: "Invalid Form, Old Password field cannot be empty!",
      });

    if (newPassword.length === 0)
      return setAlert({
        severity: "error",
        flag: true,
        message: "Invalid Form, New Password field cannot be empty!",
      });

    if (rePassword.length === 0)
      return setAlert({
        severity: "error",
        flag: true,
        message: "Invalid Form, Re-Password field cannot be empty!",
      });

    if (passwordStrength(newPassword) !== 4)
      return setAlert({
        severity: "error",
        flag: true,
        message: "Password is not strong enough!",
      });

    if (newPassword !== rePassword)
      return setAlert({
        severity: "error",
        flag: true,
        message: "Passwords do not match!",
      });

    axios
      .put(
        "http://localhost:5000/profile/changePassword",
        {
          oldPass: oldPassword,
          newPass: newPassword,
          rePass: rePassword,
        },
        config
      )
      .then((res) => {
        if (res.status === 200)
          return setAlert({
            flag: true,
            message: res.data.message,
            severity: "success",
          });
      })
      .catch((error) => {
        if (error.response) {
          return setAlert({
            severity: "error",
            flag: true,
            message: error.response.data.message,
          });
        }
      });
  };

  return (
    <>
      {alert.flag ? (
        <Snackbar open={openAlert} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alert.severity}>
            {alert.message}
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
      {loading ? <CircularProgress /> : <OffersTable offers={offers} />}
    </>
  );
}

export default Profile;
