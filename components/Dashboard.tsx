
import React from 'react';
import { Course, Resource } from '../types';
import { CHATGPT_GPT_URL } from '../constants';

interface DashboardProps {
  course: Course;
  resources: Resource[];
  setActiveTab: (tab: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ course, resources, setActiveTab }) => {
  const recentResources = resources.slice(-3).reverse();

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'written': return 'fa-file-lines';
      case 'ppt': return 'fa-file-powerpoint';
      case 'media': return 'fa-photo-film';
      case 'link': return 'fa-link';
      case 'other': return 'fa-box-archive';
      default: return 'fa-file';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900">{course.name}</h1>
          <p className="text-slate-500 text-lg mt-1">Prêt pour la session d'aujourd'hui ?</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ressources</p>
            <p className="text-xl font-bold text-slate-900">{resources.length}</p>
          </div>
          <div className="h-10 w-[1px] bg-slate-100"></div>
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progression</p>
            <p className="text-xl font-bold text-slate-900">12%</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <i className="fa-solid fa-clock-rotate-left text-indigo-500"></i>
              Documents récents
            </h3>
            {recentResources.length > 0 ? (
              <div className="space-y-3">
                {recentResources.map((res) => (
                  <div key={res.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                        <i className={`fa-solid ${getResourceIcon(res.type)}`}></i>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{res.title}</p>
                        <p className="text-xs text-slate-500">{new Date(res.dateAdded).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                    <i className="fa-solid fa-chevron-right text-slate-300 group-hover:text-indigo-400 transition-colors"></i>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <i className="fa-solid fa-folder-open text-3xl text-slate-300 mb-2"></i>
                <p className="text-slate-500 text-sm">Aucun document ajouté pour le moment.</p>
                <button onClick={() => setActiveTab('resources')} className="text-indigo-600 text-sm font-bold mt-2">Ajouter du contenu</button>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 transform group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-podcast text-6xl opacity-20"></i>
            </div>
            <h3 className="text-lg font-bold mb-2">Flux Podcast</h3>
            <p className="text-indigo-100 text-sm mb-6">Écoutez les dernières analyses du Prof de Com.</p>
            <button 
              onClick={() => setActiveTab('podcast')}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold transition-colors w-full text-center"
            >
              Ouvrir le lecteur
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Chat Rapide</h3>
            <div className="bg-slate-50 p-4 rounded-2xl mb-4 text-sm text-slate-600 italic">
              "Besoin d'aide pour une analyse ou une stratégie ? L'assistant de Stepru sur ChatGPT est là pour vous."
            </div>
            <a 
              href={CHATGPT_GPT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-up-right-from-square"></i> Demander au Prof (GPT)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
