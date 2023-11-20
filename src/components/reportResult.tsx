import '../styles/reportResult.css'
import '../styles/dropdown.css'
import { backend_url } from '../constants/constants'
import { useState, useEffect } from 'react';

interface ReportResultProps {
    trainer1: string,
    trainer2: string,
    trainer1ID: string,
    trainer2ID: string,
    showReportResult: boolean,
    setShowReportResult: (value: boolean) => void;
    lobbyID: string;
    setLoading: (value: boolean) => void;
}

enum ModalState {
    TRAINER_NAMES,
    MATCH_RECORD1,
    MATCH_RECORD2
}

const ReportResult = ({ trainer1, trainer2, trainer1ID, trainer2ID, showReportResult, setShowReportResult, lobbyID, setLoading }: ReportResultProps) => {
    const [modalState, setModalState] = useState<ModalState>(ModalState.TRAINER_NAMES);

    const closeModal = () => setShowReportResult(false);

    const handlePopState = (e: Event) => {
        closeModal();
        e.preventDefault();
    };

    useEffect(() => {
        if (showReportResult) {
            window.history.pushState({}, '', window.location.pathname);
            window.addEventListener('popstate', handlePopState);
        }

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [setShowReportResult]);

    const handleWinner = async (winnerID: string, winnerName: string, wins: number, losses: number, draws: number) => {
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
                    losses,
                    draws
                })
            });
            const responseData = await response.json();
            window.alert(responseData.message);
            closeModal();
        } catch (error) {
            console.error("Error recording result:", error);
        }
        setLoading(false);
    }

    const handleTrainerClick = (clickedTrainer: string) => {
        if (clickedTrainer === trainer1) {
            setModalState(ModalState.MATCH_RECORD1);
        } else {
            setModalState(ModalState.MATCH_RECORD2);
        }
    }

    const handleBackClick = () => {
        setModalState(ModalState.TRAINER_NAMES);
    }

    return (
        <div className='modal' onClick={(e) => {
            if (e.target === e.currentTarget) {
                closeModal();
            }
        }}>
            {modalState === ModalState.TRAINER_NAMES && (
                <div className='modal-content'>
                    <button className='report-winner' onClick={() => handleTrainerClick(trainer1)}>{trainer1} won</button>
                    <button className='report-winner' onClick={() => handleTrainerClick(trainer2)}>{trainer2} won</button>
                    <button className='report-winner' onClick={() => handleWinner('0', 'Tie', 2, 2, 0)}>Tie (2-2)</button>
                </div>
            )}
            {modalState === ModalState.MATCH_RECORD1 && (
                <div className='modal-content'>
                    <button className='report-winner' onClick={() => handleWinner(trainer1ID, trainer1, 3, 1, 0)}>3-1</button>
                    <button className='report-winner' onClick={() => handleWinner(trainer1ID, trainer1, 4, 0, 0)}>4-0</button>
                    <button className='report-winner' onClick={() => handleWinner(trainer1ID, trainer1, 2, 1, 1)}>2-1-1</button>
                    <button className='report-winner' onClick={() => handleWinner(trainer1ID, trainer1, 3, 0, 1)}>3-0-1</button>
                    <button className='back-button' onClick={handleBackClick}>Back</button>
                </div>
            )}
            {modalState === ModalState.MATCH_RECORD2 && (
                <div className='modal-content'>
                    <button className='report-winner' onClick={() => handleWinner(trainer2ID, trainer2, 3, 1, 0)}>3-1</button>
                    <button className='report-winner' onClick={() => handleWinner(trainer2ID, trainer2, 4, 0, 0)}>4-0</button>
                    <button className='report-winner' onClick={() => handleWinner(trainer2ID, trainer2, 2, 1, 1)}>2-1-1</button>
                    <button className='report-winner' onClick={() => handleWinner(trainer2ID, trainer2, 3, 0, 1)}>3-0-1</button>
                    <button className='back-button' onClick={handleBackClick}>Back</button>
                </div>
            )}
        </div>
    );
}

export default ReportResult;