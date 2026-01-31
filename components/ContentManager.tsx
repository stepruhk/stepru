
import React, { useState } from 'react';
import { Course, Resource, ResourceType } from '../types';
import TTSButton from './TTSButton';

interface ContentManagerProps {
  course: Course;
  resources: Resource[];
  onAddResource: (res: Resource) => void;
}

const ContentManager: React.FC<ContentManagerProps> = ({ course, resources, onAddResource }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<ResourceType>('written');
  const [newContent, setNewContent] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const resource: Resource = {
      id: Math.random().toString(36).substr(2, 9),
      type: newType,
      title: newTitle,
      content: newContent,
      url: newUrl,
      courseId: course.id,
      dateAdded: new Date().toISOString()
    };

    onAddResource(resource);
    setShowAdd(false);
    resetForm();
  };

  const resetForm = () => {
    setNewTitle('');
    setNewType('written');
    setNewContent('');
    setNewUrl('');
  };

  const getResourceTypeDetails = (type: ResourceType) => {
    switch (type) {
      case 'written':
        return { icon: 'fa-file-lines', color: 'bg-emerald-100 text-emerald-600', label: 'Écrit, chapitres & articles' };
      case 'ppt':
        return { icon: 'fa-file-powerpoint', color: 'bg-amber-100 text-amber-600', label: 'Présentation PPT' };
      case 'media':
        return { icon: 'fa-photo-film', color: 'bg-indigo-100 text-indigo-600', label: 'Vidéo & Audio' };
      case 'link':
        return { icon: 'fa-link', color: 'bg-purple-100 text-purple-600', label: 'Lien Web' };
      case 'other':
        return { icon: 'fa-box-archive', color: 'bg-slate-100 text-slate-600', label: 'Divers' };
      default:
        return { icon: 'fa-file', color: 'bg-slate-100 text-slate-600', label: 'Autre' };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Contenu du cours</h2>
          <p className="text-slate-500">Accédez aux supports pédagogiques officiels pour {course.name}.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${
            showAdd ? 'bg-slate-200 text-slate-700' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
          }`}
        >
          <i className={`fa-solid ${showAdd ? 'fa-xmark' : 'fa-plus'}`}></i>
          {showAdd ? 'Annuler' : 'Ajouter du contenu'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-xl space-y-4 animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-xl font-bold text-slate-800">Nouvelle ressource pédagogique</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Titre du document</label>
              <input 
                type="text" 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="ex: Module 01 - Les théories de base"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Type de contenu</label>
              <select 
                value={newType}
                onChange={(e) => setNewType(e.target.value as ResourceType)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="written">Contenu écrit, chapitres et articles (PDF)</option>
                <option value="ppt">Présentation PPT (PDF)</option>
                <option value="media">Contenu vidéo et audio</option>
                <option value="link">Contenu liens web</option>
                <option value="other">Divers</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lien URL (Vidéo, PDF ou Site)</label>
            <input 
              type="url" 
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description ou Résumé (Optionnel)</label>
            <textarea 
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Précisez ici les points clés ou instructions relatives à ce document..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all">
            Publier sur le Hub Étudiant
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.length > 0 ? (
          resources.map((res) => {
            const details = getResourceTypeDetails(res.type);
            return (
              <div key={res.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${details.color}`}>
                      <i className={`fa-solid ${details.icon}`}></i>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {details.label}
                    </span>
                  </div>
                  {res.content && (
                    <TTSButton 
                      text={`${res.title}. ${res.content}`} 
                      className="text-slate-300 hover:text-indigo-600" 
                    />
                  )}
                </div>
                
                <h4 className="text-lg font-bold text-slate-800 mb-2 leading-tight">{res.title}</h4>
                <p className="text-sm text-slate-500 flex-grow mb-4 line-clamp-3">
                  {res.content || "Aucune description fournie."}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Ajouté le {new Date(res.dateAdded).toLocaleDateString('fr-FR')}</span>
                  {res.url && (
                    <a href={res.url} target="_blank" rel="noreferrer" className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:underline">
                      Consulter <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                    </a>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <i className="fa-solid fa-cloud-arrow-up text-3xl text-slate-300"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800">Le Hub de contenu est vide</h3>
            <p className="text-slate-500 max-w-xs mt-2">Déposez vos premiers supports de cours, PDFs ou liens vidéos pour vos étudiants.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentManager;
