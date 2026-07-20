import { useState } from 'react';
import MapView from '../components/MapView';
import ValuesModal from '../components/ValuesModal';
import InfoModal from '../components/InfoModal';
import Legend from '../components/Legend';
import ButtonBar from '../components/ButtonBar';
import ChartModal from '../components/ChartModal';
import DailyPrecipitationChart from '../components/DailyPrecipitationChart';
import YearlyComparisonChart from '../components/YearlyComparisonChart';
import API_CONFIG from '../config/apiConfig';
import { fetchPrecipitationValues } from '../utils/mapPress';

function HomePage() {
  const [selectedLayer, setSelectedLayer] = useState('weeklyRain');
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeChart, setActiveChart] = useState(null); // 'daily' | 'season' | 'year'
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleMapPress = async (latlng) => {
    setHasInteracted(true);
    setMarkerPosition(latlng);
    setModalData(null);
    setLoading(true);
    setModalVisible(true);
    const data = await fetchPrecipitationValues(latlng);
    setModalData(data);
    setLoading(false);
  };

  const openChart = (chart) => {
    setModalVisible(false);
    setActiveChart(chart);
  };

  const closeChart = () => {
    setActiveChart(null);
    setModalVisible(true);
  };

  return (
    <div className="home">
      <div className="map-area">
        <MapView
          selectedLayer={selectedLayer}
          onMapPress={handleMapPress}
          markerPosition={markerPosition}
        />
        <Legend selectedLayer={selectedLayer} />
        {!hasInteracted && (
          <div className="map-hint" role="status">
            👆 Tap anywhere on the map to get precipitation
          </div>
        )}
      </div>

      <ValuesModal
        visible={modalVisible}
        loading={loading}
        modalData={modalData}
        onClose={() => setModalVisible(false)}
        onDailyChartOpen={() => openChart('daily')}
        onSeasonChartOpen={() => openChart('season')}
        onYearChartOpen={() => openChart('year')}
      />

      <ChartModal
        visible={activeChart === 'daily'}
        onClose={closeChart}
        title="Daily precipitation chart"
        summary={modalData?.weekly_precipitation}
        endpoint={API_CONFIG.ENDPOINTS.DAILY_PRECIPITATION}
        markerPosition={markerPosition}
      >
        {(data) => <DailyPrecipitationChart dailyData={data} />}
      </ChartModal>

      <ChartModal
        visible={activeChart === 'season'}
        onClose={closeChart}
        title="Season comparison chart"
        summary={modalData?.seasonal_precipitation}
        endpoint={API_CONFIG.ENDPOINTS.SEASON_COMPARISON}
        markerPosition={markerPosition}
      >
        {(data) => (
          <YearlyComparisonChart seasonData={data} seriesName="Season" />
        )}
      </ChartModal>

      <ChartModal
        visible={activeChart === 'year'}
        onClose={closeChart}
        title="Crop year comparison chart"
        summary={modalData?.yearly_precipitation}
        endpoint={API_CONFIG.ENDPOINTS.YEAR_COMPARISON}
        markerPosition={markerPosition}
      >
        {(data) => (
          <YearlyComparisonChart seasonData={data} seriesName="Crop year" />
        )}
      </ChartModal>

      <InfoModal
        visible={infoModalVisible}
        onClose={() => setInfoModalVisible(false)}
      />

      <ButtonBar
        selectedLayer={selectedLayer}
        onInfoPress={() => setInfoModalVisible(true)}
        onLayerChange={setSelectedLayer}
      />

      <div className="footer-logo">
        <img
          src="https://storage.googleapis.com/rain_gauge_map_data/images/agbio.png"
          alt="College of Agriculture and Bioresources"
        />
      </div>
    </div>
  );
}

export default HomePage;
