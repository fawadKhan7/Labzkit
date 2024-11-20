// Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white dark:bg-[#1f2937] p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-semibold text-gray-600 dark:text-[#d1d5db] hover:text-gray-900"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
