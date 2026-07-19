import { useEffect, useState } from 'react';
import { APP_VERSION } from '../config/version';

function isVersionLower(current, required) {
  const cur = current.split('.').map(Number);
  const req = required.split('.').map(Number);
  for (let i = 0; i < req.length; i++) {
    if ((cur[i] || 0) < req[i]) return true;
    if ((cur[i] || 0) > req[i]) return false;
  }
  return false;
}

/**
 * Soft update banner for the web PWA.
 * Uses android minimumRequiredVersion from the shared /version API when present.
 */
function UpdateBanner({ remoteUrl }) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [minVersion, setMinVersion] = useState('');

  useEffect(() => {
    const checkVersion = async () => {
      try {
        const res = await fetch(remoteUrl);
        const data = await res.json();
        const required =
          data?.web?.minimumRequiredVersion ||
          data?.android?.minimumRequiredVersion;
        if (required && isVersionLower(APP_VERSION, required)) {
          setMinVersion(required);
          setShow(true);
        }
      } catch (err) {
        console.warn('Version check failed:', err);
      }
    };
    checkVersion();
  }, [remoteUrl]);

  if (!show || dismissed) return null;

  return (
    <div className="update-banner" role="status">
      <span>
        A newer version is available (current {APP_VERSION}
        {minVersion ? `, required ${minVersion}` : ''}). Reload to update.
      </span>
      <div className="update-banner-actions">
        <button type="button" onClick={() => window.location.reload()}>
          Reload
        </button>
        <button type="button" className="btn-text" onClick={() => setDismissed(true)}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

export default UpdateBanner;
