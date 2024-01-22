export enum Category {
  ANIMALS = 'animals',
  ANIME = 'anime',
  ART = 'art',
  ASTROLOGY = 'astrology',
  BOOKS = 'books',
  CODING = 'coding',
  COMICS = 'comics',
  CULTURE = 'culture',
  CUSTOM = 'custom',
  ELECTRONICS = 'electronics',
  ENGLISH = 'english',
  FOOD = 'food',
  GAMING = 'gaming',
  GEOGRAPHY = 'geography',
  HISTORY = 'history',
  LANGUAGES = 'languages',
  MANGA = 'manga',
  MATH = 'math',
  MOVIES = 'movies',
  MUSIC = 'music',
  MYTHOLOGY = 'mythology',
  PHILOSOPHY = 'philosophy',
  PHYSICS = 'physics',
  PSYCHOLOGY = 'psychology',
  SCIENCE = 'science',
  SPORTS = 'sports',
  TECHNOLOGY = 'technology',
  TRAVEL = 'travel',
  VEHICLES = 'vehicles',
  WEATHER = 'weather',
  WELLNESS = 'wellness',
  WORLD = 'world',
}

export interface QuizType {
  quiz_id: number;
  quiz_name: string;
  category: Category;
  author: string;
  question_count: number;
  thumbnail_src?: string;
}

export interface QuizzesData {
  quizzes: QuizType[];
  quizzes_count: number;
}
