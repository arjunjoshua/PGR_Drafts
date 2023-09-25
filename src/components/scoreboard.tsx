import { backend_url } from "../constants/constants";
import { useEffect, useState } from "react";
import '../styles/scoreboard.css'
import '../styles/scoreboardTable.css'

interface Trainer {
    name: string;
    gamesPlayed: number;
    won: number;
    lost: number;
    tied: number;
    points: number;
};

interface ScoreboardProps {
    selectedLobbyID: string;
    setShowScoreboard: (value: boolean) => void;
    setLoading: (value: boolean) => void;
};

const Scoreboard = ({selectedLobbyID, setShowScoreboard, setLoading}: ScoreboardProps) => {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [fetchingScores, setFetchingScores] = useState(false);

    const fetchScores = async () => {
        setFetchingScores(true);
        try{
            const response = await fetch(`${backend_url}/lobby/lobbyScore?lobbyID=${selectedLobbyID}`, {
                method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
            const data = await response.json();
            const fetchedTrainers = data.lobbyScores.map((score: any) => ({
                name: score.trainer.name,
                gamesPlayed: score.matchesPlayed,
                won: score.matchesWon,
                lost: score.matchesLost,
                tied: score.matchesTied,
                points: score.points
            }));
            setTrainers(fetchedTrainers);
            console.log("Trainer data set");
        }
        catch (error) {
            console.error("Error fetching scores:", error);
        }
        setFetchingScores(false);
    }

    useEffect(() => {
        fetchScores();
    }, []);

    return (
        <div className='scoreboard-modal' onClick={(e) => {
            if (e.target === e.currentTarget) {
                setShowScoreboard(false)
            }
          }}>
            <div className='scoreboard-modal-content'>
            <table>
                <thead>
                    <tr>
                        <th>Trainer</th>
                        <th>Played</th>
                        <th>Won</th>
                        <th>Lost</th>
                        <th>Tied</th>
                        <th>Points</th>
                    </tr>
                </thead>
                    <tbody>
                    {fetchingScores ? (
                        <tr>
                            <td colSpan={6} className="center-td">Populating data......</td>
                        </tr>
                    ) : (
                        trainers.map((trainer, index) => (
                            <tr key={index}>
                                <td>{trainer.name}</td>
                                <td>{trainer.gamesPlayed}</td>
                                <td>{trainer.won}</td>
                                <td>{trainer.lost}</td>
                                <td>{trainer.tied}</td>
                                <td>{trainer.points}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            </div>
         </div>
    )
}

export default Scoreboard;