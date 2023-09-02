import Select from 'react-select';
import '../styles/pokemonSelect.css';

type PokemonOption = {
    value: string;
    label: string;
  };

type PokemonRemoveProps = {
    selectedPokemon: PokemonOption | null;
    setSelectedPokemon: (option: PokemonOption | null) => void;
    team: string[];
  };
    

function PokemonRemoveComponent({ selectedPokemon, setSelectedPokemon, team }: PokemonRemoveProps) {
  return (
    <Select
      className="pokemon-select"
      classNamePrefix="pokemon-select"
      options={team.map(name => ({ value: name, label: name.charAt(0).toUpperCase() + name.slice(1) }))}
      value={selectedPokemon}
      onChange={setSelectedPokemon}
      placeholder="Select Pokemon"
    />
  );
}

export default PokemonRemoveComponent;
