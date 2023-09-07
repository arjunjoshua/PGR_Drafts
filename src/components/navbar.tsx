import '../styles/navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/pvp">PvP Draft</Link>
            <Link to="/raid">Raid Draft</Link>
        </nav>
    );
}

export default Navbar;
