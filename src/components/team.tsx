import React from 'react';
import Pokemon from './pokemon';

type TeamProps = {
    team: string[]; // An array of Pokemon names
}

function handle_replacements(name: string): string {
    return name.replace("dialga-altered", "dialga").replace("palkia-altered","palkia")
}

const Team: React.FC<TeamProps> = ({ team }) => {
    return (
        <div className='pokemon-grid'>
            {team.map((pokemonName, index) => (
                <Pokemon key={index} pokemonName={handle_replacements(pokemonName.trim())} />
            ))}
        </div>
    );
};

export default Team;
