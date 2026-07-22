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

const REFERENCE_LAYERS = {
  roads:
    'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',
  labels:
    'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
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

function MapView({
  selectedLayer,
  overlayOpacity = 0.8,
  showRoads = true,
  showLabels = true,
  onMapPress,
  markerPosition,
}) {
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
          opacity={overlayOpacity}
          maxZoom={15}
        />
      )}
      {showRoads && (
        <TileLayer url={REFERENCE_LAYERS.roads} maxZoom={15} />
      )}
      {showLabels && (
        <TileLayer url={REFERENCE_LAYERS.labels} maxZoom={15} />
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
