'use client';

import { useState, useEffect } from 'react';

interface Problem {
  num1: number;
  num2: number;
  answer: number;
}

type GameMode = 'menu' | 'addition' | 'multiplication';

export default function Home() {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // 선택된 게임 모드에 따라 문제 생성
  useEffect(() => {
    if (gameMode === 'menu') return;

    const generateProblems = () => {
      const newProblems: Problem[] = [];
      for (let i = 0; i < 10; i++) {
        if (gameMode === 'addition') {
          // 10~29 범위의 덧셈 문제
          const num1 = Math.floor(Math.random() * 20) + 10;
          const num2 = Math.floor(Math.random() * 20) + 10;
          newProblems.push({
            num1,
            num2,
            answer: num1 + num2
          });
        } else if (gameMode === 'multiplication') {
          // 2~9 범위의 곱셈 문제
          const num1 = Math.floor(Math.random() * 8) + 2;
          const num2 = Math.floor(Math.random() * 8) + 2;
          newProblems.push({
            num1,
            num2,
            answer: num1 * num2
          });
        }
      }
      return newProblems;
    };

    setProblems(generateProblems());
  }, [gameMode]);

  const handleNumberClick = (num: string) => {
    // 곱셈의 경우 최대 81 (9×9), 덧셈의 경우 최대 58 (29+29)
    const maxLength = gameMode === 'multiplication' ? 2 : 3;
    if (userAnswer.length < maxLength) {
      setUserAnswer(prev => prev + num);
    }
  };

  const handleClear = () => {
    setUserAnswer('');
  };

  const handleSubmit = () => {
    if (userAnswer === '') return;

    const userNum = parseInt(userAnswer);
    const correct = userNum === problems[currentProblem].answer;
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentProblem < problems.length - 1) {
        setCurrentProblem(prev => prev + 1);
        setUserAnswer('');
        setShowResult(false);
      } else {
        setGameComplete(true);
      }
    }, 1500);
  };

  const restartGame = () => {
    setCurrentProblem(0);
    setUserAnswer('');
    setScore(0);
    setGameComplete(false);
    setShowResult(false);
    setGameMode('menu');
  };

  const startGame = (mode: 'addition' | 'multiplication') => {
    setGameMode(mode);
    setCurrentProblem(0);
    setUserAnswer('');
    setScore(0);
    setGameComplete(false);
    setShowResult(false);
  };

  // 메뉴 화면
  if (gameMode === 'menu') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
        <div className="text-center p-8 bg-white rounded-3xl shadow-2xl max-w-md mx-4">
          <div className="text-6xl mb-6">🎓</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">수학 게임을 선택하세요!</h1>
          
          <div className="space-y-4">
            <button
              onClick={() => startGame('addition')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-8 rounded-xl text-xl transition-colors shadow-lg"
            >
              <div className="text-3xl mb-2">➕</div>
              <div>더하기</div>
              <div className="text-sm opacity-80">10~29 범위</div>
            </button>
            
            <button
              onClick={() => startGame('multiplication')}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-6 px-8 rounded-xl text-xl transition-colors shadow-lg"
            >
              <div className="text-3xl mb-2">✖️</div>
              <div>곱하기</div>
              <div className="text-sm opacity-80">2~9 범위</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (problems.length === 0) {
    return <div className="flex min-h-screen items-center justify-center">로딩 중...</div>;
  }

  if (gameComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="text-center p-8 bg-white rounded-3xl shadow-2xl max-w-md mx-4">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">축하합니다!</h1>
          <p className="text-xl text-gray-600 mb-6">
            총 10문제 중 <span className="font-bold text-blue-600">{score}개</span> 맞혔어요!
          </p>
          <div className="mb-6">
            {score >= 8 && <div className="text-2xl">🌟 훌륭해요!</div>}
            {score >= 6 && score < 8 && <div className="text-2xl">👍 잘했어요!</div>}
            {score < 6 && <div className="text-2xl">💪 다시 도전해보세요!</div>}
          </div>
          <div className="space-y-3">
            <button
              onClick={() => setGameMode(gameMode)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
            >
              같은 게임 다시하기
            </button>
            <button
              onClick={restartGame}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
            >
              메뉴로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100">
      <div className="text-center p-8 bg-white rounded-3xl shadow-2xl max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500">문제 {currentProblem + 1}/10</div>
          <div className="text-sm text-gray-500">점수: {score}</div>
        </div>

        <div className="mb-8">
          <div className="text-4xl font-bold text-gray-800 mb-4">
            {problems[currentProblem].num1} {gameMode === 'addition' ? '+' : '×'} {problems[currentProblem].num2} = ?
          </div>
          
          <div className="text-3xl font-bold mb-6 h-12 flex items-center justify-center">
            {userAnswer || '_'}
          </div>

          {showResult && (
            <div className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? (
                <div className="flex items-center justify-center gap-2">
                  <span>🎉</span>
                  <span>정답입니다!</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>😅</span>
                  <span>정답은 {problems[currentProblem].answer}이에요</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[1,2,3,4,5,6,7,8,9].map(num => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              disabled={showResult}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 px-4 rounded-lg text-xl transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleClear}
            disabled={showResult}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-bold py-4 px-4 rounded-lg transition-colors"
          >
            지우기
          </button>
          <button
            onClick={() => handleNumberClick('0')}
            disabled={showResult}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 px-4 rounded-lg text-xl transition-colors"
          >
            0
          </button>
          <button
            onClick={handleSubmit}
            disabled={showResult || userAnswer === ''}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-4 px-4 rounded-lg transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
