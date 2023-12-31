import React, { useState } from 'react';
import Team from './team';
import '../styles/dropdown.css';
import '../App.css';
import PokemonAddModal from './addPokemonModal';
import PokemonRemoveModal from './removePokemonModal';
import getResult from './getResult';

export interface Trainer {
  _id: string;
  name: string;
  teams: Team[];
}

interface MatchResponse {
  match: {
      _id: string;
      lobby: string;
      trainer1: string;
      trainer2: string;
      winner: string;
      winnerName: string;
      isReported: boolean;
      wins: number;
      losses: number;
      draws: number;
      __v: number;
  };
}

interface Team {
  _id: string;
  pokemons: string[];
  lobby: string;
}

interface TrainerDropdownProps {
  trainers: Trainer[];
  selectedTrainers: (Trainer | null)[];
  setSelectedTrainers: React.Dispatch<React.SetStateAction<(Trainer | null)[]>>;
  selectedLobby: { _id: string; name: string };
  addPokemonToTrainer: (trainerId: string, pokemonName: string) => void;
  removePokemonFromTrainer: (trainerId: string, pokemonName: string) => void;
  setResponseData: React.Dispatch<React.SetStateAction<MatchResponse | null>>;
}

type PokemonOption = {
  value: string;
  label: string;
};


const TrainerDropdown: React.FC<TrainerDropdownProps> = ({ trainers, selectedTrainers, setSelectedTrainers, selectedLobby, addPokemonToTrainer, removePokemonFromTrainer, setResponseData }) => {
  const [ showInput, setShowInput ] = useState<boolean>(false);
  const [ showInputRemove, setShowInputRemove ] = useState<boolean>(false);
  const [ selectedPokemon, setSelectedPokemon ] = useState<PokemonOption | null>(null);
  const [ selectedTeamId, setSelectedTeamId ] = useState<string>('');
  const [ selectedTeamPokemon, setSelectedTeamPokemon ] = useState<string[]>([]); // [

  const handleChange = (index: number) => async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTrainerId = event.target.value;
    const newSelectedTrainer = trainers.find(trainer => trainer._id === selectedTrainerId);
    const newSelectedTrainers = [...selectedTrainers];
    newSelectedTrainers[index] = newSelectedTrainer || null;
    setSelectedTrainers(newSelectedTrainers);

    // Fetch the result of the match if both trainers are selected
    getResult({
      trainer1ID: newSelectedTrainers[0]?._id || '',
      trainer2ID: newSelectedTrainers[1]?._id || '',
      lobbyID: selectedLobby._id,
      setResponseData: setResponseData });
  }



  return (
    <div>
      {[0, 1].map(index => (
        <div key={index}>
          <div className="trainer-selection">
            {/* <h3>Trainer {index + 1}: </h3> */}
            <select className='trainer-dropdown' value={selectedTrainers[index]?._id || ''} onChange={handleChange(index)}>
              {trainers.map(trainer => (
                <option key={trainer._id} value={trainer._id} disabled={selectedTrainers.some((selectedTrainer) => selectedTrainer && selectedTrainer._id === trainer._id)}>
                  {trainer.name}
                </option>
              ))}
            </select>
          {selectedTrainers[index] && selectedTrainers[index]!.teams
            .filter((team: Team) => team.lobby === selectedLobby._id)  // filter based on lobby
            .map((team) => (
              <div key={team._id} className='team-container'>
              <Team team={team.pokemons} />
              <div className='add-remove-container'>
              <button
                className='add-pokemon-button'
                onClick={() => {
                    setShowInput(true);
                    setSelectedTeamId(team._id);  // Save the ID of the team to which we want to add a Pokemon
                }}
            >
                Add a Pokémon
            </button>
            <button
                className='remove-pokemon-button'
                onClick={() => {
                    setShowInputRemove(true);
                    setSelectedTeamId(team._id);
                    setSelectedTeamPokemon(team.pokemons);
                }}
            >
                Remove a Pokémon
            </button>
            </div>
            </div>
            ))}
            {showInput && <PokemonAddModal
              showInput={showInput}
              setShowInput={setShowInput}
              selectedPokemon={selectedPokemon}
              setSelectedPokemon={setSelectedPokemon}
              selectedTeamId={selectedTeamId}
              addPokemonToTrainer={addPokemonToTrainer}
            />}
            {showInputRemove && <PokemonRemoveModal
              showInputRemove={showInputRemove}
              setShowInputRemove={setShowInputRemove}
              selectedPokemon={selectedPokemon}
              setSelectedPokemon={setSelectedPokemon}
              selectedTeamId={selectedTeamId}
              removePokemonFromTrainer={removePokemonFromTrainer}
              selectedTeamPokemon={selectedTeamPokemon}
            />}
            </div>
        </div>
      ))}
    </div>
  );
};


export default TrainerDropdown;
