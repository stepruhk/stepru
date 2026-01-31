
import React, { useState, useEffect } from 'react';
import { COURSES } from './constants';
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

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'resources' | 'flashcards' | 'podcast' | 'ai-agent' | 'evernote'>('dashboard');
  const [resources, setResources] = useState<Resource[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [evernoteNotes, setEvernoteNotes] = useState<EvernoteNote[]>([]);

  useEffect(() => {
    // Check if session is already authorized
    const authorized = sessionStorage.getItem('stepru_authorized');
    if (authorized === 'true') {
      setIsAuthorized(true);
    }

    const savedResources = localStorage.getItem('stepru_resources');
    const savedCards = localStorage.getItem('stepru_flashcards');
    const savedEvernote = localStorage.getItem('stepru_evernote');
    
    if (savedResources) setResources(JSON.parse(savedResources));
    if (savedCards) setFlashcards(JSON.parse(savedCards));
    if (savedEvernote) setEvernoteNotes(JSON.parse(savedEvernote));
  }, []);

  const handleAuthorize = () => {
    setIsAuthorized(true);
    sessionStorage.setItem('stepru_authorized', 'true');
  };

  const handleAddResource = (res: Resource) => {
    const newResources = [...resources, res];
    setResources(newResources);
    localStorage.setItem('stepru_resources', JSON.stringify(newResources));
  };

  const handleAddFlashcard = (card: Flashcard) => {
    const newCards = [...flashcards, card];
    setFlashcards(newCards);
    localStorage.setItem('stepru_flashcards', JSON.stringify(newCards));
  };

  const handleAddEvernoteNote = (note: EvernoteNote) => {
    const newNotes = [...evernoteNotes, note];
    setEvernoteNotes(newNotes);
    localStorage.setItem('stepru_evernote', JSON.stringify(newNotes));
  };

  const handleDeleteEvernoteNote = (id: string) => {
    const newNotes = evernoteNotes.filter(n => n.id !== id);
    setEvernoteNotes(newNotes);
    localStorage.setItem('stepru_evernote', JSON.stringify(newNotes));
  };

  // 1. First barrier: Access Code
  if (!isAuthorized) {
    return <AccessGate onAuthorize={handleAuthorize} />;
  }

  // 2. Second barrier: Course Selection
  if (!selectedCourse) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <CourseSelector courses={COURSES} onSelect={setSelectedCourse} />
      </div>
    );
  }

  // 3. Main App Shell
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      <Sidebar 
        course={selectedCourse} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onSwitchCourse={() => setSelectedCourse(null)}
      />
      
      <main className="flex-1 overflow-y-auto relative p-6 md:p-10">
        <div className="max-w-6xl mx-auto space-y-8">
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
              onAddResource={handleAddResource}
            />
          )}
          {activeTab === 'flashcards' && (
            <FlashcardPlayer 
              course={selectedCourse} 
              flashcards={flashcards.filter(f => f.courseId === selectedCourse.id)}
              onAddCard={handleAddFlashcard}
            />
          )}
          {activeTab === 'podcast' && (
            <PodcastSection />
          )}
          {activeTab === 'ai-agent' && (
            <AIAgentChat course={selectedCourse} />
          )}
          {activeTab === 'evernote' && (
            <EvernoteManager 
              course={selectedCourse} 
              notes={evernoteNotes.filter(n => n.courseId === selectedCourse.id)}
              onAddNote={handleAddEvernoteNote}
              onDeleteNote={handleDeleteEvernoteNote}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
