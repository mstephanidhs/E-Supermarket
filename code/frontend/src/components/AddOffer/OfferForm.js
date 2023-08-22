import { Paper, Chip, TextField, Button } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

function OfferForm({ selectedProduct, setPrice, handleSubmit }) {
  return (
    <div
      style={{
        textAlign: "center",
        width: "30rem",
        margin: "0 auto",
        marginTop: "4.4rem",
        marginBottom: "7.2rem",
      }}
    >
      <Paper elevation={3} style={{ padding: "2.8rem", borderRadius: "10px" }}>
        <Chip
          label="Add Offer"
          color="primary"
          variant="outlined"
          icon={<LocalOfferIcon />}
          size="medium"
          style={{
            marginTop: "0.6rem",
            marginBottom: "3.4rem",
            fontWeight: 600,
            letterSpacing: "0.75px",
            padding: "0 0.6rem",
          }}
        />
        <br />
        <TextField
          variant="outlined"
          disabled
          label="Product Name"
          style={{ marginBottom: "2.2rem", width: "20rem" }}
          value={selectedProduct.label}
        />

        <TextField
          color="primary"
          variant="outlined"
          label="Price"
          style={{ marginBottom: "2rem" }}
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
