<!-- <template>
  <div>
    <canvas ref="lineChartCanvas" width="400" height="200"></canvas>
  </div>
</template>

<script setup lang="ts">
// import { WeatherTempData } from "../../types/weatherFetch.ts";
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const createLineChart = () => {
  const ctx = this.$refs.lineChartCanvas.getContext("2d");

  const data = {
    labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
    datasets: [
      {
        label: "Data Set",
        data: [11, 20, 15, 30, 15],
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
  };

  new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
};

onMounted(() => {
  createLineChart();
});

// export default defineComponent({
//   mounted() {
//     this.createLineChart();
//   },
//   methods: {
//     createLineChart() {
//       const ctx = this.$refs.lineChartCanvas.getContext("2d");

//       const data = {
//         labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
//         datasets: [
//           {
//             label: "Data Set",
//             data: [11, 20, 15, 30, 15],
//             borderColor: "rgba(75, 192, 192, 1)",
//             borderWidth: 2,
//             tension: 0.15,
//             fill: true,
//           },
//         ],
//       };

//       const options = {
//         responsive: true,
//         maintainAspectRatio: false,
//       };

//       new Chart(ctx, {
//         type: "line",
//         data: data,
//         options: options,
//       });
//     },
//   },
// });
</script>

<style>
/* Додайте стилі за необхідністю */
</style> -->

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const props = defineProps(["tempData"]);
console.log(props.tempData);

const createLineChart = (canvas) => {
  const ctx = canvas.getContext("2d");

  const data = {
    labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
    datasets: [
      {
        label: "Data Set",
        data: [11, 20, 15, 30, 15],
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
  };

  new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
};

onMounted(() => {
  const canvas = document.getElementById("lineChartCanvas");
  createLineChart(canvas);
});
</script>

<template>
  <div>
    <canvas id="lineChartCanvas" width="400" height="200"></canvas>
  </div>
</template>

<style>
/* Додайте стилі за необхідністю */
</style>
