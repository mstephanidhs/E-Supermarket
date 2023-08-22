import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function FirstGraph({ offersChartData }) {
  return (
    <div style={{ width: 900, height: 500, margin: "auto", marginTop: "4rem" }}>
      <Line data={offersChartData} />
    </div>
  );
}

export default FirstGraph;
