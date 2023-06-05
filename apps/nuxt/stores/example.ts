import { defineStore } from 'pinia'

export const useExampleStore = defineStore('example', () => {
  const myVariable = ref(false)

  function toggleMyVariable() {
    myVariable.value = !myVariable.value
  }

  return {
    myVariable,
    toggleMyVariable,
  }
})
