import { Category } from './explore.types';

export interface Question {
  question: string;
  question_id: number;
  answers: string[];
  picture_src?: string;
}

export interface UserAnswer {
  question_id: number;
  answer: string;
}

export interface CorrectAnswer {
  question_id: number;
  answer: string;
}

export interface Results {
  quiz_id: number;
  user_id: number;
  score: number;
  correctAnswers: string[];
}

export interface QuizData {
  quiz_name: string;
  category: Category;
  thumbnail_src?: string;
}

export interface QuestionData {
  question_id: number;
  question: string;
  correct_answer: string;
  answers: string[];
}
