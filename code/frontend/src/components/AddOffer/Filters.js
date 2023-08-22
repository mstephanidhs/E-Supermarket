import { useState } from "react";

import { Autocomplete, TextField, Grid, Button } from "@mui/material";

function Filters({
  categories,
  subCategories,
  getSubCategories,
  setSubCategories,
  products,
  setProducts,
  getProducts,
  allProducts,
  setOpenForm,
  setSelectedProduct,
}) {
  const [valueCategory, setValueCategory] = useState({ label: "", id: "" });
  const [valueSubCategory, setValueSubCategory] = useState({
    label: "",
    id: "",
  });
  const [valueProduct, setValueProduct] = useState({
    label: "",
    id: "",
  });
  const [searchProduct, setSearchProduct] = useState({
    label: "",
    id: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const handleCategoryChange = (event, input) => {
    setSearchProduct({ id: "", label: "" });
    setOpenForm(false);
    setValueSubCategory({ id: "", label: "" });
    setValueProduct({ id: "", label: "" });

    if (input === null) {
      setSubCategories([]);
      setValueCategory({ id: "", label: "" });
      setIsDisabled(true);
      return;
    }

    setValueCategory({ ...input });
    getSubCategories(input.id);
  };

  const handleSubCategoryChange = (event, input) => {
    setSearchProduct({ id: "", label: "" });
    setValueProduct({ id: "", label: "" });

    setOpenForm(false);

    if (input === null) {
      setValueSubCategory({ id: "", label: "" });
      setProducts([]);
      setIsDisabled(true);
      return;
    }

    setValueSubCategory({ ...input });
    getProducts(valueCategory.id, input.id);
  };

  const handleProductChange = (event, input) => {
    setSearchProduct({ id: "", label: "" });
    if (input === null) {
      setValueProduct({ id: "", label: "" });
      setIsDisabled(true);
      setOpenForm(false);

      return;
    }

    setValueProduct({ ...input });
    setIsDisabled(false);
    setSelectedProduct({ ...input });
  };

  const handleAllProductChange = (event, input) => {
    if (input === null) {
      setOpenForm(false);
      setSearchProduct({ id: "", label: "" });
      return;
    }

    setOpenForm(true);
    setValueCategory({ id: "", label: "" });
    setValueSubCategory({ id: "", label: "" });
    setValueProduct({ id: "", label: "" });
    setSelectedProduct({ ...input });
    setSearchProduct({ ...input });
  };

  const handleSubmit = () => {
    setOpenForm(true);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{ marginTop: "3.2rem", marginLeft: "6.4rem", width: "130vh" }}
      >
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
          <Autocomplete
            value={valueCategory}
            sx={{ width: 200 }}
            options={categories}
            onChange={handleCategoryChange}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Autocomplete
            onChange={handleSubCategoryChange}
            value={valueSubCategory}
            sx={{ width: 200 }}
            options={subCategories}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderInput={(params) => (
              <TextField {...params} label="Subcategory" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
          <Autocomplete
            value={valueProduct}
            onChange={handleProductChange}
            sx={{ width: 300 }}
            options={products}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderInput={(params) => <TextField {...params} label="Product" />}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ width: "6rem", marginLeft: "6rem" }}
            disabled={isDisabled}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Autocomplete
        sx={{ width: 300 }}
        value={searchProduct}
        options={allProducts}
        onChange={handleAllProductChange}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField {...params} label="Quick Product Search" />
        )}
        style={{ marginLeft: "7.38rem", marginTop: "2.4rem" }}
      />
    </>
  );
}

export default Filters;
