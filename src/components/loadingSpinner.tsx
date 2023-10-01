import '../styles/loadingSpinner.css';  // Import the CSS file

const LoadingSpinner = () => (
      <div className='loader-container'>
        <img src='pikachu-running.gif' alt='Loading..' className='loading-gif' />
        <h4 className='loading-text'>loading...</h4>
      </div>
);

export default LoadingSpinner;
