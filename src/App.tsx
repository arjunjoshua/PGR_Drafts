import './App.css'
import PvpDraft from './pvpDraft'
import { BrowserRouter as Router, Route, Routes, Link  } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';

function App() {
    return (
        <Router>
            <div className='app-body'> 
            <div>
            <Navbar />  
            </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pvp" element={<PvpDraft />} />
                    {/*<Route path="/raid" element={<RaidDraft />} />*/}
                </Routes>
            </div>
        </Router>
    );
}

export default App;