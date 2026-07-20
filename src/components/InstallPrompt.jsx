import { useEffect, useState } from 'react';

const DISMISS_KEY = 'installPromptDismissedAt';
const DISMISS_DAYS = 14;
const IOS_HINT_DELAY_MS = 3000;

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function recentlyDismissed() {
  const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
  return Date.now() - dismissedAt < DISMISS_DAYS * 24 * 60 * 60 * 1000;
}

/**
 * Suggests installing the PWA on the user's device.
 * Android/desktop: uses the beforeinstallprompt event for a native prompt.
 * iOS Safari: shows Add to Home Screen instructions instead.
 */
function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showIosHint, setShowIosHint] = useState(false);

  useEffect(() => {
    if (isStandalone() || recentlyDismissed()) return undefined;

    if (isIos()) {
      const t = setTimeout(() => setShowIosHint(true), IOS_HINT_DELAY_MS);
      return () => clearTimeout(t);
    }

    const onBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    return () =>
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setDeferredPrompt(null);
    setShowIosHint(false);
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'dismissed') {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    }
    setDeferredPrompt(null);
  };

  if (!deferredPrompt && !showIosHint) return null;

  return (
    <div className="install-banner" role="status">
      <span className="install-banner-icon" aria-hidden>📲</span>
      <div className="install-banner-text">
        <strong>Install Virtual Rain Gauge</strong>
        {showIosHint ? (
          <span>
            Tap <span aria-hidden>⎋</span> Share, then “Add to Home Screen”
          </span>
        ) : (
          <span>Get quick access from your home screen</span>
        )}
      </div>
      <div className="install-banner-actions">
        {deferredPrompt && (
          <button type="button" className="btn-install" onClick={handleInstall}>
            Install
          </button>
        )}
        <button type="button" className="btn-text" onClick={dismiss}>
          {showIosHint ? 'Got it' : 'Later'}
        </button>
      </div>
    </div>
  );
}

export default InstallPrompt;
