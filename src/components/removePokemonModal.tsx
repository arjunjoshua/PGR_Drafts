import PokemonRemoveComponent from "./pokemonRemove";
import '../styles/dropdown.css';
import { useEffect } from "react";

interface PokemonRemoveModalProps {
    showInputRemove: boolean;
    setShowInputRemove: (value: boolean) => void;
    selectedPokemon: { value: string; label: string } | null;
    setSelectedPokemon: (value: { value: string; label: string } | null) => void;
    removePokemonFromTrainer: (trainerId: string, pokemonName: string) => void;
    selectedTeamId: string;
    selectedTeamPokemon: string[];
    }

const PokemonRemoveModal = ({ showInputRemove, setShowInputRemove, selectedPokemon, setSelectedPokemon, removePokemonFromTrainer, selectedTeamId, selectedTeamPokemon }: PokemonRemoveModalProps) => {
    const closeModal = () => setShowInputRemove(false);
  
    const handlePopState = (e: Event) => {
      closeModal();
      e.preventDefault();
    };
  
    useEffect(() => {
      if (showInputRemove) {
        window.history.pushState({},'', window.location.pathname);
        window.addEventListener('popstate', handlePopState);
      }
  
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }, [showInputRemove]);
  
    return (
      <div className="modal" onClick={(e) => e.target === e.currentTarget && closeModal()}>
        <div className="add-modal-content">
          <PokemonRemoveComponent 
            selectedPokemon={selectedPokemon}
            setSelectedPokemon={setSelectedPokemon} 
            team={selectedTeamPokemon}
          />
          <button 
            className='add-mon-submit' 
            onClick={() => {
              closeModal();
              if (selectedPokemon) {
                removePokemonFromTrainer(selectedTeamId, selectedPokemon?.value);
              }
              setSelectedPokemon(null);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

    export default PokemonRemoveModal;