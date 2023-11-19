import '../App.css';
import TrainerDropdown from './trainerDropdown';
import LobbySidebar from './sidebar'; // import the sidebar component
import { useState, useEffect } from 'react';
import { Trainer } from './trainerDropdown';
import LoadingSpinner from './loadingSpinner';
import { backend_url } from '../constants/constants';
import ScoreboardButton from './scoreboardButton';
import ReportResultButton from './reportResultButton';

interface MatchResponse {
  match: {
      _id: string;
      lobby: string;
      trainer1: string;
      trainer2: string;
      winner: string;
      winnerName: string;
      isReported: boolean;
      __v: number;
  };
}

function PvpTeams() {
  const [loading, setLoading] = useState(true);
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainers, setSelectedTrainers] = useState<(Trainer | null)[]>([null, null]);
  const [selectedLobby, setSelectedLobby] = useState<{ _id: string; name: string }>({ _id: '65142ad50dab588c547ffff5', name: 'ML-Gaspar' });
  const [responseData, setResponseData] = useState<MatchResponse |null>(null); // Added state for response data

  const addPokemonToTrainer = async (teamID: string, pokemonName: string) => {   
    setLoading(true);
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
        //window.alert("Pokémon added successfully!");
        // Refetch the lobby data or handle the response as needed
        handleRefresh(selectedLobby, selectedTrainers); // for instance
    } catch (error) {
        console.error("Error adding Pokémon:", error);
        setLoading(false);
    }
  };

  const removePokemonFromTrainer = async (teamID: string, pokemonName: string) => {
    setLoading(true);
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
        //window.alert("Pokémon removed successfully!");
        // Refetch the lobby data or handle the response as needed
        handleRefresh(selectedLobby, selectedTrainers) // for instance
    } catch (error) {
        console.error("Error removing Pokémon:", error);
        setLoading(false);
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

  const handleRefresh = async (lobby: { _id: string; name: string }, selectedTrainers: (Trainer | null)[]) => {
    try {
        const response = await fetch(`${backend_url}/lobby/${lobby._id}`);
        const data = await response.json();

        // Update the selected trainers with the new data
        const updatedSelectedTrainers = selectedTrainers.map((selectedTrainer) => {
            if (!selectedTrainer) return null;
            // Find the updated trainer data from the fetched trainers
            const updatedTrainer = data.trainers.find((trainer: Trainer) => trainer._id === selectedTrainer._id);
            // If found, return the updated data, otherwise return the original selected trainer
            return updatedTrainer || selectedTrainer;
        });

        setTrainers(data.trainers);
        setSelectedTrainers(updatedSelectedTrainers);
        setSelectedLobby(data.lobby);
    } catch (error) {
        console.error("Error refreshing data:", error);
    } finally {
        setLoading(false);
    }
  }

      useEffect(() => {
        setLoading(true);
        fetch(`${backend_url}/lobby/65142ad50dab588c547ffff5`)
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
      <ScoreboardButton selectedLobbyID={selectedLobby._id}/>
      <ReportResultButton trainer1={selectedTrainers[0]?.name || "Trainer 1"} trainer2={selectedTrainers[1]?.name || "Trainer 2"}
      trainer1ID={selectedTrainers[0]?._id || '0'} trainer2ID={selectedTrainers[1]?._id || '0'} lobbyID={selectedLobby._id} 
      setLoading={setLoading}/>
      </div>
      <h1>{selectedLobby?.name}</h1>
      {responseData?.match?.isReported ? (
          responseData?.match?.winnerName === "Tie (2-2)" || responseData?.match?.winnerName === "Tie" ? (
              <h3>It was a tie!</h3>
          ) : responseData?.match?.winnerName ? (
              <h3>{responseData.match.winnerName} won!</h3>
          ) : null
      ) : (
          <h4>Match result pending..</h4>
      )}
      <TrainerDropdown trainers={trainers} selectedTrainers={selectedTrainers} 
      setSelectedTrainers={setSelectedTrainers} selectedLobby={selectedLobby} 
      addPokemonToTrainer={addPokemonToTrainer} removePokemonFromTrainer={removePokemonFromTrainer}
      setResponseData={setResponseData}
      />
    </div>
  );
}

export default PvpTeams;
