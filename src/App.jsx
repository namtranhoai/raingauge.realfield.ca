import HomePage from './pages/HomePage';
import UpdateBanner from './components/UpdateBanner';
import API_CONFIG from './config/apiConfig';

function App() {
  return (
    <>
      <UpdateBanner
        remoteUrl={`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VERSION}`}
      />
      <header className="app-header">
        <h1>Virtual Rain Gauge</h1>
      </header>
      <HomePage />
    </>
  );
}

export default App;
