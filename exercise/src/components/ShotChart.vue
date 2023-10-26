<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  CategoryScale,
  LinearScale,
  LineElement
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { Shot, useShotsStore } from '../store/shots';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ChartData {
  labels: string[],
  datasets: {
    label: string,
    backgroundColor: string,
    data: number[]
  }[]
}

const getChartData = (shots: Shot[]): any => {
  const data: ChartData = {
    labels: [],
    datasets: [{
      label: 'Round Score',
      backgroundColor: '#f87979',
      data: []
    }]
  }
  for (const shot of shots) {
    data.labels.push(`Shot ${shot.shotIndex + 1}`)
    data.datasets[0].data.push(shot.roundScore)
  }

  return data
}

const shotsStore = useShotsStore()

const options = {
  responsive: true,
  maintainAspectRatio: false
}
</script>

<template>
  <div class="chart-container">
    <Line :data="getChartData(shotsStore.shots)" :options="options" />
  </div>
</template>

<style>
.chart-container {
  width: 100%;
}
</style>
