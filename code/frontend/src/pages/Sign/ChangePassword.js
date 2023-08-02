import { useState } from "react";

import { Alert, Snackbar } from "@mui/material";

import ChangePasswordForm from "../../components/SignForms/ChangePasswordForm";
import { passwordStrength } from "../../util/checkPassword";

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState({ flag: false, message: "" });
  const [openAlert, setOpenAlert] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    setOpenAlert(false);
  };

  const validateForm = () => {
    setError({ flag: false, message: "" });
    setOpenAlert(true);

    if (
      email.length === 0 &&
      newPassword.length === 0 &&
      rePassword.length === 0
    )
      return setError({
        flag: true,
        message: "Invalid Form, you must fill the fields!",
      });

    if (email.length === 0)
      return setError({
        flag: true,
        message: "Invalid Form, Email field cannot be empty!",
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
      <ChangePasswordForm
        setEmail={setEmail}
        setNewPassword={setNewPassword}
        setRePassword={setRePassword}
        validateForm={validateForm}
      />
    </>
  );
}

export default ChangePassword;
