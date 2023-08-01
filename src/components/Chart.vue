<script setup>
import { ref, onMounted, watch } from "vue";
import Chart from "chart.js/auto";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const id = ref(null);
const props = defineProps(["tempData", "name"]);
let chartInstance = null;

// console.log(props.tempData);

const createLineChart = (canvas, data) => {
  Chart.defaults.color = "#ffffff";
  const ctx = canvas.getContext("2d");

  const chartData = {
    labels: data.map((item) => moment.unix(item.dt).format(" Do , h:mm")),
    datasets: [
      {
        label:
          props.tempData.length > 6
            ? "daytime temperature"
            : "weekly temperature",
        data: data.map((item) => item.main.temp),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        tension: 0.15,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,

        ticks: {
          color: "white",
        },
      },
      y: {
        display: true,

        ticks: {
          color: "white",
        },
      },
    },
  };

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "line",
    data: chartData,
    options: options,
  });
};

watch(
  () => props.tempData,
  (newData) => {
    if (newData && newData.length > 0) {
      const canvas = document.getElementById(`${props.name}`);
      createLineChart(canvas, newData);
    }
  }
);

onMounted(() => {
  const canvas = document.getElementById(`${props.name}`);
  createLineChart(canvas, props.tempData);
});
</script>

<template>
  <div>
    <canvas :id="props.name" width="400" height="200"></canvas>
  </div>
</template>

<style></style>
