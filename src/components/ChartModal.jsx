import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import API_CONFIG from '../config/apiConfig';
import Modal from './Modal';

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

/**
 * Shared chart modal: fetches chart data for the marker position from the
 * given endpoint and renders it via the children render prop.
 */
function ChartModal({
  visible,
  onClose,
  title,
  summary,
  endpoint,
  markerPosition,
  children,
}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const retryCount = useRef(0);

  const fetchData = async () => {
    if (!markerPosition) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}${endpoint}`,
        {
          lat: markerPosition.latitude,
          lon: markerPosition.longitude,
        },
        { timeout: 10000 }
      );
      if (!response.data || Object.keys(response.data).length === 0) {
        throw new Error('No data received from API');
      }
      setData(response.data);
      setErrorMessage(null);
    } catch (error) {
      console.error(`Error fetching ${endpoint} data:`, error);
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
      fetchData();
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
    fetchData();
  };

  return (
    <Modal visible={visible} onClose={onClose} title={title} wide>
      {isLoading ? (
        <div className="spinner" />
      ) : (
        <>
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
              {summary && <p>{summary}</p>}
              {data ? children(data) : <p>No data</p>}
            </>
          )}
          <button type="button" className="btn-close" onClick={onClose}>
            Close
          </button>
        </>
      )}
    </Modal>
  );
}

export default ChartModal;
