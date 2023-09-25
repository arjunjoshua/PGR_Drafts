import '../styles/loadingSpinner.css';  // Import the CSS file

const LoadingSpinner = () => (
  <div className='loader-container'>
      <div className="loader"/> 
      <img src='pikachu-running.gif' alt='Loading..' className='loading-gif'/>
  </div>
);

export default LoadingSpinner;
