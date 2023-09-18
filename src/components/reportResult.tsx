import '../styles/reportResult.css'
import '../styles/dropdown.css'
import { backend_url } from '../constants/constants'

interface ReportResultProps {
    trainer1: string,
    trainer2: string,
    trainer1ID: string,
    trainer2ID: string,
    setShowReportResult: (value: boolean) => void;
}

const ReportResult = ({trainer1, trainer2, trainer1ID, trainer2ID, setShowReportResult} : ReportResultProps) => {
    const handleWinner = async (winnerID: string, winnerName: string) => {
        try {
            await fetch(`${backend_url}/recordResult`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                trainer1ID,
                trainer2ID,
                winner: winnerID,
                winnerName,
            })
        });
        setShowReportResult(false);
        window.alert("Result recorded successfully!");
        } catch (error) {
            console.error("Error recording result:", error);
        }
    }

    return (
        <div className='modal' onClick={(e) => {
            if (e.target === e.currentTarget) {
                setShowReportResult(false)
            }
          }}>
            <div className='modal-content'>
                <button className='report-winner' onClick={() => handleWinner(trainer1ID, trainer1)}>{trainer1} won</button>
                <button className='report-winner' onClick={() => handleWinner(trainer2ID, trainer2)}>{trainer2} won</button>
                <button className='report-winner' onClick={() => handleWinner('0','Tie')}>Tie</button>
            </div>
        </div>
    )
 }

export default ReportResult;