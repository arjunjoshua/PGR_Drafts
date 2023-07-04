import Team from './components/team';
import { HeartbrokenKid, Boozdoo } from './static_data/teams';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>HearbrokenKid's Team</h1>
            <Team team={HeartbrokenKid} />
            <h1>Boozdoo's Team</h1>
            <Team team={Boozdoo} />
        </div>
    );
}

export default App;