import '../styles/scoreboard.css'

const ReportResultButton = () => {
    return (
        <div>
        <button className='report-button' onClick={(() => window.alert("this feature is still under development"))}>
            Report Result
        </button>
        </div>
    )
}

export default ReportResultButton;