//import React, { useEffect, useState } from 'react';
import Team from './team';
import '../styles/dropdown.css'
import '../App.css'

export interface Trainer {
  _id: string;
  name: string;
  teams: Team[];
}

interface Team {
  _id: string;
  pokemons: string[];
}

interface TrainerDropdownProps {
  trainers: Trainer[];
  selectedTrainers: (Trainer | null)[];
  setSelectedTrainers: React.Dispatch<React.SetStateAction<(Trainer | null)[]>>;
}

const TrainerDropdown: React.FC<TrainerDropdownProps> = ({ trainers, selectedTrainers, setSelectedTrainers }) => {
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
            <h1>Trainer {index + 1}: </h1>
            <select className='trainer-dropdown' value={selectedTrainers[index]?._id || ''} onChange={handleChange(index)}>
              {trainers.map(trainer => (
                <option key={trainer._id} value={trainer._id}>
                  {trainer.name}
                </option>
              ))}
            </select>
          </div>
          {selectedTrainers[index] && selectedTrainers[index]!.teams.map((team, i) => (
            <Team key={i} team={team.pokemons} />
          ))}
        </div>
      ))}
    </div>
  );
};


export default TrainerDropdown;
