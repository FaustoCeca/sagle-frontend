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

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50
        flex items-center justify-center overflow-y-auto overflow-x-hidden"
        onClick={handleBackdropClick}
        aria-modal="true"
        role="dialog"
        tabIndex={-1}
        data-testid="base-modal"
        data-cy="base-modal"
    >
      {/* Backdrop con opacidad */}
      <div 
        className="absolute inset-0 bg-black opacity-80"
        onClick={handleBackdropClick}
      />
      {/* Contenido del modal sin opacidad */}
      <div className="relative z-10 w-full flex items-center justify-center h-full">
        <div className="bg-white p-4 rounded-lg w-[80%] overflow-y-scroll max-h-[90%] shadow-lg">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default BaseModal;
