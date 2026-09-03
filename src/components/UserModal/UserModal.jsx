import { useEffect } from 'react';
import './UserModal.css';

const UserModal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
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
    <div
      className="modalBackdrop userModalBackdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modalContainer userModalContainer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <header className="modalHeader userModalHeader">
          <h2 id="modalTitle" className="modalTitle userModalTitle">
            {title}
          </h2>
          <button
            type="button"
            className="modalCloseBtn userModalCloseBtn"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </header>
        <div className="modalBody userModalBody">{children}</div>
      </div>
    </div>
  );
};

export default UserModal;
