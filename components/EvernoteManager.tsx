
import React, { useState } from 'react';
import { Course, EvernoteNote } from '../types';
import TTSButton from './TTSButton';

interface EvernoteManagerProps {
  course: Course;
  notes: EvernoteNote[];
  onAddNote: (note: EvernoteNote) => void;
  onDeleteNote: (id: string) => void;
}

const EvernoteManager: React.FC<EvernoteManagerProps> = ({ course, notes, onAddNote, onDeleteNote }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('Contenu');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    onAddNote({
      id: Math.random().toString(36).substr(2, 9),
      courseId: course.id,
      title,
      url,
      category,
      dateAdded: new Date().toISOString()
    });

    setTitle('');
    setUrl('');
    setShowAdd(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#00A82D] rounded-2xl flex items-center justify-center text-white shadow-lg">
            <i className="fa-solid fa-note-sticky text-3xl"></i>
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900">Notes Evernote</h2>
            <p className="text-slate-500">Centralisez vos recherches et prises de notes pour {course.name}.</p>
          </div>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
            showAdd ? 'bg-slate-200 text-slate-700' : 'bg-[#00A82D] text-white shadow-xl shadow-green-100'
          }`}
        >
          <i className={`fa-solid ${showAdd ? 'fa-xmark' : 'fa-plus'}`}></i>
          {showAdd ? 'Fermer' : 'Déposer une note'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] border border-green-100 shadow-2xl space-y-4 animate-in slide-in-from-top-4">
          <div className="flex items-center gap-2 text-[#00A82D] font-bold mb-2">
            <i className="fa-brands fa-evernote text-xl"></i>
            <h3>Ajouter un lien de note Evernote</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Titre de la note</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ex: Analyse du cas Coca-Cola"
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#00A82D] transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Catégorie</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#00A82D] transition-all"
              >
                <option value="Divers">Divers</option>
                <option value="Contenu">Contenu</option>
                <option value="Lectures">Lectures</option>
                <option value="Transcriptions">Transcriptions</option>
                <option value="Évaluation de l'apprentissage">Évaluation de l'apprentissage</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">URL de partage Evernote</label>
            <input 
              type="url" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.evernote.com/shard/..."
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#00A82D] transition-all"
              required
            />
          </div>
          <button type="submit" className="w-full py-4 bg-[#00A82D] text-white rounded-2xl font-black text-lg shadow-xl hover:bg-green-700 transition-all active:scale-[0.98]">
            Enregistrer la note dans mon Hub
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden flex flex-col h-full">
              <div className="p-8 flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <div className="px-3 py-1 bg-green-50 text-[#00A82D] text-[10px] font-black uppercase tracking-widest rounded-full">
                    {note.category}
                  </div>
                  <div className="flex items-center gap-3">
                    <TTSButton text={`${note.title}. Catégorie ${note.category}`} className="text-slate-300 hover:text-[#00A82D]" />
                    <button 
                      onClick={() => onDeleteNote(note.id)}
                      className="text-slate-300 hover:text-rose-500 transition-colors"
                    >
                      <i className="fa-solid fa-trash-can text-sm"></i>
                    </button>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{note.title}</h4>
                <p className="text-xs text-slate-400">Ajoutée le {new Date(note.dateAdded).toLocaleDateString('fr-FR')}</p>
              </div>
              
              <a 
                href={note.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-4 bg-slate-50 group-hover:bg-[#00A82D] text-slate-600 group-hover:text-white text-center font-bold text-sm transition-all border-t border-slate-100"
              >
                Ouvrir dans Evernote <i className="fa-solid fa-arrow-up-right-from-square ml-2 text-xs"></i>
              </a>
            </div>
          ))
        ) : (
          <div className="col-span-full py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center px-6">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <i className="fa-brands fa-evernote text-4xl text-slate-300"></i>
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Aucune note déposée</h3>
            <p className="text-slate-500 max-w-sm mt-3 leading-relaxed">
              Utilisez ce module pour regrouper vos liens de notes Evernote partagées et y accéder en un clic depuis votre espace de cours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvernoteManager;
