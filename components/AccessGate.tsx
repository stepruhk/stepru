
import React, { useState } from 'react';
import { ACCESS_CODE } from '../constants';

interface AccessGateProps {
  onAuthorize: () => void;
}

const AccessGate: React.FC<AccessGateProps> = ({ onAuthorize }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === ACCESS_CODE) {
      setError(false);
      onAuthorize();
    } else {
      setError(true);
      // Reset error animation after a while
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-slate-100 to-slate-200">
      <div className={`max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-10 md:p-14 border border-white transition-all duration-300 ${error ? 'animate-shake' : ''}`}>
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white text-3xl mx-auto mb-6 shadow-xl shadow-indigo-100">
            <i className="fa-solid fa-lock"></i>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Espace Sécurisé</h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            Veuillez entrer le code d'accès fourni par votre professeur pour accéder au Stepru Hub.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <i className="fa-solid fa-key"></i>
              </div>
              <input 
                type="password" 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Entrez votre code..."
                className={`w-full pl-12 pr-5 py-4 rounded-2xl border-2 bg-slate-50 focus:outline-none transition-all text-center tracking-[0.5em] text-xl font-bold ${
                  error ? 'border-rose-400 bg-rose-50' : 'border-slate-100 focus:border-indigo-600 focus:bg-white'
                }`}
                required
              />
            </div>
            {error && (
              <p className="text-rose-500 text-sm font-bold text-center animate-bounce">
                Code incorrect. Veuillez réessayer.
              </p>
            )}
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
          >
            Déverrouiller <i className="fa-solid fa-chevron-right text-sm"></i>
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-slate-50 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Stepru Hub &copy; 2025</p>
          <p className="text-[10px] text-slate-300 mt-1 uppercase tracking-tighter">Plateforme pédagogique réservée</p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
};

export default AccessGate;
