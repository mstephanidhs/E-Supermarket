import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function SecondGraph({ avgChartData }) {
  return (
    <div style={{ width: 900, height: 500, margin: "auto", marginTop: "4rem" }}>
      <Line data={avgChartData} />
    </div>
  );
}

export default SecondGraph;
