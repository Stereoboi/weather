<script setup>
import { ref, onMounted, watch } from "vue";
import Chart from "chart.js/auto";
import moment from "moment";

const props = defineProps(["tempData", "name"]);
let chartInstance = null;

console.log(props.name);

const createLineChart = (canvas, data) => {
  const ctx = canvas.getContext("2d");

  const chartData = {
    labels: data.map((item) => moment.unix(item.dt).format("MMMM Do , h")),
    datasets: [
      {
        label: "Data Set",
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
  };

  if (chartInstance) {
    chartInstance.destroy(); // Знищуємо попередній графік, якщо він існує
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

<style>
/* Додайте стилі за необхідністю */
</style>
