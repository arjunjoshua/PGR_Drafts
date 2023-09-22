import '../styles/scoreboard.css'
import { useState } from 'react';
import Scoreboard from './scoreboard';

interface ScoreboardProps {
    selectedLobbyID: string;
    lobbyName: string;
};

const ScoreboardButton = ({selectedLobbyID, lobbyName}: ScoreboardProps) => {
    const [showScoreboard, setShowScoreboard] = useState(false);
    return (
        <div>
        <button className='scoreboard-button' onClick={() => setShowScoreboard(true)}>Scoreboard</button>
        {showScoreboard &&
        <Scoreboard selectedLobbyID={selectedLobbyID} lobbyName={lobbyName} setShowScoreboard={setShowScoreboard}/>}
        </div>
    )
}

export default ScoreboardButton