<script setup>
import { ref } from "vue";
import { getPokemonByUrl } from "../utils/api";

const props = defineProps({
  name: String,
  url: String,
});

const pokemonId = ref(0);
const imageUrl = ref(null);

// On load, get additional pokemon details for card
const fetchPokemonDetails = async (pokemonUrl) => {
  const { id, sprites } = await getPokemonByUrl(pokemonUrl);

  pokemonId.value = id;
  imageUrl.value = sprites.other["official-artwork"].front_default;
};

fetchPokemonDetails(props.url);

// Handle dialog popup
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

// Additional functions to help display card
const paddifyId = (number) => {
  return String(number).padStart(4, "0");
};

const capitaliseFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>

<template>
  <div
    class="bg-card-background p-4 h-full rounded-lg hover:cursor-pointer"
    @click="openDialog"
  >
    <img class="w-full" :src="imageUrl" :alt="`Picture of ${name}`" />
    <p class="text-center">{{ capitaliseFirst(name) }}</p>
  </div>

  <!-- Dialog -->
  <div v-if="dialog" class="fixed inset-0 flex items-center justify-center">
    <!-- Dialog grey thing -->
    <div class="bg-gray-800 bg-opacity-50 absolute inset-0"></div>

    <!-- Dialog card -->
    <div class="bg-card-background p-8 rounded-lg z-10 w-9/12 grid grid-cols-3">
      <!-- Dialog content -->
      <div class="col-span-1">
        <img class="w-full" :src="imageUrl" :alt="`Picture of ${name}`" />
        <h2 class="text-xl">{{ name }}</h2>
        <p class="text-secondary-text text-xl">{{ paddifyId(pokemonId) }}</p>

        <button
          class="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          @click="closeDialog"
        >
          Close
        </button>
      </div>
      <div class="col-span-2">hlleo</div>
    </div>
  </div>
</template>
