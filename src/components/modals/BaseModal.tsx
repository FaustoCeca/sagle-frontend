import ReactDOM from "react-dom";
import { useEffect } from "react";

interface BaseModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const BaseModal = ({ onClose, children }: BaseModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Quiero que si haces click fuera del modal, se cierre
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50
        flex items-center justify-center overflow-y-auto overflow-x-hidden"
        aria-modal="true"
        role="dialog"
        tabIndex={-1}
        data-testid="base-modal"
        data-cy="base-modal"
    >
      {/* Backdrop con opacidad */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={handleBackdropClick}
        data-testid="modal-backdrop"
      />
      {/* Contenido del modal sin opacidad */}
      <div className="relative z-10 w-full flex items-center justify-center h-full p-4">
        <div className="glass-strong relative p-6 rounded-2xl w-full max-w-2xl overflow-y-auto hide-scrollbar max-h-[90%] border border-neon-cyan/40 glow-cyan text-arcade-ink">
        <button
          onClick={onClose}
          aria-label="close-modal"
          className="fixed top-5 right-5 text-neon-red border border-neon-red/60 bg-neon-red/15 hover:bg-neon-red/30 focus:outline-none focus:ring-2 focus:ring-neon-red/60 rounded-full p-2 transition-colors z-20"
        >
          <span className="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default BaseModal;
