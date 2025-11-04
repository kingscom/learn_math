export interface Problem {
  num1: number;
  num2: number;
  answer: number;
}

export interface WordProblem {
  korean: string;
  english: string;
}

export interface ProverbProblem {
  first: string;
  second: string;
  isFirstHalf?: boolean; // 랜덤 생성 시 추가되는 속성
}

export type GameMode = 'menu' | 'addition' | 'multiplication' | 'english' | 'proverb';