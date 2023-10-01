import '../styles/reportResult.css'
import '../styles/dropdown.css'
import { backend_url } from '../constants/constants'
import { useState } from 'react';
import { set } from 'mongoose';

interface ReportResultProps {
    trainer1: string,
    trainer2: string,
    trainer1ID: string,
    trainer2ID: string,
    setShowReportResult: (value: boolean) => void;
    lobbyID: string;
    setLoading: (value: boolean) => void;
}

const ReportResult = ({trainer1, trainer2, trainer1ID, trainer2ID, setShowReportResult, lobbyID, setLoading} : ReportResultProps) => {
    const [showMatchRecord1, setShowMatchRecord1] = useState<boolean>(false);
    const [showMatchRecord2, setShowMatchRecord2] = useState<boolean>(false);
    const [showTrainerNames, setShowTrainerNames] = useState<boolean>(true);
    const handleWinner = async (winnerID: string, winnerName: string, wins: number, losses: number) => {
        setLoading(true);
        try {
            const response = await fetch(`${backend_url}/recordResult`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                trainer1ID,
                trainer2ID,
                winner: winnerID,
                winnerName,
                lobbyID,
                wins,
                losses
            })
        });
        const responseData= await response.json();
        window.alert(responseData.message);     
        setShowReportResult(false);
        
        } catch (error) {
            console.error("Error recording result:", error);
        }
        setLoading(false);
    }

    const handleTrainerClick = (clickedTrainer: string) => {
        if (clickedTrainer === trainer1) {
            setShowMatchRecord1(true);
        } else {
            setShowMatchRecord2(true);
        }
        setShowTrainerNames(false);
    }

    const handleBackClick = () => {
        setShowTrainerNames(true);
        setShowMatchRecord1(false);
        setShowMatchRecord2(false);
    }

    return (
        <div className='modal' onClick={(e) => {
            if (e.target === e.currentTarget) {
                setShowReportResult(false)
            }
          }}>
            
            {showTrainerNames && (
            <div className='modal-content'>
            <button className='report-winner' onClick={() => handleTrainerClick(trainer1)}>{trainer1} won</button>
            <button className='report-winner' onClick={() => handleTrainerClick(trainer2)}>{trainer2} won</button>
            <button className='report-winner' onClick={() => handleWinner('0','Tie', 2, 2)}>Tie</button> 
            </div>
            )}
            {showMatchRecord1 && (
                <div className='modal-content'>
                <button className='report-winner' onClick={() => handleWinner(trainer1ID, trainer1, 3, 1)}>3-1</button>
                <button className='report-winner' onClick={() => handleWinner(trainer1ID, trainer1, 4, 0)}>4-0</button>
                <button className='back-button' onClick={() => handleBackClick()}>Back</button>
                </div>
            )}
            {showMatchRecord2 && (
                <div className='modal-content'>
                <button className='report-winner' onClick={() => handleWinner(trainer2ID, trainer2, 3, 1)}>3-1</button>
                <button className='report-winner' onClick={() => handleWinner(trainer2ID, trainer2, 4, 0)}>4-0</button>
                </div>
            )}
        </div>
    )
 }

export default ReportResult;