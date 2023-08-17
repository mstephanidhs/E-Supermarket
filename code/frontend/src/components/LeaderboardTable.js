import { Chip, Paper } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { DataGrid } from "@mui/x-data-grid";

function LeaderBoardTable({ leaderboardUsers }) {
  const columns = [
    {
      field: "username",
      headerName: "Username",
      width: 120,
    },
    {
      field: "past_score",
      headerName: "Total Score",
      width: 120,
    },
    {
      field: "previous_month_tokens",
      headerName: "Tokens of Previous Month",
      width: 200,
    },
    {
      field: "total_tokens",
      headerName: "Total Tokens",
      width: 120,
    },
  ];

  return (
    <div
      style={{
        textAlign: "center",
        width: "140vh",
        margin: "4.8rem auto",
      }}
    >
      <Paper elevation={3} style={{ padding: "30px", borderRadius: "20px" }}>
        <Chip
          label="Leaderboard"
          color="primary"
          variant="outlined"
          icon={<EmojiEventsIcon />}
          size="medium"
          style={{
            marginTop: "10px",
            marginBottom: "40px",
            fontWeight: 600,
            letterSpacing: "0.75px",
            padding: "0 8px",
          }}
        />
        <div style={{ height: 350, padding: "0 3.6rem" }}>
          <DataGrid
            columns={columns}
            rows={leaderboardUsers}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
            }}
          />
        </div>
      </Paper>
    </div>
  );
}

export default LeaderBoardTable;
