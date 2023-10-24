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
    wins: number;
    losses: number;
    draws?: number;
};

interface ScoreboardProps {
    selectedLobbyID: string;
    showScoreboard: boolean;
    setShowScoreboard: (value: boolean) => void;
};

const Scoreboard = ({ selectedLobbyID, showScoreboard, setShowScoreboard }: ScoreboardProps) => {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [fetchingScores, setFetchingScores] = useState(false);

    const closeScoreboard = () => setShowScoreboard(false);

    const handlePopState = (e: Event) => {
        closeScoreboard();
        e.preventDefault();
    };

    useEffect(() => {
        if (showScoreboard) {
            window.history.pushState({}, '', window.location.pathname);
            window.addEventListener('popstate', handlePopState);
        }

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [setShowScoreboard]);

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
                points: score.points,
                wins: score.wins,
                losses: score.losses,
                draws: score.draws || 0
            }));
            //sort by points
            fetchedTrainers.sort((a: Trainer, b: Trainer) => b.points - a.points);
            setTrainers(fetchedTrainers);
        }
        catch (error) {
            console.error("Error fetching scores:", error);
        }
        setFetchingScores(false);
    };

    useEffect(() => {
        fetchScores();
    }, []);

    return (
        <div className='scoreboard-modal' onClick={(e) => {
            if (e.target === e.currentTarget) {
                closeScoreboard();
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
                        <th>Record</th>
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
                                <td>
                                    {`${trainer.wins}-${trainer.losses}`}
                                    {trainer.draws && trainer.draws > 0 ? `-${trainer.draws}` : ''}    
                                </td>
                                <td>{trainer.points}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <button className='close-scoreboard' onClick={() => setShowScoreboard(false)}>Close</button>
            </div>
         </div>
    )
}

export default Scoreboard;

