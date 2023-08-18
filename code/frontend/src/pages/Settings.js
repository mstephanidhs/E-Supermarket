import { Paper } from "@mui/material";
import { useState } from "react";

import axios from "axios";
import { Alert, Snackbar } from "@mui/material";

import Stores from "../components/Settings/Stores";

function Settings() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [action, setAction] = useState("");
  const [alert, setAlert] = useState({
    flag: false,
    message: "",
    severity: "error",
  });
  const [openAlert, setOpenAlert] = useState(true);

  const token = "Bearer " + sessionStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: token,
    },
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) setSelectedFile(file);
    else setSelectedFile(null);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    setOpenAlert(false);
  };

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  const handleUpload = (e) => {
    e.preventDefault();

    setAlert({ flag: false, message: "", severity: "error" });
    setOpenAlert(true);

    if (selectedFile === null)
      return setAlert({
        severity: "error",
        flag: true,
        message: "You need to upload a file!",
      });

    if (action === "")
      return setAlert({
        severity: "error",
        flag: true,
        message: "You need to select an action!",
      });

    const formData = new FormData();
    formData.append("storeFile", selectedFile);
    formData.append("action", action);

    axios
      .post("http://localhost:5000/uploadFiles/stores", formData, config)
      .then((res) => {
        return setAlert({
          flag: true,
          message: res.data.message,
          severity: "success",
        });
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
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
          <Stores
            handleFileChange={handleFileChange}
            handleUpload={handleUpload}
            handleActionChange={handleActionChange}
            action={action}
          />
        </Paper>
      </div>
    </>
  );
}

export default Settings;
