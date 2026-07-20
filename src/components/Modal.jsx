import { useEffect } from 'react';

function Modal({ visible, onClose, title, wide, scroll, children }) {
  useEffect(() => {
    if (!visible) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, onClose]);

  if (!visible) return null;

  const sheetClass = [
    'modal-sheet',
    wide ? 'modal-sheet--wide' : '',
    scroll ? 'modal-sheet--scroll' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={sheetClass}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-x"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        {title && <h3>{title}</h3>}
        {children}
      </div>
    </div>
  );
}

export default Modal;
