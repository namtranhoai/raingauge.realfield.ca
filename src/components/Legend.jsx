import { useEffect, useState } from 'react';
import API_CONFIG from '../config/apiConfig';

function Legend({ selectedLayer }) {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchLegendInfo = async () => {
      try {
        const response = await fetch(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LEGEND_INFO}`
        );
        const data = await response.json();
        if (!cancelled) {
          setInfo(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching legend:', error);
        if (!cancelled) setLoading(false);
      }
    };
    fetchLegendInfo();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="legend">
        <div className="spinner" />
      </div>
    );
  }

  if (!info || !info[selectedLayer]) return null;

  const layer = info[selectedLayer];

  return (
    <div className="legend">
      <div className="legend-title">{layer.title}</div>
      <img className="legend-bar" src={layer.uri} alt="Color scale" />
      <div className="legend-range">
        <span>{layer.min}</span>
        <span>{layer.max}</span>
      </div>
    </div>
  );
}

export default Legend;
