import { useState, useEffect, useRef } from 'react';
import { GameMode, Problem, WordProblem, ProverbProblem, CountryProblem, HistoricalFigureProblem, RiddleProblem } from '../types';
import { englishWords } from '../data/englishWords';
import { englishWords2 } from '../data/englishWords2';
import { hayoungWords } from '../data/hayoungWords';
import { koreanProverbs } from '../data/koreanProverbs';
import { countries } from '../data/countries';
import { historicalFigures } from '../data/historicalFigures';
import { riddles } from '../data/riddles';
import { generateMathProblems, getRandomItems, generateChoices, shuffleArray } from '../utils/gameUtils';

export const useGameLogic = () => {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [problems, setProblems] = useState<Problem[]>([]);
  const [wordProblems, setWordProblems] = useState<WordProblem[]>([]);
  const [wordProblems2, setWordProblems2] = useState<WordProblem[]>([]);
  const [hayoungProblems, setHayoungProblems] = useState<WordProblem[]>([]);
  const [hayoungResults, setHayoungResults] = useState<boolean[]>([]);
  const [proverbProblems, setProverbProblems] = useState<ProverbProblem[]>([]);
  const [countryProblems, setCountryProblems] = useState<CountryProblem[]>([]);
  const [historicalProblems, setHistoricalProblems] = useState<HistoricalFigureProblem[]>([]);
  const [riddleProblems, setRiddleProblems] = useState<RiddleProblem[]>([]);
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
  
  // userAnswer의 최신 값을 참조하기 위한 ref
  const userAnswerRef = useRef(userAnswer);
  
  // userAnswer가 변경될 때마다 ref 업데이트
  useEffect(() => {
    userAnswerRef.current = userAnswer;
  }, [userAnswer]);

  // 게임 시작 함수
  const startGame = (mode: GameMode) => {
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
      // 4지선다 선택지 생성
      const problemsWithChoices = shuffled.map(problem => ({
        ...problem,
        choices: generateChoices(problem.english, englishWords.map(w => w.english))
      }));
      setWordProblems(problemsWithChoices);
    } else if (gameMode === 'english2') {
      const shuffled = getRandomItems(englishWords2, 10);
      // 4지선다 선택지 생성
      const problemsWithChoices = shuffled.map(problem => ({
        ...problem,
        choices: generateChoices(problem.english, englishWords2.map(w => w.english))
      }));
      setWordProblems2(problemsWithChoices);
    } else if (gameMode === 'proverb') {
      // 속담을 랜덤하게 섞고 각각에 대해 앞/뒤를 랜덤 선택
      const shuffledProverbs = getRandomItems(koreanProverbs, 10);
      const proverbsWithRandomHalf = shuffledProverbs.map(proverb => {
        const isFirstHalf = Math.random() > 0.5;
        const correctAnswer = isFirstHalf ? proverb.second : proverb.first;
        // 모든 속담의 첫 번째/두 번째 부분을 선택지 풀로 사용
        const allAnswers = koreanProverbs.flatMap(p => [p.first, p.second]);
        return {
          ...proverb,
          isFirstHalf,
          choices: generateChoices(correctAnswer, allAnswers)
        };
      });
      setProverbProblems(proverbsWithRandomHalf);
    } else if (gameMode === 'country') {
      // 나라-수도를 랜덤하게 섞고 각각에 대해 나라/수도 중 어느 것을 물어볼지 랜덤 선택
      const shuffledCountries = getRandomItems(countries, 10);
      const countriesWithRandomQuestion = shuffledCountries.map(country => {
        const askCountry = Math.random() > 0.5; // true면 수도를 주고 나라를 맞추기
        const correctAnswer = askCountry ? country.country : country.capital;
        const allAnswers = askCountry 
          ? countries.map(c => c.country)
          : countries.map(c => c.capital);
        return {
          ...country,
          askCountry,
          choices: generateChoices(correctAnswer, allAnswers)
        };
      });
      setCountryProblems(countriesWithRandomQuestion);
    } else if (gameMode === 'historical') {
      const shuffledHistorical = getRandomItems(historicalFigures, 10);
      const historicalWithChoices = shuffledHistorical.map(figure => ({
        ...figure,
        choices: generateChoices(figure.answer, historicalFigures.map(f => f.answer))
      }));
      setHistoricalProblems(historicalWithChoices);
    } else if (gameMode === 'riddle') {
      const shuffledRiddles = getRandomItems(riddles, 10);
      setRiddleProblems(shuffledRiddles);
    } else if (gameMode === 'hayoung') {
      // 모든 단어를 랜덤으로 섞어서 사용
      const shuffled = shuffleArray(hayoungWords);
      setHayoungProblems(shuffled);
      setHayoungResults(new Array(shuffled.length).fill(false));
    } else {
      const newProblems = generateMathProblems(gameMode as 'addition' | 'multiplication' | 'division');
      setProblems(newProblems);
    }
  }, [gameMode]);

  // 타이머 useEffect (수수께끼, 하영이영어 제외한 모든 게임 모드에 적용)
  useEffect(() => {
    if (gameMode !== 'menu' && gameMode !== 'riddle' && gameMode !== 'hayoung' && !showResult && !gameComplete) {
      setTimeLeft(5);
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // 시간 초과시 현재 선택된 답안으로 정답 체크
            let correct = false;
            const currentUserAnswer = userAnswerRef.current;
            
            if (gameMode === 'english') {
              const correctAnswer = wordProblems[currentProblem]?.english?.toLowerCase() || '';
              correct = currentUserAnswer.toLowerCase() === correctAnswer;
            } else if (gameMode === 'english2') {
              const correctAnswer = wordProblems2[currentProblem]?.english?.toLowerCase() || '';
              correct = currentUserAnswer.toLowerCase() === correctAnswer;
            } else if (gameMode === 'proverb') {
              const currentProverbProblem = proverbProblems[currentProblem];
              const correctAnswer = currentProverbProblem?.isFirstHalf ? currentProverbProblem?.second : currentProverbProblem?.first;
              correct = currentUserAnswer.trim() === correctAnswer;
            } else if (gameMode === 'country') {
              const currentCountryProblem = countryProblems[currentProblem];
              const correctAnswer = currentCountryProblem?.askCountry ? currentCountryProblem?.country : currentCountryProblem?.capital;
              correct = currentUserAnswer.trim() === correctAnswer;
            } else if (gameMode === 'historical') {
              const correctAnswer = historicalProblems[currentProblem]?.answer || '';
              correct = currentUserAnswer.trim() === correctAnswer;
            } else {
              const userNum = parseInt(currentUserAnswer);
              correct = userNum === problems[currentProblem]?.answer;
            }
            
            setIsCorrect(correct);
            if (correct) {
              setScore(prev => prev + 1);
            }
            setShowResult(true);
            
            setTimeout(() => {
              const problemsLength = gameMode === 'english' ? wordProblems.length : 
                                   gameMode === 'english2' ? wordProblems2.length : 
                                   gameMode === 'proverb' ? proverbProblems.length : 
                                   gameMode === 'country' ? countryProblems.length : 
                                   gameMode === 'historical' ? historicalProblems.length :
                                   problems.length;
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
  }, [currentProblem, gameMode, showResult, gameComplete, problems.length, wordProblems.length, wordProblems2.length, proverbProblems.length, countryProblems.length, historicalProblems.length, riddleProblems.length]);

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
    } else if (gameMode === 'english2') {
      const correctAnswer = wordProblems2[currentProblem].english.toLowerCase();
      correct = userAnswer.toLowerCase() === correctAnswer;
    } else if (gameMode === 'proverb') {
      const currentProverbProblem = proverbProblems[currentProblem];
      const correctAnswer = currentProverbProblem.isFirstHalf ? currentProverbProblem.second : currentProverbProblem.first;
      correct = userAnswer.trim() === correctAnswer;
    } else if (gameMode === 'country') {
      const currentCountryProblem = countryProblems[currentProblem];
      const correctAnswer = currentCountryProblem.askCountry ? currentCountryProblem.country : currentCountryProblem.capital;
      correct = userAnswer.trim() === correctAnswer;
    } else if (gameMode === 'historical') {
      const correctAnswer = historicalProblems[currentProblem].answer;
      correct = userAnswer.trim() === correctAnswer;
    } else if (gameMode === 'riddle') {
      const correctAnswer = riddleProblems[currentProblem].answer;
      correct = userAnswer.trim() === correctAnswer;
    } else if (gameMode === 'hayoung') {
      const correctAnswer = hayoungProblems[currentProblem].english.toLowerCase();
      correct = userAnswer.toLowerCase().trim() === correctAnswer;
    } else {
      const userNum = parseInt(userAnswer);
      correct = userNum === problems[currentProblem].answer;
    }
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(prev => prev + 1);
    }

    // hayoung 게임의 경우 결과를 배열에 저장
    if (gameMode === 'hayoung') {
      const newResults = [...hayoungResults];
      newResults[currentProblem] = correct;
      setHayoungResults(newResults);
    }

    const problemsLength = gameMode === 'english' ? wordProblems.length : 
                           gameMode === 'english2' ? wordProblems2.length : 
                           gameMode === 'proverb' ? proverbProblems.length : 
                           gameMode === 'country' ? countryProblems.length : 
                           gameMode === 'historical' ? historicalProblems.length :
                           gameMode === 'riddle' ? riddleProblems.length :
                           gameMode === 'hayoung' ? hayoungProblems.length :
                           problems.length;
    
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

  // 4지선다 선택 함수
  const handleChoiceSelect = (choice: string) => {
    setUserAnswer(choice);
  };

  // 힘트 함수
  const handleHint = () => {
    if (gameMode === 'english' && wordProblems.length > 0) {
      setHintLevel(prev => Math.min(prev + 1, wordProblems[currentProblem]?.english.length || 0));
    } else if (gameMode === 'english2' && wordProblems2.length > 0) {
      setHintLevel(prev => Math.min(prev + 1, wordProblems2[currentProblem]?.english.length || 0));
    } else if (gameMode === 'proverb' && proverbProblems.length > 0) {
      const currentProverbProblem = proverbProblems[currentProblem];
      const correctAnswer = currentProverbProblem.isFirstHalf ? currentProverbProblem.second : currentProverbProblem.first;
      const nextHintLevel = Math.min(hintLevel + 1, correctAnswer.length);
      setHintLevel(nextHintLevel);
    } else if (gameMode === 'country' && countryProblems.length > 0) {
      const currentCountryProblem = countryProblems[currentProblem];
      const correctAnswer = currentCountryProblem.askCountry ? currentCountryProblem.country : currentCountryProblem.capital;
      const nextHintLevel = Math.min(hintLevel + 1, correctAnswer.length);
      setHintLevel(nextHintLevel);
    } else if (gameMode === 'historical' && historicalProblems.length > 0) {
      const correctAnswer = historicalProblems[currentProblem].answer;
      const nextHintLevel = Math.min(hintLevel + 1, correctAnswer.length);
      setHintLevel(nextHintLevel);
    } else if (gameMode === 'riddle' && riddleProblems.length > 0) {
      // 수수께끼는 단순히 힌트 표시 여부만 토글 (0 또는 1)
      setHintLevel(hintLevel === 0 ? 1 : 1);
    }
  };

  return {
    // State
    gameMode,
    problems,
    wordProblems,
    wordProblems2,
    proverbProblems,
    countryProblems,
    historicalProblems,
    riddleProblems,
    hayoungProblems,
    hayoungResults,
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
    handleChoiceSelect,
    
    // Utils
    isLoading: (gameMode !== 'english' && gameMode !== 'english2' && gameMode !== 'proverb' && gameMode !== 'country' && gameMode !== 'historical' && gameMode !== 'riddle' && gameMode !== 'hayoung' && problems.length === 0) || 
               (gameMode === 'english' && wordProblems.length === 0) ||
               (gameMode === 'english2' && wordProblems2.length === 0) ||
               (gameMode === 'proverb' && proverbProblems.length === 0) ||
               (gameMode === 'country' && countryProblems.length === 0) ||
               (gameMode === 'historical' && historicalProblems.length === 0) ||
               (gameMode === 'riddle' && riddleProblems.length === 0) ||
               (gameMode === 'hayoung' && hayoungProblems.length === 0)
  };
};