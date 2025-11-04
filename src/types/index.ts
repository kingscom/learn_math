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

export interface CountryProblem {
  country: string;
  capital: string;
  askCountry?: boolean; // true면 수도를 보여주고 나라를 맞추기, false면 나라를 보여주고 수도를 맞추기
}

export type GameMode = 'menu' | 'addition' | 'multiplication' | 'english' | 'proverb' | 'country';