<template>
  <v-container class="fill-height" max-width="700">
    <v-row
      v-for="(f, ndx) in verbsList"
      :key="f.family"
    >
      <v-col cols="12">
        <v-card
          elevation="3"
        >
          <v-card-title class="text-center pa-3" :class="{ [`bg-${colors[ndx]}`]: true }">
            {{ f.family }}
          </v-card-title>
          <v-card-text class="pa-0 pt-2">
            <v-table
              density="compact"
              hover
            >
              <thead>
                <tr>
                  <th class="text-left">BV</th>
                  <th class="text-left">Preterite</th>
                  <th class="text-left">Past Participe</th>
                  <th class="text-left">Translation</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="v of f.verbs"
                  :key="v.index"
                >
                  <td>{{ v.bv }}</td>
                  <td>{{ v.preterite }}</td>
                  <td>{{ v.past_participe }}</td>
                  <td>{{ v.translation.join(', ') }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { useAppStore } from '@/stores/app';
  import { storeToRefs } from 'pinia';

  const colors= [
    //'red',
    'pink',
    //'purple',
    'deep-purple',
    //'indigo',
    'blue',
    //'light-blue',
    'cyan',
    //'teal',
    'green',
    //'light-green',
    'lime',
    //'yellow',
    'amber',
    //'orange',
    'deep-orange',
    //'brown',
  ];
  const appStore = useAppStore();
  const { verbsList } = storeToRefs(appStore);
</script>
