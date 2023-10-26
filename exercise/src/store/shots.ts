import { defineStore } from 'pinia'
// import { computed, ref } from 'vue'
import { shots as getShots } from '../api/shots'
import { ref } from 'vue'

export interface Snapshot {
  distance: number,
  height: number,
  milliseconds: number,
  pinDistance: number,
  position: {
    x: number,
    y: number,
    z: number
  },
  rollTime: number,
  speed: number,
  spin: {
    x: number,
    y: number,
    z: number
  },
  terrainType: string,
  topViewPosition: {
    x: number,
    y: number
  },
  type: string,
  windVelocity: {
    x: number,
    y: number,
    z: number
  }

}

export interface Shot {
  actionIndex: number,
  actionReason: string,
  actionType: string,
  aimHeading: number,
  carryDistance: number,
  clientTime: string,
  clubFaceAngle: number,
  clubHeadSpeed: number,
  clubPathAngle: number,
  clubTypeKey: string,
  courseHoleIndex: number,
  createdAt: Date,
  detectedHoleIndex: number,
  endedInHole: boolean,
  finalized: boolean,
  id: string,
  launchAngle: number,
  launchBackSpin: number,
  launchBallSpeed: number,
  launchDirection: number,
  launchSideSpin: number,
  mulligan: boolean,
  roundID: string,
  roundScore: number,
  roundScoreWithHandicap: number,
  roundSessionID: string,
  score: number,
  segmentScore: number,
  segmentScoreIndex: number,
  shotIndex: number,
  snapshots: Snapshot[],
  startedOnTee: boolean,
  totalDistance: number,
  trackingSystemClubTypeKey: string,
  trackingSystemKey: string,
  updatedAt: Date,
  userID: string
}

type SHOTS_LOAD_STATE = 'NONE' | 'LOADING' | 'SUCCESS' | 'FAILED'

export const useShotsStore = defineStore('shots', () => {
  const shots = ref<Shot[]>([])
  const error = ref<Error | undefined>()
  const loadState = ref<SHOTS_LOAD_STATE>('NONE')

  const loadShots = async (): Promise<void> => {
    loadState.value = 'LOADING'
    try {
      // Simulate a load.
      await wait(1.5)
      const res = await getShots()
      loadState.value = 'SUCCESS'
      shots.value = res
    } catch (err) {
      loadState.value = 'FAILED'
      error.value = err as Error
    }
  }

  return { shots, loadState, error, loadShots }
})

const wait = (sec: number): Promise<void> => {
  return new Promise(resolve => {
    window.setTimeout(() => {
      return resolve()
    }, sec * 1000)
  })
}
