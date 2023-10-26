<script setup lang="ts">
import { onMounted } from 'vue';
import ShotChart from './components/ShotChart.vue';
import ShotTable from './components/ShotTable.vue'
import { useShotsStore } from './store/shots';

const shotsStore = useShotsStore()
onMounted(() => {
  shotsStore.loadShots()
})

</script>

<template>
  <h1>TruGolf Shots</h1>
  <h2>by Gradey Cullins</h2>
  <div class="spacer" />
  <template v-if="shotsStore.loadState === 'LOADING'">
    <v-progress-circular indeterminate :size="99" :width="12"></v-progress-circular>
  </template>
  <template v-else-if="shotsStore.loadState === 'FAILED'">
    {{ shotsStore.error }}
  </template>
  <template v-else-if="shotsStore.loadState === 'SUCCESS'">
    <ShotTable />
    <div class="spacer" />
    <ShotChart />
  </template>
</template>

<style scoped>
.spacer {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
