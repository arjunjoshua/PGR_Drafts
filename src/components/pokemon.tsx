type PokemonProps = {
    pokemonName: string;
}

const Pokemon: React.FC<PokemonProps> = ({ pokemonName }) => {
    return (   
        <div>
            <img src={`https://img.pokemondb.net/sprites/home/normal/${pokemonName}.png`} alt={pokemonName} />
            <p>{pokemonName}</p>
        </div>
    );
};


export default Pokemon;