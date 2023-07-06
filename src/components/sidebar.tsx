import React, { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../styles/burger-menu.css'

interface LobbySidebarProps {
  handleLobbySelect: (lobbyId: string) => void;
}

interface Lobby {
  _id: string;
  name: string;
  trainers: string[];
}

const LobbySidebar: React.FC<LobbySidebarProps> = ({ handleLobbySelect }) => {
  const [lobbies, setLobbies] = useState<Lobby[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchLobbies = async () => {
    const response = await fetch('http://localhost:3000/lobbies');
    const data = await response.json();
    setLobbies(data);
  }

  const handleStateChange = (state: {isOpen: boolean}) => {
    setSidebarOpen(state.isOpen);
}

  const closeMenu = () => setSidebarOpen(false);
  
  const handleButtonClick = (lobbyId: string) => {
    handleLobbySelect(lobbyId);
    closeMenu();
  }

  useEffect(() => {
    fetchLobbies();
  }, []);

  return (
    <div>
      <button onClick={() => setSidebarOpen(true)}>
        Open menu
      </button>

      <Menu 
        isOpen={sidebarOpen} 
        onStateChange={(state) => handleStateChange(state)}
      >
        {lobbies.map(lobby => (
          <button key={lobby._id} onClick={() => handleButtonClick(lobby._id)}>
            {lobby.name}
          </button>
        ))}
      </Menu>
    </div>
  );
};

export default LobbySidebar;
  