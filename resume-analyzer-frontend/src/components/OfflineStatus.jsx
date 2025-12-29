import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, RefreshCw, CheckCircle } from 'lucide-react';

export default function OfflineStatus() {
  // States: 'online', 'offline', or 'reconnected'
  const [status, setStatus] = useState(navigator.onLine ? 'online' : 'offline');

  useEffect(() => {
    const handleOnline = () => {
      setStatus('reconnected');
      // Hide the "Welcome Back" message after 3 seconds
      setTimeout(() => {
        setStatus('online');
      }, 3000);
    };

    const handleOffline = () => {
      setStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // If status is 'online', we don't show anything
  if (status === 'online') return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-500">
      
      {/* --- OFFLINE CARD --- */}
      {status === 'offline' && (
        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-200 text-center max-w-sm mx-4 animate-in zoom-in duration-300">
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <WifiOff className="text-red-600" size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">Connection Lost</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Please check your internet connection to continue analyzing resumes.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg"
          >
            <RefreshCw size={18} /> Retry Now
          </button>
        </div>
      )}

      {/* --- WELCOME BACK CARD (Reconnected) --- */}
      {status === 'reconnected' && (
        <div className="bg-green-600 p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-4 animate-in slide-in-from-bottom-10 duration-500 border-4 border-white">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wifi className="text-white" size={32} />
          </div>
          <h2 className="text-xl font-black text-white mb-1">Back Online!</h2>
          <p className="text-green-50 flex items-center justify-center gap-2 font-medium">
            <CheckCircle size={16} /> Welcome back, resuming analysis...
          </p>
        </div>
      )}
    </div>
  );
}