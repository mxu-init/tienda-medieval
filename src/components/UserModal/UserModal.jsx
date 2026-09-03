import { useEffect } from 'react';
import './UserModal.css';

const UserModal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="userModalBackdrop" onClick={onClose} role="presentation">
      <div
        className="userModalContainer"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="userModalTitle"
      >
        <header className="userModalHeader">
          <h2 id="userModalTitle" className="userModalTitle">
            {title}
          </h2>
          <button
            type="button"
            className="userModalCloseBtn"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </header>
        <div className="userModalBody">{children}</div>
      </div>
    </div>
  );
};

export default UserModal;
