"use client";

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  if (!isOpen) return null; // Prevent rendering when closed

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C111D]/50 backdrop-blur-sm px-4 no-scrollbar"
      onClick={onClose}
    >
      <div
        className={`bg-[#fff] rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col no-scrollbar ${
          className ?? ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal scrollable content */}
        <div className="overflow-y-auto p-6 h-full">{children}</div>
      </div>
    </div>
  );
};
