<script setup lang="ts">
import { onMounted } from 'vue';
import { useShotsStore } from './store/shots'

const shotsStore = useShotsStore()


onMounted(() => {
  shotsStore.allShots()
})
</script>

<template>
  <div>
    <template v-if="shotsStore.loadState === 'LOADING'">
      Spinner
    </template>
    <template v-else-if="shotsStore.loadState === 'FAILED'">
      {{ shotsStore.error }}
    </template>
    <template v-else-if="shotsStore.loadState === 'SUCCESS'">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              Hole
            </th>
            <th class="text-left">
              Shot
            </th>
            <th class="text-left">
              Club Type
            </th>
            <th class="text-left">
              Head Speed (mph)
            </th>
            <th class="text-left">
              Distance (yds)
            </th>
            <th class="text-left">
              Carry (yds)
            </th>
            <th class="text-left">
              Ball Speed (mph)
            </th>
            <th class="text-left">
              Back Spin (rpm)
            </th>
            <th class="text-left">
              Side Spin (rpm)
            </th>
            <th class="text-left">
              Launch Direction
            </th>
            <th class="text-left">
              Launch Angle
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="shot in shotsStore.shots" :key="shot.id">
            <td>{{ shot.courseHoleIndex }}</td>
            <td>{{ shot.shotIndex }}</td>
            <td>{{ shot.clubTypeKey }}</td>
            <td>{{ shot.clubHeadSpeed }}</td>
            <td>{{ shot.totalDistance }}</td>
            <td>{{ shot.carryDistance }}</td>
            <td>{{ shot.launchBallSpeed }}</td>
            <td>{{ shot.launchBackSpin }}</td>
            <td>
              {{ Math.abs(shot.launchSideSpin) }}
              <v-icon :icon="`mdi-arrow-${shot.launchSideSpin < 0 ? 'left' : 'right'}`" color="grey-darken-1" />
            </td>
            <td>
              {{ Math.abs(shot.launchDirection) }}°
              <v-icon :icon="`mdi-arrow-${shot.launchDirection < 0 ? 'left' : 'right'}`" color="grey-darken-1" />
            </td>
            <td>{{ shot.launchAngle.toFixed(2) }}°</td>
          </tr>
        </tbody>
      </v-table>
    </template>
  </div>
</template>

<style scoped>
</style>
