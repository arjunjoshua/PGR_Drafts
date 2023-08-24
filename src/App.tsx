import './App.css';
import TrainerDropdown from './components/trainerDropdown';
import LobbySidebar from './components/sidebar'; // import the sidebar component
import { useState, useEffect } from 'react';
import { Trainer } from './components/trainerDropdown';
import LoadingSpinner from './components/loadingSpinner';

function App() {
  const [loading, setLoading] = useState(true);
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainers, setSelectedTrainers] = useState<(Trainer | null)[]>([null, null]);
  const [selectedLobby, setSelectedLobby] = useState<{ _id: string; name: string }>({ _id: '64b3d97ba05427be59779158', name: 'MLC-GrandUnderground' });

  const addPokemonToTrainer = async (trainerId: string, pokemonName: string) => {  
      try {
        await fetch('YOUR_BACKEND_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainerId,
                pokemonName
            })
        });

        // Refetch the lobby data or handle the response as needed
        handleLobbySelect(selectedLobby); // for instance
    } catch (error) {
        console.error("Error adding Pokémon:", error);
    }
  };
  
  const handleLobbySelect = async (lobby: { _id: string; name: string }) => {
        setLoading(true);
        const response = await fetch(`https://pgr-draft-backend.vercel.app/api/lobby/${lobby._id}`);
        const data = await response.json();
        setTrainers(data.trainers);
        setSelectedTrainers([data.trainers[0], data.trainers[1]]);
        setSelectedLobby(data.lobby);
        setLoading(false);
      }

      useEffect(() => {
        setLoading(true);
        fetch('https://pgr-draft-backend.vercel.app/api/lobby/64b3d97ba05427be59779158')
          .then(response => response.json())
          .then(data => {
            setTrainers(data.trainers);
            setSelectedTrainers([data.trainers[0], data.trainers[1]]);
            setLoading(false);
          }) 
          .catch(error => {
            console.error(error);
            setLoading(false);
          });
      }, []);

  if (loading) {
   return <LoadingSpinner/>
  }
  
  return (
    <div className='app-body'>
      <LobbySidebar handleLobbySelect={handleLobbySelect} selectedLobbyID={selectedLobby._id}/>
      <h1>{selectedLobby?.name}</h1>
      <TrainerDropdown trainers={trainers} selectedTrainers={selectedTrainers} 
      setSelectedTrainers={setSelectedTrainers} selectedLobby={selectedLobby} 
      addPokemonToTrainer={addPokemonToTrainer} 
      />
    </div>
  );
}

export default App;
