import Team from './components/team';

// This is a dummy data, replace this with real data later
const dummyData1 = [
    'groudon',
    'zekrom',
    'xerneas',
    'kyurem',
    'gholdengo',
    'zapdos-galarian'
];

const dummyData2 = [
    'lugia',
    'genesect',
    'yveltal',
    'garchomp',
    'buzzwole',
    'regirock'
];

function App() {
    return (
        <div className="App">
            <Team team={dummyData1} />
            <Team team={dummyData2} />
        </div>
    );
}

export default App;