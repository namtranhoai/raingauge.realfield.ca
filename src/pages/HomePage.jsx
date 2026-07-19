import { useState } from 'react';
import MapView from '../components/MapView';
import ValuesModal from '../components/ValuesModal';
import InfoModal from '../components/InfoModal';
import Legend from '../components/Legend';
import ButtonBar from '../components/ButtonBar';
import DailyChartModal from '../components/DailyChartModal';
import SeasonChartModal from '../components/SeasonChartModal';
import { fetchPrecipitationValues } from '../utils/mapPress';

function HomePage() {
  const [selectedLayer, setSelectedLayer] = useState('weeklyRain');
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDailyChartVisible, setModalDailyChartVisible] = useState(false);
  const [modalSeasonChartVisible, setModalSeasonChartVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMapPress = async (latlng) => {
    setMarkerPosition(latlng);
    setModalData(null);
    setLoading(true);
    setModalVisible(true);
    const data = await fetchPrecipitationValues(latlng);
    setModalData(data);
    setLoading(false);
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
      </div>

      <ValuesModal
        visible={modalVisible}
        loading={loading}
        modalData={modalData}
        onClose={() => setModalVisible(false)}
        onDailyChartOpen={() => {
          setModalVisible(false);
          setModalDailyChartVisible(true);
        }}
        onSeasonChartOpen={() => {
          setModalVisible(false);
          setModalSeasonChartVisible(true);
        }}
      />

      <DailyChartModal
        visible={modalDailyChartVisible}
        onClose={() => {
          setModalVisible(true);
          setModalDailyChartVisible(false);
        }}
        modalData={modalData}
        markerPosition={markerPosition}
      />

      <SeasonChartModal
        visible={modalSeasonChartVisible}
        onClose={() => {
          setModalVisible(true);
          setModalSeasonChartVisible(false);
        }}
        modalData={modalData}
        markerPosition={markerPosition}
      />

      <InfoModal
        visible={infoModalVisible}
        onClose={() => setInfoModalVisible(false)}
      />

      <ButtonBar
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
