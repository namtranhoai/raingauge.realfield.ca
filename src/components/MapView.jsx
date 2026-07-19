import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const CENTER = [52.1557, -106.69];
const LAYER_URLS = {
  weeklyRain: 'https://storage.googleapis.com/rain_gauge_map_data/weeklyRain/{z}/{x}/{y}',
  seasonRain: 'https://storage.googleapis.com/rain_gauge_map_data/seasonRain/{z}/{x}/{y}',
  yearRain: 'https://storage.googleapis.com/rain_gauge_map_data/yearRain/{z}/{x}/{y}',
};

function MapClickHandler({ onMapPress }) {
  useMapEvents({
    click(e) {
      onMapPress({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      });
    },
  });
  return null;
}

function InvalidateSize() {
  const map = useMap();
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 100);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}

function MapView({ selectedLayer, onMapPress, markerPosition }) {
  const overlayUrl = LAYER_URLS[selectedLayer];

  return (
    <MapContainer
      center={CENTER}
      zoom={7}
      className="map-container"
      zoomControl
      attributionControl={false}
    >
      <InvalidateSize />
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        maxZoom={15}
      />
      {overlayUrl && (
        <TileLayer
          key={selectedLayer}
          url={overlayUrl}
          opacity={0.8}
          maxZoom={15}
        />
      )}
      <MapClickHandler onMapPress={onMapPress} />
      {markerPosition && (
        <Marker
          position={[markerPosition.latitude, markerPosition.longitude]}
        />
      )}
    </MapContainer>
  );
}

export default MapView;
