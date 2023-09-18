import '../styles/scoreboard.css'
import { useState } from 'react';
import ReportResult from './reportResult';

const ReportResultButton = ({ trainer1, trainer2 }: { trainer1: string; trainer2: string; }) => {
    const [showReportResult, setShowReportResult] = useState(false);
    return (
        <div>
        <button className='report-button' onClick={(() => setShowReportResult(true))}>
            Report Result
        </button>
        {showReportResult && 
        <ReportResult trainer1={trainer1} trainer2={trainer2} 
        showReportResult={showReportResult} setShowReportResult={setShowReportResult}/>}
        </div>
    )
}

export default ReportResultButton;