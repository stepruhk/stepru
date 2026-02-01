
import React, { useState, useEffect } from 'react';
import { COURSES, INITIAL_RESOURCES, INITIAL_FLASHCARDS, INITIAL_EVERNOTE, APP_VERSION } from './constants';
import { Course, Resource, Flashcard, EvernoteNote } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CourseSelector from './components/CourseSelector';
import ContentManager from './components/ContentManager';
import FlashcardPlayer from './components/FlashcardPlayer';
import AIAgentChat from './components/AIAgentChat';
import PodcastSection from './components/PodcastSection';
import EvernoteManager from './components/EvernoteManager';
import AccessGate from './components/AccessGate';
import SettingsView from './components/SettingsView';
import TextLab from './components/TextLab';
import ImageLab from './components/ImageLab';
import LiveLab from './components/LiveLab';

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'resources' | 'flashcards' | 'podcast' | 'ai-agent' | 'evernote' | 'settings' | 'lab-text' | 'lab-image' | 'lab-live'>('dashboard');
  const [showUpdateToast, setShowUpdateToast] = useState(false);
  
  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem('stepru_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });
  
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    const saved = localStorage.getItem('stepru_flashcards');
    return saved ? JSON.parse(saved) : INITIAL_FLASHCARDS;
  });
  
  const [evernoteNotes, setEvernoteNotes] = useState<EvernoteNote[]>(() => {
    const saved = localStorage.getItem('stepru_evernote');
    return saved ? JSON.parse(saved) : INITIAL_EVERNOTE;
  });
  
  const [isEditMode, setIsEditMode] = useState<boolean>(() => localStorage.getItem('stepru_edit_mode') === 'true');

  useEffect(() => {
    const authorized = sessionStorage.getItem('stepru_authorized');
    if (authorized === 'true') setIsAuthorized(true);

    // Version Check to force refresh
    const lastVersion = localStorage.getItem('stepru_app_version');
    if (lastVersion !== APP_VERSION) {
      localStorage.setItem('stepru_app_version', APP_VERSION);
      setShowUpdateToast(true);
      setTimeout(() => setShowUpdateToast(false), 5000);
    }
  }, []);

  useEffect(() => { localStorage.setItem('stepru_resources', JSON.stringify(resources)); }, [resources]);
  useEffect(() => { localStorage.setItem('stepru_flashcards', JSON.stringify(flashcards)); }, [flashcards]);
  useEffect(() => { localStorage.setItem('stepru_evernote', JSON.stringify(evernoteNotes)); }, [evernoteNotes]);

  const handleAuthorize = () => {
    setIsAuthorized(true);
    sessionStorage.setItem('stepru_authorized', 'true');
  };

  const handleToggleEditMode = (val: boolean) => {
    setIsEditMode(val);
    localStorage.setItem('stepru_edit_mode', val.toString());
  };

  const handleResetToOfficial = () => {
    if (window.confirm("Réinitialiser tout le contenu local ?")) {
      setResources(INITIAL_RESOURCES);
      setFlashcards(INITIAL_FLASHCARDS);
      setEvernoteNotes(INITIAL_EVERNOTE);
      localStorage.removeItem('stepru_resources');
      localStorage.removeItem('stepru_flashcards');
      localStorage.removeItem('stepru_evernote');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden text-slate-900 font-sans relative">
      {showUpdateToast && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] bg-amber-500 text-white px-6 py-3 rounded-2xl shadow-2xl font-black text-sm animate-in slide-in-from-top-4 flex items-center gap-3">
          <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          MISE À JOUR v{APP_VERSION} APPLIQUÉE
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {!isAuthorized ? (
          <div className="flex-1 flex items-center justify-center p-4 bg-slate-100">
            <AccessGate onAuthorize={handleAuthorize} />
          </div>
        ) : !selectedCourse ? (
          <div className="flex-1 overflow-y-auto bg-slate-100 flex items-center justify-center p-4">
            <CourseSelector courses={COURSES} onSelect={setSelectedCourse} />
          </div>
        ) : (
          <>
            <Sidebar 
              course={selectedCourse} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              onSwitchCourse={() => setSelectedCourse(null)} 
              isEditMode={isEditMode}
            />
            <main className="flex-1 overflow-y-auto bg-slate-50">
              <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-full">
                {activeTab === 'dashboard' && (
                  <Dashboard 
                    course={selectedCourse} 
                    resources={resources.filter(r => r.courseId === selectedCourse.id)} 
                    setActiveTab={setActiveTab} 
                  />
                )}
                {activeTab === 'resources' && (
                  <ContentManager 
                    course={selectedCourse} 
                    resources={resources.filter(r => r.courseId === selectedCourse.id)} 
                    isEditMode={isEditMode} 
                    onAddResource={(res) => setResources(prev => [...prev, res])} 
                  />
                )}
                {activeTab === 'flashcards' && (
                  <FlashcardPlayer 
                    course={selectedCourse} 
                    flashcards={flashcards.filter(f => f.courseId === selectedCourse.id)} 
                    isEditMode={isEditMode} 
                    onAddCard={(card) => setFlashcards(prev => [...prev, card])} 
                  />
                )}
                {activeTab === 'podcast' && <PodcastSection />}
                {activeTab === 'ai-agent' && <AIAgentChat course={selectedCourse} />}
                {activeTab === 'evernote' && (
                  <EvernoteManager 
                    course={selectedCourse} 
                    notes={evernoteNotes.filter(n => n.courseId === selectedCourse.id)} 
                    isEditMode={isEditMode} 
                    onAddNote={(note) => setEvernoteNotes(prev => [...prev, note])} 
                    onDeleteNote={(id) => setEvernoteNotes(prev => prev.filter(n => n.id !== id))} 
                  />
                )}
                {activeTab === 'settings' && (
                  <SettingsView 
                    isEditMode={isEditMode} 
                    onToggleEditMode={handleToggleEditMode} 
                    onResetToOfficial={handleResetToOfficial} 
                  />
                )}
                {activeTab === 'lab-text' && (
                  <div className="h-[calc(100vh-100px)] bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <TextLab />
                  </div>
                )}
                {activeTab === 'lab-image' && (
                   <div className="h-[calc(100vh-100px)] bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <ImageLab />
                  </div>
                )}
                {activeTab === 'lab-live' && (
                  <div className="h-[calc(100vh-100px)] bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <LiveLab />
                  </div>
                )}
              </div>
            </main>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
