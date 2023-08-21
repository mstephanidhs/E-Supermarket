import { useState } from "react";

import { monthToNumber } from "../util/monthToNumber";
import FilterFirstGraph from "../components/statistics/FilterFirstGraph";

import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import FirstGraph from "../components/statistics/FirstGraph";

function Statistics() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [offerData, setOfferData] = useState([]);

  const [error, setError] = useState({ flag: false, message: "" });
  const [openAlert, setOpenAlert] = useState(true);

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
    </>
  );
}

export default Statistics;
