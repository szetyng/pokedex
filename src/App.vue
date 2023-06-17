<script setup>
import { ref } from "vue";
import { getPokemons } from "./utils/api";
import PokemonCard from "./components/PokemonCard.vue";

const pokemons = ref([]);
const nextPage = ref(null);
const currPage = ref(0);
const totalPokemons = ref(0);

const fetchPokemons = async (nextUrl = null, offset = 0) => {
  const { results, next, count } = await getPokemons(nextUrl, offset);

  pokemons.value.push(...results);
  nextPage.value = next;
  totalPokemons.value = count;

  // Increment offset
  currPage.value += 10;
};

// On page load
fetchPokemons();
</script>

<template>
  <header>
    <div>
      <span class="text-xl">Pokédex</span>
    </div>
  </header>

  <main>
    <span>Search for a Pokémon by name or id number</span>
    <div class="grid grid-cols-12 gap-4">
      <div class="grid grid-cols-6 gap-4 col-span-9">
        <PokemonCard
          v-for="pokemon in pokemons"
          :key="pokemon.name"
          :pokemonName="pokemon.name"
          :url="pokemon.url"
        />

        <button
          class="bg-primary py-4 px-4 my-auto rounded h-fit"
          @click="fetchPokemons(nextPage, currPage)"
        >
          <span class="font-bold">Load more</span>
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
