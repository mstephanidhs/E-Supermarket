import { Chip, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddReactionIcon from "@mui/icons-material/AddReaction";

function Reactions({ reactions }) {
  const columns = [
    {
      field: "product_name",
      headerName: "Product Name",
      width: 220,
    },
    {
      field: "price",
      headerName: "Product Price",
      width: 130,
    },
    {
      field: "store_name",
      headerName: "Store Name",
      with: 130,
    },
    {
      field: "is_like",
      headerName: "Like",
      width: 130,
    },
  ];
  return (
    <div style={{ textAlign: "center", width: "140vh", margin: "4.8rem auto" }}>
      <Paper elevation={2} style={{ padding: "30px", borderRadius: "20px" }}>
        <Chip
          label="Your Reactions"
          color="primary"
          variant="outlined"
          icon={<AddReactionIcon />}
          size="medium"
          style={{
            marginTop: "10px",
            marginBottom: "40px",
            fontWeight: 600,
            letterSpacing: "0.75px",
            padding: "0 8px",
          }}
        />
        <div style={{ height: 250, padding: "0 3.6rem" }}>
          <DataGrid
            columns={columns}
            rows={reactions}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </Paper>
    </div>
  );
}

export default Reactions;
