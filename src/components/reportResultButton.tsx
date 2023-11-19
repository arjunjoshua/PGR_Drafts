import '../styles/scoreboard.css'
import '../styles/reportResult.css'
import { useState } from 'react';
import ReportResult from './reportResult';
import { backend_url } from '../constants/constants';

interface reportResultButtonProps {
    trainer1: string;
    trainer2: string;
    trainer1ID: string;
    trainer2ID: string;
    lobbyID: string;
    setLoading: (value: boolean) => void;
}

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


const ReportResultButton = ({ trainer1, trainer2, trainer1ID, trainer2ID, lobbyID, setLoading }: reportResultButtonProps) => {
    const [showReportResult, setShowReportResult] = useState(false);
    const [showActualResult, setShowActualResult] = useState(false);
    const [responseData, setResponseData] = useState<MatchResponse |null>(null); // Added state for response data

    const closeModal = () => setShowActualResult(false);

    const fetchResult = async () => {
        try{
            // setLoading(true);
            const response = await fetch(`${backend_url}/lobby/getResult?trainer1ID=${trainer1ID}&trainer2ID=${trainer2ID}&lobbyID=${lobbyID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    },
                });
            const data = await response.json();
            setResponseData(data); // Update state with response data
            if (data.match && data.match.isReported === false) {
                // setLoading(false);
                setShowReportResult(true);
            } else {
                setShowActualResult(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button className='report-button' onClick={fetchResult}>
                View/Report Result
            </button>
            {showActualResult && responseData &&
                <div className='modal' onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        closeModal();
                    }
                }}>
                    <div className='modal-content-result'>
                        <p>This result has been reported.</p>
                        {responseData.match && responseData.match.winnerName === "Tie" ? (
                            <p>It was a tie!</p>
                        ) : responseData.match && responseData.match.winnerName ? (
                            <p>{responseData.match.winnerName} won!</p>
                        ) : null}
                    </div>
                </div>
            }  
            {showReportResult && 
                <ReportResult trainer1={trainer1} trainer2={trainer2} trainer1ID={trainer1ID} 
                trainer2ID={trainer2ID} showReportResult={showReportResult} setShowReportResult={setShowReportResult} lobbyID={lobbyID} setLoading={setLoading}/>
            }
        </div>
    );
}


export default ReportResultButton;