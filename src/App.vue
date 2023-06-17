<script setup>
import PokemonCard from "./components/PokemonCard.vue";
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
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
