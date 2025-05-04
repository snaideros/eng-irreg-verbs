<template>
  <v-app-bar title="English Irregular Verbs">
    <v-spacer />
    <v-btn v-if="$route.path !== '/exercise'" to="/exercise">Exercise</v-btn>
    <v-chip v-else class="text-button text-primary mx-6">Exercise</v-chip>
  </v-app-bar>
</template>
