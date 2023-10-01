import { Link } from 'react-router-dom';
import '../styles/navbar.css'

function Navbar() {
    return (
        <nav className='navbar'>
            <Link to="/">
                <div className='logo-container'>
                    <img src='yourcalc.png' alt="PGR Logo" className='navbar-logo'/>
                    <h3 className='navbar-title'>PoGo Raids</h3>
                </div>
            </Link>
            <div className='navbar-container'>
            <ul>
                <li><Link to="/pvp-draft-teams">PvP Draft</Link></li>
                <li><Link to="/raid-draft">Raid Draft</Link></li>
            </ul>
            </div>
        </nav>
    )
}

export default Navbar;