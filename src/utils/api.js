import axios from "axios";

const BASEURL = "https://pokeapi.co/api/v2";

export const getPokemons = async (nextUrl = null, offset = 0) => {
  const url = nextUrl === null ? BASEURL + "/pokemon" : nextUrl;

  const config = {
    url: url,
    params: {
      limit: 10,
      offset: offset,
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
