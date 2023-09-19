import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PvpTeams from './components/pvpTeams';
import Navbar from './components/navbar';
import Scoreboard from './components/scoreboard';
import HomePage from './components/homePage';

function App() {
    return (
        <Router>
            <div>
                <Navbar/>
                <Routes>
                    <Route path="/" Component={HomePage}/>
                    <Route path="/pvp-draft-teams" Component={PvpTeams}/>
                    <Route path="/points-table" Component={Scoreboard} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;