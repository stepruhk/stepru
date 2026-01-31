
import React, { useState } from 'react';
import { Course, Flashcard } from '../types';
import TTSButton from './TTSButton';

interface FlashcardPlayerProps {
  course: Course;
  flashcards: Flashcard[];
  onAddCard: (card: Flashcard) => void;
}

const FlashcardPlayer: React.FC<FlashcardPlayerProps> = ({ course, flashcards, onAddCard }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newQ, setNewQ] = useState('');
  const [newA, setNewA] = useState('');

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQ || !newA) return;
    onAddCard({
      id: Math.random().toString(36).substr(2, 9),
      courseId: course.id,
      question: newQ,
      answer: newA
    });
    setNewQ('');
    setNewA('');
    setShowAdd(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Révisions par Cartes</h2>
          <p className="text-slate-500">Maîtrisez les concepts clés de {course.name}.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-white px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2"
        >
          <i className="fa-solid fa-plus text-indigo-500"></i> Nouvelle carte
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-3xl border border-indigo-100 shadow-xl space-y-4 animate-in slide-in-from-top-4 duration-300">
           <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Question / Concept</label>
              <textarea 
                value={newQ}
                onChange={(e) => setNewQ(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Réponse / Définition</label>
              <textarea 
                value={newA}
                onChange={(e) => setNewA(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all">
              Créer la carte
            </button>
        </form>
      )}

      {flashcards.length > 0 ? (
        <div className="space-y-8">
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="group perspective-1000 cursor-pointer h-80 relative"
          >
            <div className={`relative w-full h-full transition-all duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              {/* Recto */}
              <div className="absolute inset-0 bg-white backface-hidden rounded-3xl shadow-xl border border-slate-100 p-12 flex flex-col items-center justify-center text-center">
                <div className="absolute top-6 left-6 flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Question</span>
                  <TTSButton text={currentCard.question} className="text-indigo-400 hover:text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 leading-snug">{currentCard.question}</h3>
                <p className="mt-8 text-indigo-500 text-sm font-semibold animate-pulse">Cliquez pour voir la réponse</p>
              </div>
              
              {/* Verso */}
              <div className="absolute inset-0 bg-indigo-600 backface-hidden rotate-y-180 rounded-3xl shadow-xl p-12 flex flex-col items-center justify-center text-center text-white">
                <div className="absolute top-6 left-6 flex items-center gap-4">
                  <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Réponse</span>
                  <TTSButton text={currentCard.answer} className="text-indigo-200 hover:text-white" />
                </div>
                <p className="text-xl leading-relaxed">{currentCard.answer}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button onClick={handlePrev} className="p-4 rounded-full bg-white shadow-md border border-slate-100 hover:text-indigo-600 transition-all">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <div className="px-6 py-2 bg-slate-100 rounded-full text-slate-600 font-bold">
              {currentIndex + 1} / {flashcards.length}
            </div>
            <button onClick={handleNext} className="p-4 rounded-full bg-white shadow-md border border-slate-100 hover:text-indigo-600 transition-all">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      ) : (
        <div className="py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-center">
          <i className="fa-solid fa-layer-group text-4xl text-slate-300 mb-4"></i>
          <p className="text-slate-500">Aucune carte mémo. Créez-en pour aider vos étudiants à réviser !</p>
        </div>
      )}
      
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default FlashcardPlayer;
