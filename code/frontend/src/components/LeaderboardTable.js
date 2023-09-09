import './../static/css/misc.css';

import { Chip, Paper } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { DataGrid } from '@mui/x-data-grid';

function LeaderBoardTable({ leaderboardUsers }) {
  const columns = [
    {
      field: 'username',
      headerName: 'Username',
      width: 120,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'past_score',
      headerName: 'Total Score',
      width: 120,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'previous_month_tokens',
      headerName: 'Tokens of Previous Month',
      width: 200,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'total_tokens',
      headerName: 'Total Tokens',
      width: 120,
      headerAlign: 'center',
      align: 'center',
    },
  ];

  return (
    <div
      style={{
        textAlign: 'center',
        width: '55vw',
        margin: '4.8rem auto',
      }}
    >
      <Paper elevation={3} style={{ padding: '3rem', borderRadius: '20px' }}>
        <Chip
          label='Leaderboard'
          color='primary'
          variant='outlined'
          icon={<EmojiEventsIcon />}
          size='medium'
          style={{
            marginTop: '0.7rem',
            marginBottom: '3.5rem',
            fontWeight: 600,
            letterSpacing: '0.75px',
            padding: '0 0.6rem',
          }}
        />
        <div style={{ height: 350, padding: '0 3.6rem' }}>
          <DataGrid
            columns={columns}
            rows={leaderboardUsers}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
            }}
            sx={{ textAlign: 'center' }}
          />
        </div>
      </Paper>
    </div>
  );
}

export default LeaderBoardTable;
