import { useState } from 'react';

import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';

import SettingsForm from '../components/Settings/SettingsForm';

function Settings() {
  const [selectedStoreFile, setSelectedStoreFile] = useState(null);
  const [selectedProductFile, setSelectedProductFile] = useState(null);
  const [selectedPricesFile, setSelectedPricesFile] = useState(null);

  const [storeAction, setStoreAction] = useState('');
  const [productAction, setProductAction] = useState('');
  const [pricesAction, setPricesAction] = useState('');

  const [alert, setAlert] = useState({
    flag: false,
    message: '',
    severity: 'error',
  });
  const [openAlert, setOpenAlert] = useState(true);

  const token = 'Bearer ' + sessionStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: token,
    },
  };

  const handleStoreFileChange = (event) => {
    const file = event.target.files[0];

    if (file) setSelectedStoreFile(file);
    else setSelectedStoreFile(null);
  };
  const handleProductFileChange = (event) => {
    const file = event.target.files[0];

    if (file) setSelectedProductFile(file);
    else setSelectedProductFile(null);
  };
  const handlePricesFileChange = (event) => {
    const file = event.target.files[0];

    if (file) setSelectedPricesFile(file);
    else setSelectedPricesFile(null);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;

    setOpenAlert(false);
  };

  const handleStoreActionChange = (event) => {
    setStoreAction(event.target.value);
  };
  const handleProductActionChange = (event) => {
    setProductAction(event.target.value);
  };
  const handlePricesActionChange = (event) => {
    setPricesAction(event.target.value);
  };

  const handleStoreUpload = (e) => {
    e.preventDefault();

    setAlert({ flag: false, message: '', severity: 'error' });
    setOpenAlert(true);

    if (selectedStoreFile === null)
      return setAlert({
        severity: 'error',
        flag: true,
        message: 'You need to upload a file!',
      });

    if (storeAction === '')
      return setAlert({
        severity: 'error',
        flag: true,
        message: 'You need to select an action!',
      });

    const formData = new FormData();
    formData.append('storeFile', selectedStoreFile);
    formData.append('action', storeAction);

    axios
      .post('http://localhost:4000/uploadFiles/stores', formData, config)
      .then((res) => {
        return setAlert({
          flag: true,
          message: res.data.message,
          severity: 'success',
        });
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  const handleProductUpload = (e) => {
    e.preventDefault();

    setAlert({ flag: false, message: '', severity: 'error' });
    setOpenAlert(true);

    if (selectedProductFile === null)
      return setAlert({
        severity: 'error',
        flag: true,
        message: 'You need to upload a file!',
      });

    if (productAction === '')
      return setAlert({
        severity: 'error',
        flag: true,
        message: 'You need to select an action!',
      });

    const formData = new FormData();
    formData.append('productFile', selectedProductFile);
    formData.append('action', productAction);

    axios
      .post('http://localhost:4000/uploadFiles/products', formData, config)
      .then((res) => {
        return setAlert({
          flag: true,
          message: res.data.message,
          severity: 'success',
        });
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  const handlePricesUpload = (e) => {
    e.preventDefault();

    setAlert({ flag: false, message: '', severity: 'error' });
    setOpenAlert(true);

    if (selectedPricesFile === null)
      return setAlert({
        severity: 'error',
        flag: true,
        message: 'You need to upload a file!',
      });

    if (pricesAction === '')
      return setAlert({
        severity: 'error',
        flag: true,
        message: 'You need to select an action!',
      });

    const formData = new FormData();
    formData.append('pricesFile', selectedPricesFile);
    formData.append('action', pricesAction);

    axios
      .post('http://localhost:4000/uploadFiles/prices', formData, config)
      .then((res) => {
        return setAlert({
          flag: true,
          message: res.data.message,
          severity: 'success',
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
      <SettingsForm
        handleStoreFileChange={handleStoreFileChange}
        handleStoreUpload={handleStoreUpload}
        handleStoreActionChange={handleStoreActionChange}
        storeAction={storeAction}
        handleProductFileChange={handleProductFileChange}
        productAction={productAction}
        handleProductActionChange={handleProductActionChange}
        handleProductUpload={handleProductUpload}
        handlePricesFileChange={handlePricesFileChange}
        pricesAction={pricesAction}
        handlePricesActionChange={handlePricesActionChange}
        handlePricesUpload={handlePricesUpload}
      />
    </>
  );
}

export default Settings;
