import './App.css';
import TrainerDropdown from './components/trainerDropdown';
import LobbySidebar from './components/sidebar'; // import the sidebar component
import { useState, useEffect } from 'react';
import { Trainer } from './components/trainerDropdown';

function App() {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainers, setSelectedTrainers] = useState<(Trainer | null)[]>([null, null]);
  const [selectedLobby, setSelectedLobby] = useState<{ _id: string; name: string }>({ _id: '64a5564e3d4c0835cd854be7', name: 'MLC-GrandUnderground' });

    const handleLobbySelect = async (lobby: { _id: string; name: string }) => {
        const response = await fetch(`http://localhost:3000/trainers/lobby/${lobby._id}`);
        const data = await response.json();
        setTrainers(data.trainers);
        setSelectedTrainers([data.trainers[0], data.trainers[1]]);
        setSelectedLobby(data.lobby);
      }

      useEffect(() => {
        fetch('http://localhost:3000/trainers/lobby/64a5564e3d4c0835cd854be7')
          .then(response => response.json())
          .then(data => {
            setTrainers(data.trainers);
            setSelectedTrainers([data.trainers[0], data.trainers[1]]);
          })
          .catch(error => console.error(error));
      }, []);

  return (
    <div className='app-body'>
      <LobbySidebar handleLobbySelect={handleLobbySelect} />
      <h1>{selectedLobby?.name}</h1>
      <TrainerDropdown trainers={trainers} selectedTrainers={selectedTrainers} setSelectedTrainers={setSelectedTrainers} selectedLobby={selectedLobby} />
    </div>
  );
}

export default App;
