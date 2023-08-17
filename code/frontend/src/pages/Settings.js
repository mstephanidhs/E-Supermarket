import { Paper } from "@mui/material";
import Stores from "../components/Settings/Stores";

function Settings() {
  return (
    <div
      style={{
        textAlign: "center",
        width: "100vh",
        margin: "0 auto",
        marginTop: "10vh",
      }}
    >
      <Paper elevation={3} style={{ padding: "30px", borderRadius: "20px" }}>
        <Stores />
      </Paper>
    </div>
  );
}

export default Settings;
