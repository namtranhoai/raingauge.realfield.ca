import { useState } from 'react';
import AppButton from './AppButton';
import Modal from './Modal';

const LAYERS = [
  { value: 'weeklyRain', label: 'Last week' },
  { value: 'seasonRain', label: 'Growing Season' },
  { value: 'yearRain', label: 'Crop Year' },
];

function ButtonBar({
  selectedLayer,
  overlayOpacity,
  onOverlayOpacityChange,
  showRoads,
  showLabels,
  onShowRoadsChange,
  onShowLabelsChange,
  onInfoPress,
  onLayerChange,
}) {
  const [layerModalVisible, setLayerModalVisible] = useState(false);

  const current = LAYERS.find((l) => l.value === selectedLayer);

  const handleLayerChange = (value) => {
    onLayerChange(value);
    setLayerModalVisible(false);
  };

  return (
    <div className="button-bar">
      <AppButton
        theme="primary"
        label="Select Layer"
        sublabel={current ? current.label : undefined}
        icon="▦"
        onPress={() => setLayerModalVisible(true)}
      />
      <AppButton
        label="Instruction and info"
        icon="ℹ"
        onPress={onInfoPress}
      />

      <Modal
        visible={layerModalVisible}
        onClose={() => setLayerModalVisible(false)}
        title="Select Layer"
      >
        {LAYERS.map((layer) => {
          const active = layer.value === selectedLayer;
          return (
            <button
              key={layer.value}
              type="button"
              className={
                active ? 'layer-option layer-option--active' : 'layer-option'
              }
              aria-pressed={active}
              onClick={() => handleLayerChange(layer.value)}
            >
              <span>{layer.label}</span>
              {active && <span className="layer-check" aria-hidden>✓</span>}
            </button>
          );
        })}
        <div className="map-layer-toggles">
          <label className="map-layer-toggle">
            <input
              type="checkbox"
              checked={showRoads}
              onChange={(e) => onShowRoadsChange(e.target.checked)}
            />
            <span>Show roads</span>
          </label>
          <label className="map-layer-toggle">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => onShowLabelsChange(e.target.checked)}
            />
            <span>Show place names</span>
          </label>
        </div>
        <label className="opacity-control" htmlFor="overlay-opacity">
          <span className="opacity-control__label">Overlay transparency</span>
          <div className="opacity-control__row">
            <input
              id="overlay-opacity"
              type="range"
              min={0}
              max={100}
              value={Math.round(overlayOpacity * 100)}
              onChange={(e) =>
                onOverlayOpacityChange(Number(e.target.value) / 100)
              }
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(overlayOpacity * 100)}
            />
            <span className="opacity-control__value">
              {Math.round(overlayOpacity * 100)}%
            </span>
          </div>
        </label>
        <button
          type="button"
          className="btn-close"
          onClick={() => setLayerModalVisible(false)}
        >
          Close
        </button>
      </Modal>
    </div>
  );
}

export default ButtonBar;
