import { Category } from '../../../api/types/explore.types';

export interface Inputs {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface QuizInputs {
  name: string;
  category: Category;
  thumbnailSrc?: string;
}

export interface QuestionInputs {
  question: string;
  correct_answer: string;
  [answer: string]: string;
}
