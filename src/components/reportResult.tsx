import '../styles/reportResult.css'
import '../styles/dropdown.css'

interface ReportResultProps {
    trainer1: string,
    trainer2: string,
    showReportResult: boolean;
    setShowReportResult: (value: boolean) => void;
}

const ReportResult = ({trainer1, trainer2, showReportResult, setShowReportResult} : ReportResultProps) => {
    return (
        <div className='modal' onClick={(e) => {
            if (e.target === e.currentTarget) {
                setShowReportResult(false)
            }
          }}>
            <div className='modal-content'>
                <button className='report-winner' onClick={() => {alert(trainer1 + ' is the winner!')}}>{trainer1} won</button>
                <button className='report-winner' onClick={() => {alert(trainer2 + ' is the winner!')}}>{trainer2} won</button>
                <button className='report-winner' onClick={() => {alert('It\'s a tie!')}}>Tie</button>
            </div>
        </div>
    )
 }

export default ReportResult;