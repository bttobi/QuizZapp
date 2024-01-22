export interface UserScoresData {
  email: string;
  attempt_count: number | null;
  best_prof_quiz: number | null;
  best_question: string | null;
  best_question_prof: number | null;
  best_quiz: number | null;
  created_quizzes: number | null;
  most_taken_count: number | null;
  most_taken_quiz: string | null;
  overall_prof: number | null;
  worst_prof_quiz: number | null;
  worst_question: string | null;
  worst_question_prof: number | null;
  worst_quiz: string | null;
}

export interface AllStatsData {
  users_count: number | null;
  quizzes_count: number | null;
  questions_count: number | null;
  attempts_count: number | null;
  all_good_answers: number | null;
  all_bad_answers: number | null;
}
