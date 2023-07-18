import '../styles/pokemonGrid.css';

type PokemonProps = {
    pokemonName: string;
}

const Pokemon: React.FC<PokemonProps> = ({ pokemonName }) => {
    const BASE_URL = 'https://img.pokemondb.net/sprites';
    const pokemonNameCapitalized = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

    let folder = 'home/normal';

    //shiny chance!
    const shinyChance = Math.floor((Math.random() * 100) / 2);
    if (shinyChance === 6) {
        folder = 'home/shiny';
    }

    //prevents mewtwo-armored from breaking
    if (pokemonName === 'mewtwo-armored') {
        folder = 'go/normal';
    }

    const imgSrc = `${BASE_URL}/${folder}/${pokemonName}.png`;

    return (
        <div className="pokemon-card">
            <img src={imgSrc} alt={pokemonName} />
            <h2>{pokemonNameCapitalized}</h2>
        </div>
    );   
};


export default Pokemon;