import { Paper } from '@mui/material';

import Stores from './Stores';
import Products from './Products';
import Prices from './Prices';

function SettingsForm({
  handleStoreFileChange,
  handleStoreUpload,
  handleStoreActionChange,
  storeAction,
  handleProductFileChange,
  productAction,
  handleProductActionChange,
  handleProductUpload,
  handlePricesFileChange,
  pricesAction,
  handlePricesActionChange,
  handlePricesUpload,
}) {
  return (
    <div
      style={{
        textAlign: 'center',
        width: '50vw',
        margin: '10vh auto',
      }}
    >
      <Paper elevation={3} style={{ padding: '2rem', borderRadius: '20px' }}>
        <Stores
          handleStoreFileChange={handleStoreFileChange}
          handleStoreUpload={handleStoreUpload}
          handleStoreActionChange={handleStoreActionChange}
          storeAction={storeAction}
        />
        <Products
          handleProductFileChange={handleProductFileChange}
          productAction={productAction}
          handleProductActionChange={handleProductActionChange}
          handleProductUpload={handleProductUpload}
        />
        <Prices
          handlePricesFileChange={handlePricesFileChange}
          pricesAction={pricesAction}
          handlePricesActionChange={handlePricesActionChange}
          handlePricesUpload={handlePricesUpload}
        />
      </Paper>
    </div>
  );
}

export default SettingsForm;
