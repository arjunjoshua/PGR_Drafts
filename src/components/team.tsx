import React from 'react';
import Pokemon from './pokemon';

type TeamProps = {
    team: string[]; // An array of Pokemon names
}

const Team: React.FC<TeamProps> = ({ team }) => {
    return (
        <div className='pokemon-grid'>
            {team.map((pokemonName, index) => (
                <Pokemon key={index} pokemonName={pokemonName.trim()} />
            ))}
        </div>
    );
};

export default Team;
