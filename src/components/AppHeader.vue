<template>
  <v-app-bar>
    <template #title>
      <v-img
        inline
        src="https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg"
        width="30px"
      />
      Irregular Verbs
    </template>
    <v-btn v-if="$route.path !== '/exercise'" to="/exercise">Exercise</v-btn>
    <v-chip v-else class="text-button text-primary mx-6">Exercise</v-chip>
  </v-app-bar>
</template>
