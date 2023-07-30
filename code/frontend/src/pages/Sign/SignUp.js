import { useState } from "react";

import { Alert, Snackbar } from "@mui/material";

import SignUpForm from "../../components/SignForms/SignUpForm";
import { passwordStrength } from "../../util/checkPassword";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      password.length === 0 &&
      rePassword.length === 0 &&
      username.length === 0
    )
      return setError({
        flag: true,
        message: "Invalid Form, you must fill the fields!",
      });

    if (username.length === 0)
      return setError({
        flag: true,
        message: "Invalid Form, Username field cannot be empty!",
      });

    if (email.length === 0)
      return setError({
        flag: true,
        message: "Invalid Form, Email field cannot be empty!",
      });

    if (!email.includes("@"))
      return setError({
        flag: true,
        message: "Check your email again!",
      });

    if (password.length === 0)
      return setError({
        flag: true,
        message: "Invalid Form, Password field cannot be empty!",
      });

    if (rePassword.length === 0)
      return setError({
        flag: true,
        message: "Invalid Form, Re-Password field cannot be empty!",
      });

    if (passwordStrength(password) !== 4)
      return setError({
        flag: true,
        message: "Password is not strong enough!",
      });

    if (password !== rePassword)
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
      <SignUpForm
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        setRePassword={setRePassword}
        validateForm={validateForm}
      />
    </>
  );
}

export default SignUp;
