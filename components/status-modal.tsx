"use client";

import { RiCheckboxCircleFill, RiCloseCircleFill } from "@remixicon/react";

interface StatusModalProps {
  isOpen: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export function StatusModal({
  isOpen,
  type,
  title,
  message,
  primaryAction,
  secondaryAction
}: StatusModalProps) {
  if (!isOpen) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-[24px] shadow-2xl max-w-md w-full p-8 md:p-10 border border-gray-100 animate-in fade-in zoom-in duration-200 text-center">
        <div className="flex flex-col items-center">
          {/* Icon */}
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isSuccess ? 'bg-emerald-100' : 'bg-red-100'}`}>
            {isSuccess ? (
              <RiCheckboxCircleFill className="w-10 h-10 text-emerald-600" />
            ) : (
              <RiCloseCircleFill className="w-10 h-10 text-red-600" />
            )}
          </div>
          
          {/* Title */}
          <h3 className={`text-2xl font-extrabold mb-3 ${isSuccess ? 'text-emerald-600' : 'text-red-600'}`}>
            {title}
          </h3>
          
          {/* Message */}
          <p className="text-gray-600 font-medium mb-8 text-base leading-relaxed">
            {message}
          </p>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <button 
              onClick={primaryAction.onClick}
              className={`flex-1 px-6 py-3.5 rounded-xl text-white font-bold text-sm transition-all shadow-sm ${
                isSuccess 
                  ? 'bg-emerald-600 hover:bg-emerald-700' 
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {primaryAction.label}
            </button>
            {secondaryAction && (
              <button 
                onClick={secondaryAction.onClick}
                className="flex-1 px-6 py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
