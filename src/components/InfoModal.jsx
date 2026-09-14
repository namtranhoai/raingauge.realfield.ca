import { APP_VERSION } from '../config/version';
import Modal from './Modal';

const CAPA_PDF =
  'https://collaboration.cmc.ec.gc.ca/cmc/cmoi/product_guide/docs/lib/capa_information_leaflet_20141118_en.pdf';

function InfoModal({ visible, onClose }) {
  return (
    <Modal visible={visible} onClose={onClose} title="Virtual Rain Gauge" scroll>
        <p>Precipitation amounts may be delayed by one day</p>
        <p>
          Select a map layer to display. Zoom to areas and click to get exact
          precipitation.
        </p>

        <h4>Data from:</h4>
        <a href={CAPA_PDF} target="_blank" rel="noreferrer">
          Canadian Precipitation Analysis (CaPA)
        </a>

        <h4>Methodology system:</h4>
        <p>
          Fortin, V., Roy, G., Stadnyk, T., Koenig, K., Gasset, N., &amp; Mahidjiba,
          A. (2018). Ten years of science based on the Canadian precipitation
          analysis: A CaPA system overview and literature review. Atmosphere-Ocean,
          56(3), 178-196.
        </p>
        <p>
          Funded through a generous donation from the Cyril Capling Trust Fund,
          College of Agriculture and Bioresources, University of Saskatchewan.
        </p>

        <div className="info-logos">
          <img
            className="info-logo"
            src="https://storage.googleapis.com/rain_gauge_map_data/images/agbio.png"
            alt="College of Agriculture and Bioresources"
          />
          <img
            className="info-logo"
            src="https://storage.googleapis.com/rain_gauge_map_data/images/aci.png"
            alt="Agronomic Crop Imaging Lab"
          />
          <img
            className="info-logo"
            src="https://storage.googleapis.com/rain_gauge_map_data/images/ndac.png"
            alt="Nutrien Digital Agriculture Centre"
          />
          <img
            className="info-logo"
            src="https://storage.googleapis.com/rain_gauge_map_data/images/acreage.png"
            alt="ACREAGE Digital Agriculture — Agroecosystem Digital Twins and Intelligent Systems"
          />
          <img
            className="info-logo"
            src="https://storage.googleapis.com/rain_gauge_map_data/images/realfield.png"
            alt="RealField"
          />
        </div>

        <p className="version-line">Version: {APP_VERSION}</p>

      <button type="button" className="btn-close" onClick={onClose}>
        Close
      </button>
    </Modal>
  );
}

export default InfoModal;
