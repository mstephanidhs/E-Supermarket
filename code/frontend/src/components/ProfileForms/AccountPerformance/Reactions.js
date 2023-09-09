import { Chip, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddReactionIcon from '@mui/icons-material/AddReaction';

function Reactions({ reactions }) {
  const columns = [
    {
      field: 'product_name',
      headerName: 'Product Name',
      width: 270,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'price',
      headerName: 'Product Price',
      width: 130,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'store_name',
      headerName: 'Store Name',
      width: 130,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'is_like',
      headerName: 'Like',
      width: 130,
      headerAlign: 'center',
      align: 'center',
    },
  ];
  return (
    <div style={{ textAlign: 'center', width: '60vw', margin: '4.8rem auto' }}>
      <Paper elevation={2} style={{ padding: '2.2rem', borderRadius: '20px' }}>
        <Chip
          label='Your Reactions'
          color='primary'
          variant='outlined'
          icon={<AddReactionIcon />}
          size='medium'
          style={{
            marginTop: '0.6rem',
            marginBottom: '2.8rem',
            fontWeight: 600,
            letterSpacing: '0.75px',
            padding: '0 0.6rem',
          }}
        />
        <div style={{ height: 300, padding: '0 3.6rem' }}>
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
