<script setup>
import { ref, computed } from "vue";
import { getPokemonByUrl } from "../utils/api";
import { useStorage } from "@vueuse/core";

const props = defineProps({
  pokemonName: String,
  url: String,
});

const pokemonId = ref(0);
const imageUrl = ref(null);
const tableData = ref([]);
const dialog = ref(false);

// On load, get additional pokemon details for card
const fetchPokemonDetails = async (pokemonUrl) => {
  const { id, sprites, height, weight, stats } = await getPokemonByUrl(
    pokemonUrl
  );

  const statRows = stats.map((s) => {
    return {
      label: s.stat.name,
      value: s.base_stat,
    };
  });

  tableData.value = [
    { label: "Height", value: height },
    { label: "Weight", value: weight },
    ...statRows,
  ];

  pokemonId.value = id;
  imageUrl.value = sprites.other["official-artwork"].front_default;
};

fetchPokemonDetails(props.url);

// Handle favouriting feature
const pokemonsLiked = useStorage("pokedexLikes", {});
const isLiked = computed(() => {
  return pokemonsLiked.value[pokemonId.value];
});
const toggleLike = (pokemonKey) => {
  pokemonsLiked.value[pokemonKey] = !pokemonsLiked.value[pokemonKey];
};

// Additional functions to help display card details
const paddifyId = (number) => {
  return String(number).padStart(4, "0");
};

const capitaliseFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const capitaliseStats = (str) => {
  if (str.length < 3) {
    return str.toUpperCase();
  } else {
    return str
      .replace("-", " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
};
</script>

<template>
  <div
    class="bg-card-background p-4 h-56 rounded-lg hover:cursor-pointer relative"
    @click="dialog = true"
  >
    <i
      @click.stop="toggleLike(pokemonId)"
      class="pi pi-heart-fill absolute top-0 right-0 mt-2 mr-2"
      :style="{
        color: isLiked ? '#EF4444' : '#F1F5F9',
        fontSize: '1.5rem ',
      }"
    ></i>
    <img
      class="w-full mb-4"
      :src="imageUrl"
      :alt="`Picture of ${pokemonName}`"
    />
    <p class="text-center font-bold">{{ capitaliseFirst(pokemonName) }}</p>
    <p class="text-center font-bold text-secondary-text">
      {{ paddifyId(pokemonId) }}
    </p>
  </div>

  <!-- Dialog -->
  <div
    v-if="dialog"
    class="fixed inset-0 flex items-center justify-center"
    style="z-index: 10"
  >
    <!-- Dialog grey thing -->
    <div class="bg-gray-800 bg-opacity-50 absolute inset-0"></div>

    <!-- Dialog card -->
    <div
      class="bg-card-background rounded-xl z-10 w-9/12 grid grid-cols-3 relative"
    >
      <div
        class="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:cursor-pointer absolute top-0 right-0 -mt-8 -mr-8"
        @click="dialog = false"
      >
        <i class="pi pi-times" style="font-size: 2rem"></i>
      </div>
      <!-- Dialog content -->

      <!-- First Column -->
      <div class="col-span-1 p-8 relative">
        <i
          @click="toggleLike(pokemonId)"
          class="pi pi-heart-fill absolute top-0 right-0 mt-6 mr-6 hover:cursor-pointer"
          :style="{
            color: isLiked ? '#EF4444' : '#F1F5F9',
            fontSize: '2.5rem ',
          }"
        ></i>

        <img
          class="w-full"
          :src="imageUrl"
          :alt="`Picture of ${pokemonName}`"
        />
        <h2 class="text-title font-bold text-center">
          {{ capitaliseFirst(pokemonName) }}
        </h2>
        <p class="text-secondary-text text-title font-bold text-center">
          {{ paddifyId(pokemonId) }}
        </p>
      </div>

      <!-- Second Column -->
      <div class="col-span-2 bg-empty-field p-8">
        <h2 class="text-title font-bold">Stats</h2>

        <div
          v-for="(row, index) in tableData"
          :key="index"
          class="grid grid-cols-12 gap-2 mb-2"
        >
          <div
            :class="[
              'col-span-8',
              index % 2 === 0 ? 'bg-white' : 'bg-slate-50',
              'p-2',
              'rounded',
              'font-bold',
            ]"
          >
            {{ capitaliseStats(row.label) }}
          </div>

          <div
            :class="[
              'col-span-4',
              index % 2 === 0 ? 'bg-white' : 'bg-slate-50',
              'p-2',
              'rounded',
              'font-bold',
            ]"
          >
            {{ row.value }}
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.heart-icon path {
  fill: black;
}
</style>
