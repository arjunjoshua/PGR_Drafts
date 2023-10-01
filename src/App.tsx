import './App.css';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PvpTeams from './components/pvpTeams';
import Navbar from './components/navbar';
import HomePage from './components/homePage';
import RaidDraft from './components/raidDraft';

function App() {
    return (
        <Router>
            <div>
                <Navbar/>
                <Routes>
                    <Route path="/" Component={HomePage}/>
                    <Route path="/pvp-draft-teams" Component={PvpTeams}/>
                    <Route path="/raid-draft" Component={RaidDraft} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;