
import React from 'react';
import { Course } from '../types';

interface SidebarProps {
  course: Course;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  onSwitchCourse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ course, activeTab, setActiveTab, onSwitchCourse }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fa-house', label: 'Tableau de bord' },
    { id: 'resources', icon: 'fa-file-lines', label: 'Contenu du cours' },
    { id: 'evernote', icon: 'fa-note-sticky', label: 'Notes Evernote' },
    { id: 'flashcards', icon: 'fa-bolt', label: 'Cartes mémo' },
    { id: 'podcast', icon: 'fa-podcast', label: 'Comprendre les RP' },
    { id: 'ai-agent', icon: 'fa-robot', label: 'Assistant IA' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full shadow-2xl">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className={`w-8 h-8 rounded-lg ${course.color} flex items-center justify-center`}>
            <i className="fa-solid fa-graduation-cap text-sm"></i>
          </div>
          <span className="font-bold text-lg tracking-tight">Stepru Hub</span>
        </div>

        <div className="mb-8 px-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Cours Actuel</p>
          <h2 className="text-sm font-medium text-white truncate">{course.name}</h2>
          <button 
            onClick={onSwitchCourse}
            className="text-xs text-indigo-400 hover:text-indigo-300 mt-2 flex items-center gap-1"
          >
            <i className="fa-solid fa-right-left"></i> Changer de cours
          </button>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activeTab === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5`}></i>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 bg-slate-800/50">
        <div className="flex items-center gap-3">
          <img src="https://picsum.photos/40/40" className="w-10 h-10 rounded-full border-2 border-indigo-500" alt="Avatar" />
          <div>
            <p className="text-sm font-semibold">Compte Étudiant</p>
            <p className="text-xs text-slate-400">Voir le profil</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
