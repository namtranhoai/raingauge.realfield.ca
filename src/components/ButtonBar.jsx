import { useState } from 'react';
import AppButton from './AppButton';
import Modal from './Modal';

const LAYERS = [
  { value: 'weeklyRain', label: 'Last week' },
  { value: 'seasonRain', label: 'Growing Season' },
  { value: 'yearRain', label: 'Crop Year' },
];

function ButtonBar({ selectedLayer, onInfoPress, onLayerChange }) {
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
