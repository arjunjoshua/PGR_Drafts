import '../styles/styles.css';

type PokemonProps = {
    pokemonName: string;
}

const Pokemon: React.FC<PokemonProps> = ({ pokemonName }) => {
    return (   
        <div className="pokemon-card">
            <img src={`https://img.pokemondb.net/sprites/home/normal/${pokemonName}.png`} alt='{pokemonName}' />
            <h2>{pokemonName}</h2>
        </div>
    );
};


export default Pokemon;