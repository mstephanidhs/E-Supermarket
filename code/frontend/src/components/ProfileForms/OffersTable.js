import { Paper, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import LocalOfferIcon from '@mui/icons-material/LocalOffer';

function OffersTable({ offers }) {
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
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'date_offer',
      headerName: 'Date Published',
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'stock',
      headerName: 'In Stock',
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'likes',
      headerName: 'Likes',
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'dislikes',
      headerName: 'Dislikes',
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
  ];

  return (
    <div
      style={{
        textAlign: 'center',
        width: '80vw',
        margin: '4.8rem auto',
      }}
    >
      <Paper elevation={2} style={{ padding: '2.4rem', borderRadius: '20px' }}>
        <Chip
          label='Your Offers'
          color='primary'
          variant='outlined'
          icon={<LocalOfferIcon />}
          size='medium'
          style={{
            marginTop: '0.6rem',
            marginBottom: '2rem',
            fontWeight: 600,
            letterSpacing: '0.75px',
            padding: '0 0.6rem',
          }}
        />
        <div style={{ height: 350, padding: '0 3.6rem' }}>
          <DataGrid
            columns={columns}
            rows={offers}
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

export default OffersTable;
