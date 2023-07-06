import './App.css';
import TrainerDropdown from './components/trainerDropdown';
import LobbySidebar from './components/sidebar'; // import the sidebar component
import { useState, useEffect } from 'react';
import { Trainer } from './components/trainerDropdown';

function App() {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainers, setSelectedTrainers] = useState<(Trainer | null)[]>([null, null]);


  useEffect(() => {
      fetch('http://localhost:3000/trainers')
        .then(response => response.json())
        .then(data => {
          setTrainers(data);
          setSelectedTrainers([data[0], data[1]]);
        })
        .catch(error => console.error(error));
    }, []);

    const handleLobbySelect = async (lobbyId: string) => {
        const response = await fetch(`http://localhost:3000/trainers/lobby/${lobbyId}`);
        const data = await response.json();
        setTrainers(data);
        setSelectedTrainers([data[0], data[1] || null]);
      }

  return (
    <div>
      <LobbySidebar handleLobbySelect={handleLobbySelect} />
      <TrainerDropdown trainers={trainers} selectedTrainers={selectedTrainers} setSelectedTrainers={setSelectedTrainers} />
    </div>
  );
}

export default App;
