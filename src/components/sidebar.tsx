import React, { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../styles/sidebar.css';

interface LobbySidebarProps {
  handleLobbySelect: (lobby: { _id: string; name: string}) => void;
  selectedLobbyID: string;
}

interface Lobby {
  _id: string;
  name: string;
  trainers: string[];
}

const LobbySidebar: React.FC<LobbySidebarProps> = ({ handleLobbySelect, selectedLobbyID }) => {
  const [lobbies, setLobbies] = useState<Lobby[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchLobbies = async () => {
    const response = await fetch('https://pgr-draft-backend.vercel.app/api/lobbies');
    const data = await response.json();
    setLobbies(data);
  }

  const handleStateChange = (state: {isOpen: boolean}) => {
    setSidebarOpen(state.isOpen);
}

  const closeMenu = () => setSidebarOpen(false);
  
  const handleButtonClick = (lobby: { _id: string; name: string }) => {
    handleLobbySelect(lobby);
    closeMenu();
  }

  useEffect(() => {
    fetchLobbies();
  }, []);

  return (
    <div>
      <button onClick={() => setSidebarOpen(true)} className='bm-burger-button'>
        Select lobby
        </button>

      <Menu className='bm-overlay'
        isOpen={sidebarOpen} 
        onStateChange={(state) => handleStateChange(state)}
      >
        {lobbies.map(lobby => (
          <button 
          key={lobby._id} 
          className={lobby._id === selectedLobbyID ? 'bm-burger-content-selected' : 'bm-burger-content'}
          onClick={() => handleButtonClick(lobby)}
          autoFocus={lobby._id === selectedLobbyID}
          >
            {lobby.name}
          </button>))}
          <button onClick={() => setSidebarOpen(false)} className='bm-burger-button-close'>Close menu</button>
      </Menu>
    </div>
  );
};

export default LobbySidebar;
  