<script setup>
import { ref } from "vue";

import Card from "primevue/card";

const pokemon = ref({
  name: "Pikachu",
  id: 1,
});
</script>

<template>
  <Card>
    <template #title>{{ pokemon.name }}</template>
  </Card>
</template>
