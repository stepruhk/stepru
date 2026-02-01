import { Course, Resource, Flashcard, EvernoteNote } from './types';

export const APP_VERSION = '3.3.1';

export const COURSES: Course[] = [
  { id: '1', name: 'Relations médias et influenceurs', code: 'COMM-101', description: 'Gérer l\'image de marque et optimiser les collaborations stratégiques.', color: 'bg-indigo-600' },
  { id: '2', name: 'Introduction à la comm strat', code: 'COMM-202', description: 'Les fondements et les leviers de la communication stratégique moderne.', color: 'bg-emerald-600' },
  { id: '3', name: 'Théories de communication', code: 'COMM-305', description: 'Analyse approfondie des approches, des modèles et des paradigmes appliqués dans un contexte récent.', color: 'bg-rose-600' },
  { id: '4', name: 'Ingénierie de la crédibilité Ⓡ', code: 'COMM-410', description: 'Méthodologies avancées pour bâtir et protéger la crédibilité corporative et la réputation.', color: 'bg-amber-600' },
  { id: '5', name: 'Relations de presse', code: 'COMM-501', description: 'Techniques fondamentales pour établir et maintenir des relations durables avec les médias d\'information.', color: 'bg-cyan-600' }
];

export const INITIAL_RESOURCES: Resource[] = [];

export const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    courseId: '1',
    question: 'Qu\'est-ce qu\'un relais d\'opinion ?',
    answer: 'Une personne ou un groupe dont l\'influence et le statut permettent de diffuser des messages vers un public plus large.'
  }
];

export const INITIAL_EVERNOTE: EvernoteNote[] = [];

export const SYSTEM_PROMPT = `Tu es "Le Prof de Com", un agent académique spécialisé en IA pour les étudiants en communication. 
Ton objectif est d'expliquer des théories de communication complexes, d'aider à l'analyse rhétorique, de suggérer des stratégies de relations publiques et de donner des retours sur la rédaction médiatique.
Sois professionnel, encourageant et académiquement rigoureux.
Tu es basé sur le profil de Stepru. Réponds toujours en français.`;

export const SPOTIFY_SHOW_ID = '4C0DeBIvVZjRbM6MUOylOT';

export const CHATGPT_GPT_URL = 'https://chatgpt.com/g/g-ZltU00p7B-stepru-the-comms-professor';

export const ACCESS_CODE = 'comm2026';
