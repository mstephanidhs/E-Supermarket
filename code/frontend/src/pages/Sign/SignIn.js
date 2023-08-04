import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

import axios from "axios";

import { Alert, Snackbar } from "@mui/material";

import SignInForm from "../../components/SignForms/SignInForm";

function SignIn() {
  const navigate = useNavigate();
  const auth = useAuth();

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

    axios
      .post("http://localhost:5000/auth/login", {
        email,
        password,
      })
      .then((res) => {
        const { token, name, role, userId } = res.data;
        auth.login(token, name, role, userId);
        if (res.status === 200) navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          return setError({
            flag: true,
            message: error.response.data.message,
          });
        }
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
