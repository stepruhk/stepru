
import React from 'react';
import { Course } from '../types';
import { 
  GraduationCap, 
  LayoutDashboard, 
  FileText, 
  StickyNote, 
  Zap, 
  Radio, 
  Bot, 
  Settings, 
  Repeat,
  BrainCircuit,
  Sparkles,
  Mic
} from 'lucide-react';

interface SidebarProps {
  course: Course;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  onSwitchCourse: () => void;
  isEditMode?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  course, 
  activeTab, 
  setActiveTab, 
  onSwitchCourse,
  isEditMode = false
}) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Accueil' },
    { id: 'resources', icon: FileText, label: 'Contenu' },
    { id: 'evernote', icon: StickyNote, label: 'Notes Evernote' },
    { id: 'flashcards', icon: Zap, label: 'Cartes mémo' },
    { id: 'podcast', icon: Radio, label: 'Balado' },
    { id: 'ai-agent', icon: Bot, label: 'Assistant IA' },
  ];

  const labItems = [
    { id: 'lab-text', icon: BrainCircuit, label: 'Lab Texte', color: 'text-indigo-400' },
    { id: 'lab-image', icon: Sparkles, label: 'Lab Image', color: 'text-purple-400' },
    { id: 'lab-live', icon: Mic, label: 'Lab Voix', color: 'text-rose-400' },
  ];

  return (
    <div className="w-64 bg-slate-950 text-white flex flex-col h-full shadow-2xl z-20 border-r border-white/5">
      <div className="p-6 flex-grow overflow-y-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className={`w-12 h-12 rounded-2xl ${course.color} flex items-center justify-center shadow-lg border border-white/10`}>
            <GraduationCap size={28} />
          </div>
          <div>
            <span className="font-black text-xl tracking-tight block leading-none">Stépru</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-[9px] text-orange-400 font-black uppercase tracking-widest">Version 2.5</span>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mb-2 px-4">Menu</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-bold">{item.label}</span>
              </button>
            );
          })}

          <div className="pt-8 pb-2">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2 px-4 flex items-center gap-2 animate-pulse">
              <Sparkles size={12} /> IA LABS (BETA)
            </p>
          </div>
          
          {labItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-slate-800 text-white border border-white/10' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <Icon size={18} className={item.color} />
                <span className="text-sm font-bold">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 bg-black/40 border-t border-white/5 space-y-2">
        <button 
          onClick={onSwitchCourse}
          className="w-full py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs text-slate-300 font-bold flex items-center justify-center gap-2 transition-all"
        >
          <Repeat size={14} /> Changer de cours
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'settings' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'
          }`}
        >
          <Settings size={18} />
          <span className="text-sm font-bold">Réglages</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
