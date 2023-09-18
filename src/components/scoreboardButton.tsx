import '../styles/scoreboard.css'

const ScoreboardButton = () => {
    return (
        <div>
        <button className='scoreboard-button' onClick={(() => window.alert("this feature is still under development"))}>
            View Scoreboard
        </button>
        </div>
    )
}

export default ScoreboardButton