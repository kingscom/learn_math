import { Problem } from '../types';

// 수학 문제 생성 함수
export const generateMathProblems = (gameMode: 'addition' | 'multiplication'): Problem[] => {
  const problems: Problem[] = [];
  
  for (let i = 0; i < 10; i++) {
    if (gameMode === 'addition') {
      // 5~19 범위의 덧셈 문제
      const num1 = Math.floor(Math.random() * 15) + 5;
      const num2 = Math.floor(Math.random() * 15) + 5;
      problems.push({
        num1,
        num2,
        answer: num1 + num2
      });
    } else if (gameMode === 'multiplication') {
      // 2~9 범위의 곱셈 문제
      const num1 = Math.floor(Math.random() * 8) + 2;
      const num2 = Math.floor(Math.random() * 8) + 2;
      problems.push({
        num1,
        num2,
        answer: num1 * num2
      });
    }
  }
  
  return problems;
};

// 배열 셔플 함수
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 랜덤 선택 함수
export const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
};