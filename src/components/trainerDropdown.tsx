import React, { useState, useRef } from 'react';
import Team from './team';
import '../styles/dropdown.css'
import '../App.css'
import PokemonSelectComponent from './pokemonSelect';

export interface Trainer {
  _id: string;
  name: string;
  teams: Team[];
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
}

type PokemonOption = {
  value: string;
  label: string;
};


const TrainerDropdown: React.FC<TrainerDropdownProps> = ({ trainers, selectedTrainers, setSelectedTrainers, selectedLobby, addPokemonToTrainer }) => {
  const [ showInput, setShowInput ] = useState<boolean>(false); 
  const [ selectedPokemon, setSelectedPokemon ] = useState<PokemonOption | null>(null);
  const [ selectedTeamId, setSelectedTeamId ] = useState<string>('');
  
  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTrainerId = event.target.value;
    const newSelectedTrainer = trainers.find(trainer => trainer._id === selectedTrainerId);
    const newSelectedTrainers = [...selectedTrainers];
    newSelectedTrainers[index] = newSelectedTrainer || null;
    setSelectedTrainers(newSelectedTrainers);
  };

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
            .map((team, i) => (
              <div key={team._id} className='team-container'>
              <Team team={team.pokemons} />
              <button 
                className='add-pokemon-button' 
                onClick={() => {
                    setShowInput(true);
                    setSelectedTeamId(team._id);  // Save the ID of the team to which we want to add a Pokemon
                }}
            >
                Add a Pokémon
            </button>
            </div>
            ))}
            {/* <button className='add-pokemon-button' onClick={() => setShowInput(index)}>Add Pokemon</button> */}
            {showInput && (
              <div className="modal" onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setShowInput(false);
                }
              }}>
                <div className="modal-content">
                  <PokemonSelectComponent 
                   selectedPokemon={selectedPokemon}
                   setSelectedPokemon={setSelectedPokemon} />
                  <button 
                    className='mon-submit' 
                    onClick={() => {
                      setShowInput(false);
                      if (selectedPokemon){
                      addPokemonToTrainer(selectedTeamId, selectedPokemon?.value);
                      }
                      setSelectedPokemon(null);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
            </div>
        </div>
      ))}
    </div>
  );
};


export default TrainerDropdown;
