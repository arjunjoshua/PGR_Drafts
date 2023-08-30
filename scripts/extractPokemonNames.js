import fetch from 'node-fetch';
import { writeFile } from 'fs/promises';

async function extractPokemonNames() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1300');
    const data = await response.json();

    const pokemonNames = data.results.map(pokemon => pokemon.name);

    // Save to a file
    writeFile('pokemonNames.json', JSON.stringify(pokemonNames, null, 2));

    console.log('Pokémon names extracted and saved to pokemonNames.json');
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
}

extractPokemonNames();
