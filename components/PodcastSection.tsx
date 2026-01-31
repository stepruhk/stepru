
import React from 'react';
import { SPOTIFY_SHOW_ID } from '../constants';

const PodcastSection: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-1000">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
          <i className="fa-solid fa-podcast text-3xl"></i>
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900">Comprendre les RP le temps d'un café</h2>
          <p className="text-slate-500">Écoutez les dernières analyses et conseils de votre professeur.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
        <iframe 
          style={{ borderRadius: '12px' }}
          src={`https://open.spotify.com/embed/show/${SPOTIFY_SHOW_ID}?utm_source=generator&theme=0`} 
          width="100%" 
          height="600" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
        ></iframe>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
          <h4 className="font-bold text-indigo-900 flex items-center gap-2 mb-2">
            <i className="fa-solid fa-lightbulb"></i> Conseil d'étude
          </h4>
          <p className="text-indigo-800 text-sm leading-relaxed">
            Écoutez les épisodes liés à votre module actuel pendant vos trajets. Cela aide à renforcer la terminologie et les cadres théoriques par un apprentissage passif.
          </p>
        </div>
        <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
          <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-2">
            <i className="fa-solid fa-star"></i> Épisode à la Une
          </h4>
          <p className="text-amber-800 text-sm leading-relaxed">
            Ne manquez pas l'analyse sur "L'avenir des Relations Publiques à l'ère de l'IA générative". Crucial pour votre projet final !
          </p>
        </div>
      </div>
    </div>
  );
};

export default PodcastSection;
