import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import API_CONFIG from '../config/apiConfig';
import SeasonComparisonChart from './SeasonComparisonChart';

const MAX_RETRIES = 3;

function parseError(error) {
  if (error.response) {
    if (error.response.status === 503) {
      return 'The service is temporarily unavailable. Please try again later.';
    }
    return `Error: ${error.response.status}`;
  }
  if (error.request) {
    if (error.code === 'ECONNABORTED') {
      return 'Request timed out. Please check your connection and try again.';
    }
    return 'Unable to connect to the server. Please check your internet connection.';
  }
  return error.message || 'An unexpected error occurred. Please try again.';
}

function SeasonChartModal({ visible, onClose, modalData, markerPosition }) {
  const [seasonData, setSeasonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const retryCount = useRef(0);

  const fetchSeasonData = async () => {
    if (!markerPosition) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SEASON_COMPARISON}`,
        {
          lat: markerPosition.latitude,
          lon: markerPosition.longitude,
        },
        { timeout: 10000 }
      );
      if (!response.data || Object.keys(response.data).length === 0) {
        throw new Error('No data received from API');
      }
      setSeasonData(response.data);
      setErrorMessage(null);
    } catch (error) {
      console.error('Error fetching season data:', error);
      setErrorMessage(parseError(error));
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  };

  useEffect(() => {
    if (visible) {
      setErrorMessage(null);
      retryCount.current = 0;
      fetchSeasonData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markerPosition, visible]);

  const handleRetry = () => {
    if (retryCount.current >= MAX_RETRIES) {
      setErrorMessage('Maximum retry attempts reached. Please try again later.');
      return;
    }
    retryCount.current += 1;
    setIsRetrying(true);
    fetchSeasonData();
  };

  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet modal-sheet--wide" onClick={(e) => e.stopPropagation()}>
        {isLoading ? (
          <div className="spinner" />
        ) : (
          <>
            <h3>Season comparison chart</h3>
            {errorMessage ? (
              <div className="error-box">
                <p>{errorMessage}</p>
                {retryCount.current < MAX_RETRIES && (
                  <button
                    type="button"
                    className="btn-retry"
                    onClick={handleRetry}
                    disabled={isRetrying}
                  >
                    {isRetrying
                      ? 'Retrying…'
                      : `Retry (${MAX_RETRIES - retryCount.current} attempts left)`}
                  </button>
                )}
              </div>
            ) : (
              <>
                {modalData && <p>{modalData.seasonal_precipitation}</p>}
                {seasonData ? (
                  <SeasonComparisonChart seasonData={seasonData} />
                ) : (
                  <p>No data</p>
                )}
              </>
            )}
            <button type="button" className="btn-close" onClick={onClose}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SeasonChartModal;
