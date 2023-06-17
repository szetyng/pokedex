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
</script>

<template>
  <div class="bg-card-background p-4 h-full rounded-lg">
    <img class="w-full" :src="imageUrl" :alt="`Picture of ${name}`" />
    <p class="text-center">{{ name }}</p>
  </div>
</template>
