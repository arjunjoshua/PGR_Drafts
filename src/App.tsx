import './App.css';
import TrainerDropdown from './components/trainerDropdown';
import LobbySidebar from './components/sidebar'; // import the sidebar component
import { useState, useEffect } from 'react';
import { Trainer } from './components/trainerDropdown';

function App() {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainers, setSelectedTrainers] = useState<(Trainer | null)[]>([null, null]);
  const [selectedLobby, setSelectedLobby] = useState<{ _id: string; name: string }>({ _id: '64b3d97ba05427be59779158', name: 'MLC-GrandUnderground' });

    const handleLobbySelect = async (lobby: { _id: string; name: string }) => {
        const response = await fetch(`https://pgr-draft-backend.vercel.app/api/lobby/${lobby._id}`);
        const data = await response.json();
        setTrainers(data.trainers);
        setSelectedTrainers([data.trainers[0], data.trainers[1]]);
        setSelectedLobby(data.lobby);
      }

      useEffect(() => {
        fetch('https://pgr-draft-backend.vercel.app/api/lobby/64b3d97ba05427be59779158')
          .then(response => response.json())
          .then(data => {
            setTrainers(data.trainers);
            setSelectedTrainers([data.trainers[0], data.trainers[1]]);
          })
          .catch(error => console.error(error));
      }, []);

  return (
    <div className='app-body'>
      <LobbySidebar handleLobbySelect={handleLobbySelect} selectedLobbyID={selectedLobby._id}/>
      <h1>{selectedLobby?.name}</h1>
      <TrainerDropdown trainers={trainers} selectedTrainers={selectedTrainers} setSelectedTrainers={setSelectedTrainers} selectedLobby={selectedLobby} />
    </div>
  );
}

export default App;
