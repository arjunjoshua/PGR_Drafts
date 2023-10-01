import PokemonSelectComponent from "./pokemonSelect";
import '../styles/dropdown.css';
import { useEffect } from "react";

interface PokemonAddModalProps {
    showInput: boolean;
    setShowInput: (value: boolean) => void;
    selectedPokemon: { value: string; label: string } | null;
    setSelectedPokemon: (value: { value: string; label: string } | null) => void;
    selectedTeamId: string;
    addPokemonToTrainer: (trainerId: string, pokemonName: string) => void;
    }

const PokemonAddModal = ({ showInput, setShowInput, selectedPokemon, setSelectedPokemon, addPokemonToTrainer, selectedTeamId }: PokemonAddModalProps) => {
    const closeModal = () => setShowInput(false);
  
    const handlePopState = (e: Event) => {
      closeModal();
      e.preventDefault();
    };
  
    useEffect(() => {
      if (showInput) {
        window.history.pushState({},'', window.location.pathname);
        window.addEventListener('popstate', handlePopState);
      }
  
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }, [showInput]);
  
    return (
      <div className="modal" onClick={(e) => e.target === e.currentTarget && closeModal()}>
        <div className="add-modal-content">
          <PokemonSelectComponent 
            selectedPokemon={selectedPokemon}
            setSelectedPokemon={setSelectedPokemon} 
          />
          <button 
            className='add-mon-submit' 
            onClick={() => {
              closeModal();
              if (selectedPokemon) {
                addPokemonToTrainer(selectedTeamId, selectedPokemon?.value);
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

    export default PokemonAddModal;
  