import '../styles/scoreboard.css'
import { useState } from 'react';
import Scoreboard from './scoreboard';

interface ScoreboardProps {
    selectedLobbyID: string;
    setLoading: (value: boolean) => void;
};

const ScoreboardButton = ({selectedLobbyID, setLoading}: ScoreboardProps) => {
    const [showScoreboard, setShowScoreboard] = useState(false);
    return (
        <div>
        <button className='scoreboard-button' onClick={() => setShowScoreboard(true)}>Scoreboard</button>
        {showScoreboard &&
        <Scoreboard selectedLobbyID={selectedLobbyID} setShowScoreboard={setShowScoreboard} setLoading={setLoading}/>}
        </div>
    )
}

export default ScoreboardButton