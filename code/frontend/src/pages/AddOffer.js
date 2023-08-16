import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { useAuth } from "../context/Auth";
import Filters from "../components/AddOffer/Filters";

import {
  LinearProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import OfferForm from "../components/AddOffer/OfferForm";
import { containsOnlyNumbers } from "../util/containsOnlyNumbers";

function AddOffer() {
  const { storeId } = useParams();

  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({ id: "", label: "" });
  const [price, setPrice] = useState("");

  const [error, setError] = useState({ flag: false, message: "" });
  const [openAlert, setOpenAlert] = useState(true);
  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const [openForm, setOpenForm] = useState(false);

  const token = "Bearer " + sessionStorage.getItem("token");
  const config = {
    headers: {
      authorization: token,
    },
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    setOpenAlert(false);
  };

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setOpenForm(false);
  };

  const getAllCategories = () => {
    axios
      .get("http://localhost:5000/categories/getAllCategories", config)
      .then((res) => {
        setCategories(res.data.categories);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);

        setLoading(false);
      });
  };

  const getSubCategories = (categoryId) => {
    axios
      .get(
        `http://localhost:5000/categories/getSubCategories/${categoryId}`,
        config
      )
      .then((res) => {
        setSubCategories(res.data.subCategories);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  const getProducts = (categoryId, subCategoryId) => {
    axios
      .get(
        `http://localhost:5000/categories/products/${categoryId}&${subCategoryId}`,
        config
      )
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  const getAllProducts = () => {
    axios
      .get("http://localhost:5000/categories/allProducts", config)
      .then((res) => {
        setAllProducts(res.data.allProducts);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  const handleSubmit = () => {
    setError({ flag: false, message: "" });
    setOpenAlert(true);
    setDialogMessage("");

    if (price.length === 0)
      return setError({
        flag: true,
        message: "Invalid Form, you must fill the price field!",
      });

    if (containsOnlyNumbers(price) === false)
      return setError({
        flag: true,
        message: "The price field must contain only digits!",
      });

    axios
      .post(
        `http://localhost:5000/offer/addOffer`,
        {
          userId: sessionStorage.getItem("userId"),
          productId: selectedProduct.id,
          price: parseFloat(price),
          storeId,
        },
        config
      )
      .then((res) => {
        if (res.status === 400 || res.status === 401) {
          return setError({
            flag: true,
            message: error.response.data.message,
          });
        } else if (res.status === 200) {
          setDialogMessage(res.data.message);
          handleClickOpenDialog();
        }
      })
      .catch((error) => {
        if (error.response) {
          return setError({
            flag: true,
            message: error.response.data.message,
          });
        }
      });
  };

  return (
    <>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>
          {"Yor Offer has been submitted successfully!"}
        </DialogTitle>
        <DialogContent>{dialogMessage}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>OK</Button>
        </DialogActions>
      </Dialog>
      {error.flag ? (
        <Snackbar open={openAlert} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {error.message}
          </Alert>
        </Snackbar>
      ) : null}
      {loading === true ? (
        <LinearProgress />
      ) : (
        <>
          <Filters
            categories={categories}
            subCategories={subCategories}
            setSubCategories={setSubCategories}
            getSubCategories={getSubCategories}
            products={products}
            setProducts={setProducts}
            getProducts={getProducts}
            allProducts={allProducts}
            setOpenForm={setOpenForm}
            setSelectedProduct={setSelectedProduct}
          />

          {openForm === true ? (
            <OfferForm
              selectedProduct={selectedProduct}
              setPrice={setPrice}
              handleSubmit={handleSubmit}
            />
          ) : null}
        </>
      )}
    </>
  );
}

export default AddOffer;
