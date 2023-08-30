import React from 'react';
import Select from 'react-select';
import pokemonNames from '../../scripts/pokemonNames.json';
import '../styles/pokemonSelect.css';

const POKEMON_LIST = pokemonNames.map(name => ({
  value: name,
  label: name.charAt(0).toUpperCase() + name.slice(1)
}));

type PokemonOption = {
    value: string;
    label: string;
  };

type PokemonSelectProps = {
    selectedPokemon: PokemonOption | null;
    setSelectedPokemon: (option: PokemonOption | null) => void;
  };
    

function PokemonSelectComponent({ selectedPokemon, setSelectedPokemon }: PokemonSelectProps) {
  return (
    <Select
      className="pokemon-select"
      classNamePrefix="pokemon-select"
      options={POKEMON_LIST}
      value={selectedPokemon}
      onChange={setSelectedPokemon}
      isSearchable={true}
      placeholder="Enter Pokemon Name"
    />
  );
}

export default PokemonSelectComponent;
