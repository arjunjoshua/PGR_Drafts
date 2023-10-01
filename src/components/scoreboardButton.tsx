import '../styles/scoreboard.css'
import { useState } from 'react';
import Scoreboard from './scoreboard';

interface ScoreboardProps {
    selectedLobbyID: string;
};

const ScoreboardButton = ({selectedLobbyID}: ScoreboardProps) => {
    const [showScoreboard, setShowScoreboard] = useState(false);
    return (
        <div>
        <button className='scoreboard-button' onClick={() => setShowScoreboard(true)}>View Scoreboard</button>
        {showScoreboard &&
        <Scoreboard selectedLobbyID={selectedLobbyID} setShowScoreboard={setShowScoreboard}/>}
        </div>
    )
}

export default ScoreboardButton