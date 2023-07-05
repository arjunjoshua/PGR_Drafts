import React, { useEffect, useState } from 'react';
import Team from './team';
import '../styles/dropdown.css'

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
  const [selectedTrainers, setSelectedTrainers] = useState<(Trainer | null)[]>([null, null]);

  useEffect(() => {
    fetch('http://localhost:3000/trainers')
      .then(response => response.json())
      .then(data => {
        setTrainers(data);
        setSelectedTrainers([data[0], data[1] || null]); // select the first two trainers by default
      })
      .catch(error => console.error(error));
  }, []);

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
          <select className='trainer-dropdown' onChange={handleChange(index)}>
            {trainers.map(trainer => (
              <option key={trainer._id} value={trainer._id}>
                {trainer.name}
              </option>
            ))}
          </select>
          {selectedTrainers[index] && selectedTrainers[index]!.teams.map((team, i) => (
            <Team key={i} team={team.pokemons} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TrainerDropdown;
