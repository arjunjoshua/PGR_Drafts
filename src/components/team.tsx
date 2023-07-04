import React from 'react';
import Pokemon from './pokemon';
import { HeartbrokenKid, Boozdoo } from '../static_data/teams';

type TeamProps = {
    team: string[]; // An array of Pokemon names
}

const Team: React.FC<TeamProps> = ({ team }) => {
    return (
        <div className='pokemon-grid'>
            {team.map((pokemonName, index) => (
                <Pokemon key={index} pokemonName={pokemonName} />
            ))}
        </div>
    );
};

export default Team;
