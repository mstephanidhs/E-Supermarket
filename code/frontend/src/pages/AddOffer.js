import { useEffect, useState } from "react";

import axios from "axios";
import { useAuth } from "../context/Auth";
import Filters from "../components/AddOffer/Filters";

import { LinearProgress } from "@mui/material";
import OfferForm from "../components/AddOffer/OfferForm";

function AddOffer() {
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [openForm, setOpenForm] = useState(false);

  const token = "Bearer " + auth.user.token;
  const config = {
    headers: {
      authorization: token,
    },
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

  return (
    <>
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
          />

          {openForm === true ? <OfferForm /> : null}
        </>
      )}
    </>
  );
}

export default AddOffer;
