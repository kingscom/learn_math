import { useState, useEffect } from 'react';
import { GameMode, Problem, WordProblem, ProverbProblem } from '../types';
import { englishWords } from '../data/englishWords';
import { koreanProverbs } from '../data/koreanProverbs';
import { generateMathProblems, getRandomItems } from '../utils/gameUtils';

export const useGameLogic = () => {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [problems, setProblems] = useState<Problem[]>([]);
  const [wordProblems, setWordProblems] = useState<WordProblem[]>([]);
  const [proverbProblems, setProverbProblems] = useState<ProverbProblem[]>([]);
  const [isFirstHalf, setIsFirstHalf] = useState(true);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [hintLevel, setHintLevel] = useState(0);

  // 게임 시작 함수
  const startGame = (mode: 'addition' | 'multiplication' | 'english' | 'proverb') => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    setGameMode(mode);
    setCurrentProblem(0);
    setUserAnswer('');
    setScore(0);
    setGameComplete(false);
    setShowResult(false);
    setTimeLeft(5);
    setHintLevel(0);
    
    // 속담 게임의 경우 랜덤하게 앞/뒤 선택
    if (mode === 'proverb') {
      setIsFirstHalf(Math.random() > 0.5);
    }
  };

  // 게임 재시작 함수
  const restartGame = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    setCurrentProblem(0);
    setUserAnswer('');
    setScore(0);
    setGameComplete(false);
    setShowResult(false);
    setTimeLeft(5);
    setHintLevel(0);
    setGameMode('menu');
  };

  // 문제 生성 useEffect
  useEffect(() => {
    if (gameMode === 'menu') return;

    if (gameMode === 'english') {
      const shuffled = getRandomItems(englishWords, 10);
      setWordProblems(shuffled);
    } else if (gameMode === 'proverb') {
      // 속담을 랜덤하게 섞고 각각에 대해 앞/뒤를 랜덤 선택
      const shuffledProverbs = getRandomItems(koreanProverbs, 10);
      const proverbsWithRandomHalf = shuffledProverbs.map(proverb => ({
        ...proverb,
        isFirstHalf: Math.random() > 0.5
      }));
      setProverbProblems(proverbsWithRandomHalf);
    } else {
      const newProblems = generateMathProblems(gameMode);
      setProblems(newProblems);
    }
  }, [gameMode]);

  // 타이머 useEffect (수학 문제에만 적용)
  useEffect(() => {
    if (gameMode === 'addition' || gameMode === 'multiplication') {
      if (!showResult && !gameComplete) {
        setTimeLeft(5);
        const timer = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              setIsCorrect(false);
              setShowResult(true);
              setTimeout(() => {
                const problemsLength = problems.length;
                if (currentProblem < problemsLength - 1) {
                  setCurrentProblem(prev => prev + 1);
                  setUserAnswer('');
                  setShowResult(false);
                  setHintLevel(0);
                } else {
                  setGameComplete(true);
                }
              }, 1500);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        setTimerId(timer);
        
        return () => {
          clearInterval(timer);
        };
      }
    }
  }, [currentProblem, gameMode, showResult, gameComplete, problems.length]);

  // 답안 제출 함수
  const handleSubmit = () => {
    if (userAnswer === '') return;

    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }

    let correct = false;
    
    if (gameMode === 'english') {
      const correctAnswer = wordProblems[currentProblem].english.toLowerCase();
      correct = userAnswer.toLowerCase() === correctAnswer;
    } else if (gameMode === 'proverb') {
      const currentProverbProblem = proverbProblems[currentProblem];
      const correctAnswer = currentProverbProblem.isFirstHalf ? currentProverbProblem.second : currentProverbProblem.first;
      correct = userAnswer.trim() === correctAnswer;
    } else {
      const userNum = parseInt(userAnswer);
      correct = userNum === problems[currentProblem].answer;
    }
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(prev => prev + 1);
    }

    const problemsLength = gameMode === 'english' ? wordProblems.length : gameMode === 'proverb' ? proverbProblems.length : problems.length;
    
    setTimeout(() => {
      if (currentProblem < problemsLength - 1) {
        setCurrentProblem(prev => prev + 1);
        setUserAnswer('');
        setShowResult(false);
        setHintLevel(0);
      } else {
        setGameComplete(true);
      }
    }, 1500);
  };

  // 힌트 함수
  const handleHint = () => {
    if (gameMode === 'english' && wordProblems.length > 0) {
      const correctAnswer = wordProblems[currentProblem].english;
      const nextHintLevel = Math.min(hintLevel + 1, correctAnswer.length);
      setHintLevel(nextHintLevel);
    } else if (gameMode === 'proverb' && proverbProblems.length > 0) {
      const currentProverbProblem = proverbProblems[currentProblem];
      const correctAnswer = currentProverbProblem.isFirstHalf ? currentProverbProblem.second : currentProverbProblem.first;
      const nextHintLevel = Math.min(hintLevel + 1, correctAnswer.length);
      setHintLevel(nextHintLevel);
    }
  };

  return {
    // State
    gameMode,
    problems,
    wordProblems,
    proverbProblems,
    isFirstHalf,
    currentProblem,
    userAnswer,
    score,
    gameComplete,
    showResult,
    isCorrect,
    timeLeft,
    hintLevel,
    
    // Actions
    setUserAnswer,
    startGame,
    restartGame,
    handleSubmit,
    handleHint,
    
    // Utils
    isLoading: (gameMode !== 'english' && gameMode !== 'proverb' && problems.length === 0) || 
               (gameMode === 'english' && wordProblems.length === 0) ||
               (gameMode === 'proverb' && proverbProblems.length === 0)
  };
};