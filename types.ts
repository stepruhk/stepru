
export type ResourceType = 'written' | 'ppt' | 'media' | 'link' | 'other';

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  content?: string;
  url?: string;
  courseId: string;
  dateAdded: string;
}

export interface EvernoteNote {
  id: string;
  courseId: string;
  title: string;
  url: string;
  category: string;
  dateAdded: string;
}

export interface Flashcard {
  id: string;
  courseId: string;
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  code: string;
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
