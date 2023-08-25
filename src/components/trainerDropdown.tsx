import React, { useState, useRef } from 'react';
import Team from './team';
import '../styles/dropdown.css'
import '../App.css'
import { set } from 'mongoose';

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

const TrainerDropdown: React.FC<TrainerDropdownProps> = ({ trainers, selectedTrainers, setSelectedTrainers, selectedLobby, addPokemonToTrainer }) => {
  const [ showInput, setShowInput ] = useState<number | null>(null); // null = no input, 0 = input for trainer 1, 1 = input for trainer 2
  const [ pokemonName, setPokemonName ] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  
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
              <Team key={i} team={team.pokemons} />
            ))}
            <button className='add-pokemon-button' onClick={() => setShowInput(index)}>Add Pokemon</button>
            {showInput === index && (
              <div>
                <input
                 type='text'
                  placeholder='Pokemon Name'
                  ref={inputRef}
                  onBlur={() => setPokemonName(inputRef.current!.value)}
               />
              <button className='mon-submit' onClick={() => {
              setShowInput(null)
              addPokemonToTrainer(selectedTrainers[index]!._id, pokemonName)
              setPokemonName('')}}
              >
              Submit</button>
            </div>
            )}
            </div>
        </div>
      ))}
    </div>
  );
};


export default TrainerDropdown;
