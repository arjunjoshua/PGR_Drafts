import '../styles/pokemonGrid.css';

const SHINY_CHANCE = 6;

type PokemonProps = {
    pokemonName: string;
};

const Pokemon: React.FC<PokemonProps> = ({ pokemonName }) => {
    const BASE_URL = 'https://img.pokemondb.net/sprites';
    let pokemonNameCapitalized = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

    let folder = 'home/normal';

    //shiny chance!
    const shinyChance = Math.floor((Math.random() * 100)/2);
    if (shinyChance === SHINY_CHANCE) {
        folder = 'home/shiny';
    }

    //prevents mewtwo-armored from breaking
    if (pokemonName === 'mewtwo-armored') {
        folder = 'go/normal';
    }

    const imgSrc = `${BASE_URL}/${folder}/${pokemonName}.png`;

    if (pokemonName.length > 17 ){
        pokemonNameCapitalized = pokemonNameCapitalized.substring(0, 12);
    }
    else if (pokemonName === 'abomasnow-mega'){
        pokemonNameCapitalized = 'Obama-mega'
    }

    return (
        <div className="pokemon-card">
            <img src={imgSrc} alt={pokemonName} />
            <h2>{pokemonNameCapitalized}</h2>
        </div>
    );   
};


export default Pokemon;