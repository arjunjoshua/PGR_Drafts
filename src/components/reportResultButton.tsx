import '../styles/scoreboard.css'
import { useState } from 'react';
import ReportResult from './reportResult';

interface reportResultButtonProps {
    trainer1: string;
    trainer2: string;
    trainer1ID: string;
    trainer2ID: string;
    lobbyID: string;
    setLoading: (value: boolean) => void;
}

const ReportResultButton = ({ trainer1, trainer2, trainer1ID, trainer2ID, lobbyID, setLoading }: reportResultButtonProps) => {
    const [showReportResult, setShowReportResult] = useState(false);
    return (
        <div>
        <button className='report-button' onClick={(() => setShowReportResult(true))}>
            Report Result
        </button>
        {showReportResult && 
        <ReportResult trainer1={trainer1} trainer2={trainer2} trainer1ID={trainer1ID} 
        trainer2ID={trainer2ID} setShowReportResult={setShowReportResult} lobbyID={lobbyID} setLoading={setLoading}/>}
        </div>
    )
}

export default ReportResultButton;