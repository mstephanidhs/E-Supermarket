import { useState } from "react";

import { Alert, Snackbar } from "@mui/material";

import SignInForm from "../../components/SignForms/SignInForm";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ flag: false, message: "" });
  const [openAlert, setOpenAlert] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    setOpenAlert(false);
  };

  const validateForm = () => {
    setError({ flag: false, message: "" });
    setOpenAlert(true);

    if (email.length === 0 && password.length === 0)
      return setError({
        flag: true,
        message: "Invalid Form, you must fill the fields!",
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
      <SignInForm
        setEmail={setEmail}
        setPassword={setPassword}
        validateForm={validateForm}
      />
    </>
  );
}

export default SignIn;
