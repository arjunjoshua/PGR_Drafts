import React from 'react';
import Pokemon from './pokemon';

type TeamProps = {
    team: string[]; // An array of Pokemon names
}

const Team: React.FC<TeamProps> = ({ team }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {team.map((pokemonName, index) => (
                <Pokemon key={index} pokemonName={pokemonName} />
            ))}
        </div>
    );
};

export default Team;
