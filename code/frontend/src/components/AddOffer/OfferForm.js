import { Paper, Chip, TextField, Button } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

function OfferForm({ selectedProduct, setPrice, handleSubmit }) {
  return (
    <div
      style={{
        textAlign: "center",
        width: "500px",
        margin: "0 auto",
        marginTop: "50px",
        marginBottom: "80px",
      }}
    >
      <Paper elevation={3} style={{ padding: "30px", borderRadius: "10px" }}>
        <Chip
          label="Add Offer"
          color="primary"
          variant="outlined"
          icon={<LocalOfferIcon />}
          size="medium"
          style={{
            marginTop: "10px",
            marginBottom: "40px",
            fontWeight: 600,
            letterSpacing: "0.75px",
            padding: "0 8px",
          }}
        />
        <br />
        <TextField
          variant="outlined"
          disabled
          label="Product Name"
          style={{ marginBottom: "30px", width: "400px" }}
          defaultValue="Hello World"
          value={selectedProduct.label}
        />

        <TextField
          color="primary"
          variant="outlined"
          label="Price"
          style={{ marginBottom: "30px" }}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Paper>
    </div>
  );
}

export default OfferForm;
