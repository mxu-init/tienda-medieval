import { useEffect, useRef } from 'react';
import parchmentImg from '../../assets/img/parchment.jpg';
import './ProductModal.css';

const ProductModal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      const focusable = modalRef.current?.querySelector(
        'input, textarea, select, button, [tabindex="0"]'
      );
      focusable?.focus();
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modalBackdrop" onClick={onClose} role="presentation">
      <div
        ref={modalRef}
        className="modalContainer"
        style={{ '--parchmentTexture': `url(${parchmentImg})` }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <span className="modalInnerBorder" aria-hidden="true" />

        <button
          type="button"
          className="modalCloseBtn"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <header className="modalHeader">
          <h2 id="modalTitle" className="modalTitle">
            {title}
          </h2>
          <div className="modalOrnament" aria-hidden="true">
            <span className="modalOrnamentLine" />
            <svg
              width="46"
              height="12"
              viewBox="0 0 46 12"
              fill="none"
              className="modalOrnamentGlyph"
            >
              <path
                d="M23 1c2.4 0 3.6 1.8 3.6 3.4 0 1.6-1.2 2.6-2.4 2.6-1 0-1.8-.6-1.8-1.5 0-.8.6-1.3 1.2-1.3"
                stroke="currentColor"
                strokeWidth="0.9"
              />
              <path
                d="M23 1c-2.4 0-3.6 1.8-3.6 3.4 0 1.6 1.2 2.6 2.4 2.6 1 0 1.8-.6 1.8-1.5 0-.8-.6-1.3-1.2-1.3"
                stroke="currentColor"
                strokeWidth="0.9"
              />
              <path d="M0 6h14M32 6h14" stroke="currentColor" strokeWidth="0.9" />
              <path
                d="M15.5 4l2 2-2 2M30.5 4l-2 2 2 2"
                stroke="currentColor"
                strokeWidth="0.9"
              />
            </svg>
            <span className="modalOrnamentLine" />
          </div>
        </header>

        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
};

export default ProductModal;
