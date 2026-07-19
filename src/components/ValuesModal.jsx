function ValuesModal({
  visible,
  loading,
  modalData,
  onClose,
  onDailyChartOpen,
  onSeasonChartOpen,
}) {
  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        {loading ? (
          <div className="spinner" />
        ) : (
          <>
            {modalData ? (
              <>
                <h3>Sum of precipitation</h3>
                <div className="value-row">
                  <p>{modalData.weekly_precipitation}</p>
                  <button
                    type="button"
                    className="chart-icon-btn"
                    onClick={onDailyChartOpen}
                    title="Daily chart"
                    aria-label="Open daily precipitation chart"
                  >
                    📊
                  </button>
                </div>
                <div className="value-row">
                  <p>{modalData.seasonal_precipitation}</p>
                  <button
                    type="button"
                    className="chart-icon-btn"
                    onClick={onSeasonChartOpen}
                    title="Season chart"
                    aria-label="Open season comparison chart"
                  >
                    📊
                  </button>
                </div>
                <p>{modalData.yearly_precipitation}</p>
              </>
            ) : (
              <p>No data</p>
            )}
            <button type="button" className="btn-close" onClick={onClose}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ValuesModal;
