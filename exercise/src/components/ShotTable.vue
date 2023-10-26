<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useShotsStore } from '../store/shots';
import { getClubType } from '../utils/helpers';

type SelectItemKey = boolean | null | undefined | string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any);
type DataTableCompareFunction<T = any> = (a: T, b: T) => number;
type DataTableHeader = {
    key?: 'data-table-group' | 'data-table-select' | 'data-table-expand' | (string & {});
    value?: SelectItemKey;
    title: string;
    colspan?: number;
    rowspan?: number;
    fixed?: boolean;
    align?: 'start' | 'end' | 'center';
    width?: number | string;
    minWidth?: string;
    maxWidth?: string;
    sortable?: boolean;
    sort?: DataTableCompareFunction;
};

const shotsStore = useShotsStore()

const itemsPerPage = ref(10)
const headers: DataTableHeader[] = [
  { title: 'Hole', align: 'start', sortable: true, key: 'courseHoleIndex' },
  { title: 'Shot', align: 'start', sortable: true, key: 'shotIndex' },
  { title: 'Club Type', align: 'start', sortable: true, key: 'clubTypeKey' },
  { title: 'Head Speed (mph)', align: 'start', sortable: true, key: 'clubHeadSpeed' },
  { title: 'Distance (yds)', align: 'start', sortable: true, key: 'totalDistance' },
  { title: 'Carry (yds)', align: 'start', sortable: true, key: 'carryDistance' },
  { title: 'Ball Speed (mph)', align: 'start', sortable: true, key: 'launchBallSpeed' },
  { title: 'Back Spin (rpm)', align: 'start', sortable: true, key: 'launchBackSpin' },
  { title: 'Side Spin (rpm)', align: 'start', sortable: true, key: 'launchSideSpin' },
  { title: 'Launch Direction', align: 'start', sortable: true, key: 'launchDirection' },
  { title: 'Launch Angle', align: 'start', sortable: true, key: 'launchAngle' },
]

const tableData = computed(() => {
  return shotsStore.shots.map(shot => ({
    courseHoleIndex: shot.courseHoleIndex + 1,
    shotIndex: shot.shotIndex + 1,
    clubTypeKey: getClubType(shot.clubTypeKey),
    clubHeadSpeed: shot.clubHeadSpeed?.toFixed(2) || '-',
    totalDistance: shot.totalDistance?.toFixed(2) || '-' ,
    carryDistance: shot.carryDistance?.toFixed(2) || '-' ,
    launchBallSpeed: shot.launchBallSpeed?.toFixed(2) || '-' ,
    launchBackSpin: shot.launchBackSpin?.toFixed(2) || '-' ,
    launchSideSpin: shot.launchSideSpin,
    launchDirection: shot.launchDirection,
    launchAngle: shot.launchAngle,
    mulligan: shot.mulligan,
    startedOnTee: shot.startedOnTee,
    createdAt: shot.createdAt,
    roundScore: shot.roundScore
  }))
})

const expanded = ref([])
const clubFilter = ref('')

onMounted(() => {
  shotsStore.loadShots()
})

const filterClubType = (_value: string, query: string, item?: any): boolean | number | [number, number] | [number, number][] => {
  return item.columns.clubTypeKey.toLowerCase().includes(query.toLowerCase())

}
</script>

<template>
  <div>
    <template v-if="shotsStore.loadState === 'LOADING'">
      <v-progress-circular indeterminate :size="99" :width="12"></v-progress-circular>
    </template>
    <template v-else-if="shotsStore.loadState === 'FAILED'">
      {{ shotsStore.error }}
    </template>
    <template v-else-if="shotsStore.loadState === 'SUCCESS'">
      <v-data-table :search="clubFilter" :custom-filter=filterClubType item-value="shotIndex" v-model:expanded="expanded"
        v-model:items-per-page="itemsPerPage" :headers="headers" :items="tableData" show-expand class="elevation-1"
        density="default">

        <!-- Club Type filter input-->
        <template v-slot:top>
          <v-text-field v-model="clubFilter" label="Club Type" class="pa-4"></v-text-field>
        </template>

        <!-- Custom row expand display-->
        <template v-slot:expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length">
              <div class="extra-item">
                Is Mulligan: {{ item.mulligan }}
              </div>
              <div class="extra-item">
                On Tee: {{ item.startedOnTee }}
              </div>
              <div class="extra-item">
                Date: {{ new Date(item.createdAt).toLocaleString() }}
              </div>
              <div class="extra-item">
                Score: {{ item.roundScore }}
              </div>
            </td>
          </tr>
        </template>

        <!-- Custom column displays. -->
        <template v-slot:item.launchSideSpin="{ value }">
          <template v-if="value != 0">
            {{ Math.abs(Number(value.toFixed(2))) }}
            <v-icon :icon="`mdi-arrow-${value < 0 ? 'left' : 'right'}`" color="grey-darken-1" />
          </template>
          <template v-else>-</template>
        </template>
        <template v-slot:item.launchDirection="{ value }">
          <template v-if="value != 0">
            {{ Math.abs(Number(value.toFixed(2))) }}°
            <v-icon :icon="`mdi-arrow-${value < 0 ? 'left' : 'right'}`" color="grey-darken-1" />
          </template>
          <template v-else>-</template>
        </template>
        <template v-slot:item.launchAngle="{ value }">
          {{ value.toFixed(2) }}°
        </template>
      </v-data-table>
    </template>
  </div>
</template>

<style>
.extra-item {
  text-align: left;
  margin: 1rem;
}
</style>
