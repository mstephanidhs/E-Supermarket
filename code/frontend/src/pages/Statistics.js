import { useEffect, useState } from "react";

import { monthToNumber } from "../util/monthToNumber";
import FilterFirstGraph from "../components/statistics/FilterFirstGraph";

import { Alert, LinearProgress, Snackbar } from "@mui/material";
import axios from "axios";
import FirstGraph from "../components/statistics/FirstGraph";
import FiltersSecondGraph from "../components/statistics/FiltersSecondGraph";

function Statistics() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [offerData, setOfferData] = useState([]);

  const [valueCategory, setValueCategory] = useState({ label: "", id: "" });
  const [valueSubCategory, setValueSubCategory] = useState({
    label: "",
    id: "",
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [error, setError] = useState({ flag: false, message: "" });
  const [openAlert, setOpenAlert] = useState(true);

  const [loading, setLoading] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    setOpenAlert(false);
  };

  const token = "Bearer " + sessionStorage.getItem("token");
  const config = {
    headers: {
      authorization: token,
    },
  };

  const handleDatePicker = (e) => {
    const userInput = e.$d;
    const monthAndYear = String(userInput).split(" ");
    const month = monthAndYear[1];
    const year = monthAndYear[3];

    setMonth(monthToNumber(month));
    setYear(year);
  };

  const handleOffersGraph = () => {
    setError({ flag: false, message: "" });
    setOpenAlert(true);

    if (month === "" || year === "")
      return setError({
        flag: true,
        message: "You must pick a month and a year",
      });

    axios
      .get(`http://localhost:5000/statistics/${month}&${year}`, config)
      .then((res) => {
        setOfferData(res.data.offers);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  const offersChartData = {
    labels: offerData.map((data) => data.day),
    datasets: [
      {
        label: "Total Offers of each Day",
        data: offerData.map((data) => data.offer_count),
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  const handleCategoryChange = (event, input) => {
    if (input === null) {
      setValueCategory({ id: "", label: "" });
      setValueSubCategory({ id: "", label: "" });
      return;
    }
    setValueCategory({ ...input });
    getSubCategories(input.id);
  };
  const handleSubCategoryChange = (event, input) => {
    if (input === null) {
      setValueSubCategory({ id: "", label: "" });
      return;
    }
    setValueSubCategory({ ...input });
  };

  const getAllCategories = () => {
    setLoading(true);

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
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    setError({ flag: false, message: "" });
    setOpenAlert(true);

    if (valueCategory.label === "")
      return setError({
        flag: true,
        message: "You must at least pick a category",
      });

    axios
      .get("http://localhost:5000/statistics/medianOffers/1&2", config)
      .then((res) => {})
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      {error.flag ? (
        <Snackbar open={openAlert} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {error.message}
          </Alert>
        </Snackbar>
      ) : null}
      <FilterFirstGraph
        handleDatePicker={handleDatePicker}
        handleOffersGraph={handleOffersGraph}
      />
      <FirstGraph offersChartData={offersChartData} />
      {loading === true ? (
        <LinearProgress />
      ) : (
        <FiltersSecondGraph
          valueCategory={valueCategory}
          valueSubCategory={valueSubCategory}
          categories={categories}
          subCategories={subCategories}
          handleCategoryChange={handleCategoryChange}
          handleSubCategoryChange={handleSubCategoryChange}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default Statistics;
