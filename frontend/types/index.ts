/**
 * Type definitions for the application
 * Shared types between components and API calls
 */

/**
 * Document types
 */
export interface Document {
  id: string;
  title: string;
  source_type: 'pdf' | 'youtube';
  created_at: string;
}

/**
 * Chunk with embedding
 */
export interface Chunk {
  id: string;
  document_id: string;
  content: string;
  embedding: number[] | null;
  created_at: string;
}

/**
 * Chat session
 */
export interface Chat {
  id: string;
  document_id: string;
  created_at: string;
}

/**
 * Chat message
 */
export interface Message {
  id: string;
  chat_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
}

/**
 * Flashcard
 */
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

/**
 * Quiz question
 */
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
}
