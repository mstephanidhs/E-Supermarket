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

  const [isDisabled, setIsDisabled] = useState(true);

  const handleCategoryChange = (event, input) => {
    if (input === null) {
      setSubCategories([]);
      setValueSubCategory({ id: "", label: "" });
      setValueCategory({ id: "", label: "" });
      setValueProduct({ id: "", label: "" });
      setIsDisabled(true);
      return;
    }

    setValueCategory({ ...input });
    getSubCategories(input.id);
  };

  const handleSubCategoryChange = (event, input) => {
    if (input === null) {
      setValueSubCategory({ id: "", label: "" });
      setValueProduct({ id: "", label: "" });
      setProducts([]);
      setIsDisabled(true);
      return;
    }

    setValueSubCategory({ ...input });
    getProducts(valueCategory.id, input.id);
  };

  const handleProductChange = (event, input) => {
    if (input === null) {
      setValueProduct({ id: "", label: "" });
      setIsDisabled(true);
      return;
    }

    setValueProduct({ ...input });
    setIsDisabled(false);
  };

  const handleAllProductChange = (event, input) => {
    console.log(input);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{ marginTop: "3.2rem", marginLeft: "6.4rem", width: "130vh" }}
      >
        <Grid item xs={3}>
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
        <Grid item xs={3}>
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
        <Grid item xs={3}>
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
        <Grid item xs={3}>
          <Button
            variant="contained"
            sx={{ width: "100px", marginLeft: "6rem" }}
            disabled={isDisabled}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Autocomplete
        sx={{ width: 300 }}
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