import './App.css';
import TrainerDropdown from './components/trainerDropdown';
import LobbySidebar from './components/sidebar'; // import the sidebar component
import { useState, useEffect } from 'react';
import { Trainer } from './components/trainerDropdown';
import LoadingSpinner from './components/loadingSpinner';
import { backend_url } from './constants/constants';
import ScoreboardButton from './components/scoreboardButton';
import ReportResultButton from './components/reportResultButton';

function App() {
  const [loading, setLoading] = useState(true);
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainers, setSelectedTrainers] = useState<(Trainer | null)[]>([null, null]);
  const [selectedLobby, setSelectedLobby] = useState<{ _id: string; name: string }>({ _id: '64b3d97ba05427be59779158', name: 'MLC-GrandUnderground' });

  const addPokemonToTrainer = async (teamID: string, pokemonName: string) => {   
    try {
        await fetch(`${backend_url}/addPokemon`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                teamID,
                pokemonName,
            })
        });

        // Notify the user that the request was successful
        window.alert("Pokémon added successfully! Click OK or refresh to see the changes.");
        // Refetch the lobby data or handle the response as needed
        handleLobbySelect(selectedLobby); // for instance
    } catch (error) {
        console.error("Error adding Pokémon:", error);
    }
  };

  const removePokemonFromTrainer = async (teamID: string, pokemonName: string) => {
    console.log(teamID, pokemonName);
    try {
        await fetch(`${backend_url}/removePokemon`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                teamID,
                pokemonName,
            })
        });
        
        // Notify the user that the request was successful
        window.alert("Pokémon removed successfully! Click OK or refresh to see the changes.");
        // Refetch the lobby data or handle the response as needed
        handleLobbySelect(selectedLobby); // for instance
    } catch (error) {
        console.error("Error removing Pokémon:", error);
    } 
  };
  
  const handleLobbySelect = async (lobby: { _id: string; name: string }) => {
        setLoading(true);
        const response = await fetch(`${backend_url}/lobby/${lobby._id}`);
        const data = await response.json();
        setTrainers(data.trainers);
        setSelectedTrainers([data.trainers[0], data.trainers[1]]);
        setSelectedLobby(data.lobby);
        setLoading(false);
      }

      useEffect(() => {
        setLoading(true);
        fetch(`${backend_url}/lobby/64b3d97ba05427be59779158`)
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
      <div className='top-container'>
      <LobbySidebar handleLobbySelect={handleLobbySelect} selectedLobbyID={selectedLobby._id}/>
      <ScoreboardButton/>
      <ReportResultButton trainer1={selectedTrainers[0]?.name || "Trainer 1"} trainer2={selectedTrainers[1]?.name || "Trainer 2"}/>
      </div>
      <h1>{selectedLobby?.name}</h1>
      <TrainerDropdown trainers={trainers} selectedTrainers={selectedTrainers} 
      setSelectedTrainers={setSelectedTrainers} selectedLobby={selectedLobby} 
      addPokemonToTrainer={addPokemonToTrainer} removePokemonFromTrainer={removePokemonFromTrainer}
      />
    </div>
  );
}

export default App;
