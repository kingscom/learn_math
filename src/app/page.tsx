'use client';

import { useState, useEffect } from 'react';

interface Problem {
  num1: number;
  num2: number;
  answer: number;
}

export default function Home() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // 1~19 범위의 덧셈 문제 10개 생성
  useEffect(() => {
    const generateProblems = () => {
      const newProblems: Problem[] = [];
      for (let i = 0; i < 10; i++) {
        const num1 = Math.floor(Math.random() * 19) + 1;
        const num2 = Math.floor(Math.random() * 19) + 1;
        newProblems.push({
          num1,
          num2,
          answer: num1 + num2
        });
      }
      return newProblems;
    };

    setProblems(generateProblems());
  }, []);

  const handleNumberClick = (num: string) => {
    if (userAnswer.length < 2) {
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
    const generateProblems = () => {
      const newProblems: Problem[] = [];
      for (let i = 0; i < 10; i++) {
        const num1 = Math.floor(Math.random() * 19) + 1;
        const num2 = Math.floor(Math.random() * 19) + 1;
        newProblems.push({
          num1,
          num2,
          answer: num1 + num2
        });
      }
      return newProblems;
    };
    setProblems(generateProblems());
  };

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
          <button
            onClick={restartGame}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
          >
            다시 시작
          </button>
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
            {problems[currentProblem].num1} + {problems[currentProblem].num2} = ?
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
