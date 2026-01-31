
import React from 'react';
import { Course } from '../types';
import { CHATGPT_GPT_URL } from '../constants';

interface AIAgentChatProps {
  course: Course;
}

const AIAgentChat: React.FC<AIAgentChatProps> = ({ course }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in zoom-in duration-500">
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
        {/* Header Visuel */}
        <div className="bg-slate-900 p-12 text-center text-white relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-indigo-600 rounded-[2rem] shadow-2xl flex items-center justify-center text-4xl ring-8 ring-slate-50">
            <i className="fa-solid fa-robot"></i>
          </div>
          
          <h2 className="text-4xl font-black mt-8 mb-4">Stepru - The Comms Professor</h2>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Votre assistant expert en communication est maintenant disponible sur ChatGPT. 
            Il est configuré avec toute la base de connaissances de <span className="text-white font-bold">{course.name}</span>.
          </p>
        </div>

        {/* Grille d'expertises */}
        <div className="p-10 md:p-16 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto text-2xl mb-4 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-brain"></i>
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Théories & Concepts</h4>
              <p className="text-sm text-slate-500">Explications claires des modèles de communication et de rhétorique.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mx-auto text-2xl mb-4 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-pen-nib"></i>
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Aide à la Rédaction</h4>
              <p className="text-sm text-slate-500">Retours sur vos communiqués de presse, pitchs et stratégies médias.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto text-2xl mb-4 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Analyse Stratégique</h4>
              <p className="text-sm text-slate-500">Études de cas et conseils pour vos campagnes de communication.</p>
            </div>
          </div>

          {/* Bouton d'Action Principal */}
          <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-4 italic">"Une question ? Un doute ? Le Prof vous répond."</h3>
            <p className="text-slate-500 mb-10 max-w-lg">
              Cliquez ci-dessous pour ouvrir l'interface sécurisée de ChatGPT. Vous pourrez y poser toutes vos questions académiques.
            </p>
            
            <a 
              href={CHATGPT_GPT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-indigo-100 transition-all hover:scale-105 active:scale-95"
            >
              Lancer l'Assistant GPT
              <i className="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
            </a>
            
            <div className="mt-8 flex items-center gap-6 text-slate-400">
                <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <i className="fa-brands fa-openai text-sm"></i> Propulsé par GPT-4o
                </span>
                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <i className="fa-solid fa-lock text-sm"></i> Environnement Sécurisé
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgentChat;
