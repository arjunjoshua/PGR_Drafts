import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/pvp-draft-teams">PvP Draft Teams</Link></li>
                <li><Link to="/points-table">Points Table</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;