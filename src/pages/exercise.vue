<template>
  <v-container>
    <v-table hover>
      <thead>
        <tr>
          <th class="px-8">Translation</th>
          <th class="px-8">BV</th>
          <th class="px-8">Preterite</th>
          <th class="px-8">Past Participe</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(verb, ndx) in exercise"
          :key="ndx"
        >
          <td
            v-if="verb.input === 'translation'"
            class="px-8 font-weight-bold text-indigo-darken-1"
          >{{ verb.translation.join(', ') }}</td>
          <td v-else><v-text-field
            v-model="answers[`${ndx}_translation`]"
            autocomplete="off"
            :bg-color="color[`${ndx}_translation`]"
            hide-details
            label="translation"
            spellcheck="false"
          /></td>
          <td
            v-if="verb.input === 'bv'"
            class="px-8 font-weight-bold text-indigo-darken-1"
          >{{ verb.bv }}</td>
          <td v-else><v-text-field
            v-model="answers[`${ndx}_bv`]"
            autocomplete="off"
            :bg-color="color[`${ndx}_bv`]"
            hide-details
            label="bv"
            spellcheck="false"
          /></td>
          <td
            v-if="verb.input === 'preterite'"
            class="px-8 font-weight-bold text-indigo-darken-1"
          >{{ verb.preterite }}</td>
          <td v-else><v-text-field
            v-model="answers[`${ndx}_preterite`]"
            autocomplete="off"
            :bg-color="color[`${ndx}_preterite`]"
            hide-details
            label="preterite"
            spellcheck="false"
          /></td>
          <td
            v-if="verb.input === 'past_participe'"
            class="px-8 font-weight-bold text-indigo-darken-1"
          >{{ verb.past_participe }}</td>
          <td v-else><v-text-field
            v-model="answers[`${ndx}_past_participe`]"
            autocomplete="off"
            :bg-color="color[`${ndx}_past_participe`]"
            hide-details
            label="past participe"
            spellcheck="false"
          /></td>
        </tr>
      </tbody>
    </v-table>
    <div class="d-flex mt-5">
      <v-spacer />
      <v-btn color="success" @click="validate">Validate</v-btn>
    </div>
  </v-container>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useAppStore } from '@/stores/app.js';
  import { storeToRefs } from 'pinia';

  const shuffle = function shuffle (array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  };

  const validate = function validate () {
    exercise.value.forEach((verb, ndx) => {
      console.log(verb)
      keys.forEach(k => {
        console.log(k)
        if (k === verb.input) return;
        if (k === 'translation') {
          color.value[`${ndx}_${k}`] = verb[k].includes(answers.value[`${ndx}_${k}`]?.toLowerCase()?.trim())
            ? 'green'
            : 'red';
        } else {
          color.value[`${ndx}_${k}`] = verb[k] === answers.value[`${ndx}_${k}`]?.toLowerCase()?.trim()
            ? 'green'
            : 'red';
        }
      })
    });
  };

  const appStore = useAppStore();
  const { verbsList, selectedFamilies } = storeToRefs(appStore);
  const keys = ['bv', 'preterite', 'past_participe', 'translation'];
  const answers = ref({});
  const color = ref({});
  const exercise = computed(() => {
    const filteredVerbsList = selectedFamilies.value.length == 0
      ? verbsList.value
      : verbsList.value.reduce((a, v, n) => {
        if (selectedFamilies.value.includes(n)) a.push(v);
        return a;
      }, []);
    const list = [].concat(...filteredVerbsList.map(vl => vl.verbs.map(v => {
      const input = keys.at(Math.floor(Math.random() * 4));
      const out = {
        ...v,
        input,
      };
      return out;
    })));
    shuffle(list);
    return list;
  });
</script>
