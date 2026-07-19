import { useState } from 'react';
import AppButton from './AppButton';

const LAYERS = [
  { value: 'weeklyRain', label: 'Last week' },
  { value: 'seasonRain', label: 'Growing Season' },
  { value: 'yearRain', label: 'Crop Year' },
];

function ButtonBar({ onInfoPress, onLayerChange }) {
  const [layerModalVisible, setLayerModalVisible] = useState(false);

  const handleLayerChange = (value) => {
    onLayerChange(value);
    setLayerModalVisible(false);
  };

  return (
    <div className="button-bar">
      <AppButton
        theme="primary"
        label="Select Layer"
        icon="▦"
        onPress={() => setLayerModalVisible(true)}
      />
      <AppButton
        label="Instruction and info"
        icon="ℹ"
        onPress={onInfoPress}
      />

      {layerModalVisible && (
        <div className="modal-backdrop" onClick={() => setLayerModalVisible(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <h3>Select Layer</h3>
            {LAYERS.map((layer) => (
              <button
                key={layer.value}
                type="button"
                className="layer-option"
                onClick={() => handleLayerChange(layer.value)}
              >
                {layer.label}
              </button>
            ))}
            <button
              type="button"
              className="btn-close"
              onClick={() => setLayerModalVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ButtonBar;
