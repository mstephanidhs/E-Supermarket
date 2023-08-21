import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function FirstGraph({ offersChartData }) {
  return (
    <div
      style={{ width: 1000, height: 1000, margin: "auto", marginTop: "3rem" }}
    >
      <Line data={offersChartData} />
    </div>
  );
}

export default FirstGraph;
