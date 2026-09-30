import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/common/Buttons';
import { IconLock, IconEye, IconArrowLeft } from '../../components/icons/Icons';

export const AdminLogin: React.FC = () => {
  const { adminLogin, navigateTo } = useApp();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await adminLogin(password);
    setLoading(false);

    if (!success) {
      setError('Invalid studio credentials. Please check your password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#121110] text-[#FAF9F5] flex flex-col justify-between p-6">
      {/* Top back button */}
      <div>
        <button
          onClick={() => navigateTo('/')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#A69F91] hover:text-[#FAF9F5] transition-colors cursor-pointer"
        >
          <IconArrowLeft size={16} />
          <span>Return to Storefront</span>
        </button>
      </div>

      {/* Login Box */}
      <div className="max-w-md w-full mx-auto p-8 bg-[#1A1917] border border-[#2C2926] shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-[#24221F] text-[#FAF9F5] border border-[#3A3732] mb-2">
            <IconLock size={22} />
          </div>
          <h1 className="font-serif-heading text-2xl uppercase tracking-wider text-[#FAF9F5]">
            THE AMENA BRAND
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-[#A69F91]">
            STUDIO CMS PORTAL
          </p>
        </div>

        {error && (
          <div className="p-3 bg-[#B93838]/20 border border-[#B93838] text-xs text-[#FFC4C4] tracking-wide">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1 font-medium">
              Administrator Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-[#121110] border border-[#3E3B36] px-3.5 py-3 text-xs text-[#FAF9F5] placeholder-[#6E685E] focus:outline-none focus:border-[#FAF9F5]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A69F91] hover:text-white"
                title="Toggle password view"
              >
                <IconEye size={16} />
              </button>
            </div>
            <span className="text-[11px] text-[#6E685E] mt-1.5 block">
              Default password: <code className="text-[#A69F91] bg-[#24221F] px-1 py-0.5 font-mono">amena2025</code>
            </span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={loading}
            className="w-full bg-[#FAF9F5] text-[#121110] hover:bg-[#E5E1D8]"
          >
            Authenticate & Open CMS
          </Button>
        </form>

        <div className="pt-4 border-t border-[#2C2926] text-center text-[11px] text-[#6E685E]">
          Secure server-side token session • Confidential atelier access
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="text-center text-[10px] text-[#6E685E] uppercase tracking-widest">
        THE AMENA BRAND • ACCRA, GHANA
      </div>
    </div>
  );
};
