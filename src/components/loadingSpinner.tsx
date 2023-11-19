import '../styles/loadingSpinner.css';  // Import the CSS file

const LoadingSpinner = () => (
      <div className='loader-container'>
        <img src='pikachu-running.gif' alt='Loading..' className='loading-gif' />
        <p className='loading-text'>loading...</p>
      </div>
);

export default LoadingSpinner;
