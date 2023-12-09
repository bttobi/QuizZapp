export enum Category {
  ANIME = 'anime',
  MANGA = 'manga',
  COMICS = 'comics',
  WORLD = 'world',
  SCIENCE = 'science',
  PHYSICS = 'physics',
  MATH = 'math',
  HISTORY = 'history',
  ENGLISH = 'english',
  CUSTOM = 'custom',
  GAMING = 'gaming',
  CODING = 'coding',
  ELECTRONICS = 'electronics',
  FOOD = 'food',
}

export interface QuizType {
  quizID: number;
  name: string;
  category: Category;
  author: string;
  thumbnailSrc?: string;
}
