"use client";

import { RiErrorWarningLine } from "@remixicon/react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Ya, Konfirmasi",
  cancelText = "Batal",
  isLoading = false
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-gray-200 animate-in fade-in zoom-in duration-200 whitespace-normal text-center">
        <div className="flex flex-col items-center">
          
          {/* Warning Icon */}
          <div className="w-16 h-16 rounded-full bg-brand-yellow/20 flex items-center justify-center mb-6">
            <RiErrorWarningLine className="w-8 h-8 text-brand-orange" />
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-extrabold text-gray-900 mb-3">{title}</h3>
          
          {/* Message */}
          <p className="text-gray-600 font-medium mb-8">
            {message}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button 
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 rounded-lg border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button 
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-6 py-3 rounded-lg bg-brand-orange text-white font-bold text-sm hover:bg-brand-orange/90 transition-all shadow-sm disabled:opacity-50"
            >
              {isLoading ? "Memproses..." : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
