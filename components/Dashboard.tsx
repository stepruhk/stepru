
import React from 'react';
import { Course, Resource } from '../types';
import { APP_VERSION } from '../constants';
import { Sparkles, ArrowRight, Play, BookOpen, Clock, CheckCircle, ShieldCheck, RefreshCw } from 'lucide-react';

interface DashboardProps {
  course: Course;
  resources: Resource[];
  setActiveTab: (tab: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ course, resources, setActiveTab }) => {
  const recentResources = resources.slice(-3).reverse();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-500 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
          <ShieldCheck size={12} />
          Système v{APP_VERSION} : Synchronisé
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors"
        >
          <RefreshCw size={10} /> Forcer la synchro
        </button>
      </div>

      <header className="py-10 px-8 bg-white rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{course.code}</span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4">{course.name}</h1>
        <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
          Ravi de vous revoir ! Accédez à vos supports de cours et outils de révision ci-dessous.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                <BookOpen className="text-indigo-600" size={20} />
                Derniers documents
              </h3>
              <button onClick={() => setActiveTab('resources')} className="text-xs font-bold text-indigo-600 hover:underline">Voir tout</button>
            </div>

            {recentResources.length > 0 ? (
              <div className="space-y-3">
                {recentResources.map((res) => (
                  <div key={res.id} onClick={() => setActiveTab('resources')} className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-indigo-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white text-indigo-600 flex items-center justify-center border border-slate-100 group-hover:scale-105 transition-transform">
                        <i className={`fa-solid fa-file-lines`}></i>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{res.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{new Date(res.dateAdded).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <ArrowRight className="text-slate-300 group-hover:text-indigo-600" size={16} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 text-sm italic">Aucun document disponible.</p>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
            <h3 className="text-lg font-bold mb-2">Assistant IA</h3>
            <p className="text-slate-400 text-xs mb-6">Besoin d'aide pour comprendre un concept ?</p>
            <button 
              onClick={() => setActiveTab('ai-agent')}
              className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all"
            >
              <Play size={12} fill="currentColor" /> LANCER L'AIDE
            </button>
          </div>

          <div className="bg-cyan-50 p-6 rounded-3xl border border-cyan-100">
             <div className="flex items-center gap-2 mb-2 text-cyan-700">
                <Sparkles size={16} />
                <h3 className="text-sm font-bold uppercase tracking-tight">IA LABS (Alpha)</h3>
             </div>
             <p className="text-cyan-900/70 text-[11px] leading-relaxed">
               Les outils de pointe (Texte, Image et Live Audio) sont prêts dans votre menu latéral.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

