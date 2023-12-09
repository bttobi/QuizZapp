export interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
  timeInMs: number;
  pictureSrc?: string;
}

export interface QuizData {
  quizID: number;
  questions: Question[];
}

export interface Results {
  quizID: number;
  userEmail: string;
  score: number;
  correctAnswers: string[];
}
