import React, { useEffect, useState } from 'react';
import Team from './team';

interface Trainer {
  _id: string;
  name: string;
  teams: Team[];
}

interface Team {
  _id: string;
  pokemons: string[];
}

const TrainerDropdown: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/trainers')
      .then(response => response.json())
      .then(data => {
        setTrainers(data);
        setSelectedTrainer(data[0]); // select the first trainer by default
      })
      .catch(error => console.error(error));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTrainerId = event.target.value;
    const newSelectedTrainer = trainers.find(trainer => trainer._id === selectedTrainerId);
    setSelectedTrainer(newSelectedTrainer || null);
  };

  return (
    <div>
      <select onChange={handleChange}>
        {trainers.map(trainer => (
          <option key={trainer._id} value={trainer._id}>
            {trainer.name}
          </option>
        ))}
      </select>
      {selectedTrainer && selectedTrainer.teams.map((team, index) => (
        <Team key={index} team={team.pokemons} />
      ))}
    </div>
  );
};

export default TrainerDropdown;