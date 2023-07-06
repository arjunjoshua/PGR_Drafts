import { useState, useEffect } from 'react';
import Sidebar from 'react-sidebar';

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
  
    const onSetSidebarOpen = (open: boolean) => {
      setSidebarOpen(open);
    }
  
    useEffect(() => {
      fetchLobbies();
    }, []);
  
    return (
      <Sidebar
        sidebar={lobbies.map(lobby => <button key={lobby._id} onClick={() => handleLobbySelect(lobby._id)}>{lobby.name}</button>)}
        open={sidebarOpen}
        onSetOpen={onSetSidebarOpen}
        styles={{ sidebar: { background: "white" } }}
      >
        <button onClick={() => onSetSidebarOpen(true)}>
          Three bars icon
        </button>
      </Sidebar>
    );
  };

  export default LobbySidebar;
  