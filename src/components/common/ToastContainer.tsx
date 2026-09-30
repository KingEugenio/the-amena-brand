import React from 'react';
import { useApp } from '../../context/AppContext';
import { IconCheck, IconClose } from '../icons/Icons';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto p-4 border shadow-xl flex items-center justify-between gap-3 text-xs tracking-wide transition-all ${
            t.type === 'error'
              ? 'bg-[#191816] text-[#FAF9F5] border-[#B93838]'
              : 'bg-[#191816] text-[#FAF9F5] border-[#3E3B36]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {t.type !== 'error' && <IconCheck size={16} className="text-[#25D366]" />}
            <span>{t.message}</span>
          </div>
          <button
            onClick={() => dismissToast(t.id)}
            className="text-[#A69F91] hover:text-[#FAF9F5] cursor-pointer"
            aria-label="Dismiss notification"
          >
            <IconClose size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
