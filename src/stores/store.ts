import { defineStore } from 'pinia'
export const Store = defineStore('DefaultStore', () => {
  return {
    firebaseArr: [] as Array<[]>
  }
})
