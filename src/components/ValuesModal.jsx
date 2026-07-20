import Modal from './Modal';

function splitValue(text) {
  if (typeof text !== 'string') return { label: '', value: '' };
  const idx = text.indexOf(':');
  if (idx === -1) return { label: '', value: text };
  return {
    label: text.slice(0, idx).trim(),
    value: text.slice(idx + 1).trim(),
  };
}

function ValueRow({ text, chartTitle, chartAriaLabel, onChartOpen }) {
  const { label, value } = splitValue(text);
  return (
    <div className="value-row">
      <div className="value-row-text">
        {label && <span className="value-label">{label}</span>}
        <span className="value-amount">{value}</span>
      </div>
      {onChartOpen && (
        <button
          type="button"
          className="chart-icon-btn"
          onClick={onChartOpen}
          title={chartTitle}
          aria-label={chartAriaLabel}
        >
          📊
        </button>
      )}
    </div>
  );
}

function ValuesModal({
  visible,
  loading,
  modalData,
  onClose,
  onDailyChartOpen,
  onSeasonChartOpen,
  onYearChartOpen,
}) {
  return (
    <Modal visible={visible} onClose={onClose} title="Sum of precipitation">
      {loading ? (
        <div className="spinner" />
      ) : (
        <>
          {modalData ? (
            <div className="value-list">
              <ValueRow
                text={modalData.weekly_precipitation}
                chartTitle="Daily chart"
                chartAriaLabel="Open daily precipitation chart"
                onChartOpen={onDailyChartOpen}
              />
              <ValueRow
                text={modalData.seasonal_precipitation}
                chartTitle="Season chart"
                chartAriaLabel="Open season comparison chart"
                onChartOpen={onSeasonChartOpen}
              />
              <ValueRow
                text={modalData.yearly_precipitation}
                chartTitle="Crop year chart"
                chartAriaLabel="Open crop year comparison chart"
                onChartOpen={onYearChartOpen}
              />
              <p className="value-hint">Tap 📊 to see charts</p>
            </div>
          ) : (
            <div className="error-box">
              <p>
                Could not load precipitation data. Please check your connection
                and tap the map again.
              </p>
            </div>
          )}
          <button type="button" className="btn-close" onClick={onClose}>
            Close
          </button>
        </>
      )}
    </Modal>
  );
}

export default ValuesModal;
