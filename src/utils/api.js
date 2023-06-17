import axios from "axios";

const BASEURL = "https://pokeapi.co/api/v2";

export const getPokemons = async (nextUrl = null) => {
  const url = nextUrl === null ? BASEURL + "/pokemon" : nextUrl;

  const config = {
    url: url,
    params: {
      limit: 10,
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error retrieving Pokémon data:", error);
    throw error;
  }
};

export const getPokemonByNameOrId = async (key) => {
  const config = {
    url: BASEURL + "/pokemon/" + key,
  };

  try {
    const response = await axios(config);
    return {
      ...response.data,
      url: BASEURL + "/pokemon/" + key,
    };
  } catch (error) {
    console.error("Error retrieving Pokémon data:", error);
    throw error;
  }
};

export const getPokemonByUrl = async (url) => {
  const config = { url };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error retrieving Pokémon data:", error);
    throw error;
  }
};
