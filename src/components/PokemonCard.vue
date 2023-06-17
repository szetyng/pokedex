<script setup>
import { ref } from "vue";
import { getPokemonByUrl } from "../utils/api";

const props = defineProps({
  name: String,
  url: String,
});

const pokemonId = ref(0);
const imageUrl = ref(null);

const fetchPokemonDetails = async (pokemonUrl) => {
  const { id, sprites } = await getPokemonByUrl(pokemonUrl);

  pokemonId.value = id;
  imageUrl.value = sprites.front_default;
};

fetchPokemonDetails(props.url);

const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};
</script>

<template>
  <div
    class="bg-card-background p-4 h-full rounded-lg hover:cursor-pointer"
    @click="openDialog"
  >
    <img class="w-full" :src="imageUrl" :alt="`Picture of ${name}`" />
    <p class="text-center">{{ name }}</p>
  </div>

  <!-- Dialog -->
  <div v-if="dialog" class="fixed inset-0 flex items-center justify-center">
    <!-- Dialog grey thing -->
    <div class="bg-gray-800 bg-opacity-50 absolute inset-0"></div>

    <!-- Dialog card -->
    <div class="bg-card-background p-8 rounded-lg z-10 w-9/12">
      <!-- Dialog content -->
      <h2 class="text-xl mb-4">{{ name }}</h2>
      <p>Pika pika.</p>

      <button
        class="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        @click="closeDialog"
      >
        Close
      </button>
    </div>
  </div>
</template>
