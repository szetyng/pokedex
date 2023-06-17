<script setup>
import { ref } from "vue";
import { getPokemonByNameOrId, getPokemons } from "./utils/api";
import PokemonCard from "./components/PokemonCard.vue";

const pokemons = ref([]);
const nextPage = ref(null);
const totalPokemons = ref(0);

const fetchPokemons = async (nextUrl = null) => {
  const { results, next, count } = await getPokemons(nextUrl);

  pokemons.value.push(...results);
  nextPage.value = next;
  totalPokemons.value = count;
};

// On page load
fetchPokemons();

// Handle search
const searchQuery = ref("");
const searchPokemon = async () => {
  // Clear pagination values
  nextPage.value = null;

  if (searchQuery.value === "") {
    pokemons.value = [];
    fetchPokemons();
    return;
  }

  try {
    const { name, url } = await getPokemonByNameOrId(
      searchQuery.value.toLowerCase()
    );
    pokemons.value = [{ name, url }];
  } catch (err) {
    alert(`Pokemon ${searchQuery.value} not found.`);
  }
};
</script>

<template>
  <header>
    <div>
      <span class="text-title font-bold">Pokédex</span>
    </div>
  </header>

  <main>
    <span class="block">Search for a Pokémon by name or id number</span>
    <div class="my-2 flex w-4/12">
      <input
        v-model="searchQuery"
        class="w-full px-4 py-2 rounded focus:outline-none"
        type="text"
        placeholder="Name or id number"
        @keyup.enter="searchPokemon"
      />
      <button class="px-4 py-2 rounded-r bg-white" @click="searchPokemon">
        <i class="pi pi-search"></i>
      </button>
    </div>

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
          @click="fetchPokemons(nextPage)"
        >
          <span class="font-bold">Load more</span>
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
