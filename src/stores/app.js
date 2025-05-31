import { ref } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const verbsList = ref([]);
  const selectedFamilies = ref([]);
  axios.get('./verbs.json')
    .then(v => verbsList.value = v.data);
  return { verbsList, selectedFamilies };
})
