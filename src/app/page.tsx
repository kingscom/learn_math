'use client';

import { useEffect } from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import { handleKoreanInput, handleKoreanBackspace, addSpace } from '../utils/hangulUtils';

import GameMenu from '../components/GameMenu';
import GameComplete from '../components/GameComplete';
import KoreanKeyboard from '../components/KoreanKeyboard';
import EnglishKeyboard from '../components/EnglishKeyboard';
import NumberKeypad from '../components/NumberKeypad';

export default function Home() {
  const {
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
    setUserAnswer,
    startGame,
    restartGame,
    handleSubmit,
    handleHint,
    isLoading
  } = useGameLogic();

  // 배경 음악 제거됨

  // 입력 핸들러들
  const handleNumberClick = (num: string) => {
    if (userAnswer.length < 3) {
      setUserAnswer(prev => prev + num);
    }
  };

  const handleLetterClick = (letter: string) => {
    if (userAnswer.length < 20) {
      setUserAnswer(prev => prev + letter);
    }
  };

  const handleKoreanClick = (char: string) => {
    setUserAnswer(prev => handleKoreanInput(prev, char));
  };

  const handleSpace = () => {
    setUserAnswer(prev => addSpace(prev));
  };

  const handleClear = () => {
    setUserAnswer(prev => prev.slice(0, -1));
  };

  // 메뉴 화면
  if (gameMode === 'menu') {
    return <GameMenu onStartGame={startGame} />;
  }

  // 로딩 화면
  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">로딩 중...</div>;
  }

  // 게임 완료 화면
  if (gameComplete) {
    return (
      <GameComplete 
        score={score}
        gameMode={gameMode}
        onRestart={restartGame}
        onRetry={() => startGame(gameMode as any)}
      />
    );
  }

  // 게임 화면
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="h-full max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={restartGame}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors text-lg"
          >
            🏠 메뉴
          </button>
          <div className="text-2xl font-bold text-gray-800">점수: {score}/10</div>
        </div>

        {/* 타이머와 진행률을 가로로 배치 */}
        <div className="flex justify-between items-center mb-6 gap-8">
          {/* 진행률 */}
          <div className="flex-1">
            <div className="text-lg text-gray-600 mb-2">문제 {currentProblem + 1}/10</div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${((currentProblem + 1) / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* 타이머 (수학 게임만) */}
          {(gameMode === 'addition' || gameMode === 'multiplication') && (
            <div className="flex-1">
              <div className="text-xl font-bold text-red-600 mb-2">⏰ {timeLeft}초</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-red-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(timeLeft / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* 메인 콘텐츠 - 가로 레이아웃 (태블릿 가로 모드 최적화) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 min-h-[calc(100vh-200px)]">
          {/* 왼쪽: 문제 영역 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 flex flex-col justify-center min-h-[300px] lg:min-h-[400px]">
            {gameMode === 'english' ? (
              <div className="text-center">
                <div className="text-3xl lg:text-5xl font-bold text-gray-800 mb-4 lg:mb-6">
                  {wordProblems[currentProblem]?.korean}
                </div>
                {hintLevel > 0 && (
                  <div className="text-xl lg:text-3xl text-blue-600 mb-4 lg:mb-6">
                    💡 힌트: {wordProblems[currentProblem]?.english.substring(0, hintLevel)}...
                  </div>
                )}
              </div>
            ) : gameMode === 'proverb' ? (
              <div className="text-center">
                <div className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4 lg:mb-6">
                  📜 속담 완성하기
                </div>
                <div className="text-xl lg:text-3xl font-bold text-purple-700 mb-4 lg:mb-6 leading-relaxed">
                  {proverbProblems[currentProblem]?.isFirstHalf ? (
                    <div>
                      <span className="text-gray-600">{proverbProblems[currentProblem]?.first}</span>
                      <span className="text-purple-600"> + </span>
                      <span className="text-red-500">?</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-red-500">?</span>
                      <span className="text-purple-600"> + </span>
                      <span className="text-gray-600">{proverbProblems[currentProblem]?.second}</span>
                    </div>
                  )}
                </div>
                {hintLevel > 0 && (
                  <div className="text-lg lg:text-2xl text-blue-600 mb-4 lg:mb-6">
                    💡 힌트: {(proverbProblems[currentProblem]?.isFirstHalf ? proverbProblems[currentProblem]?.second : proverbProblems[currentProblem]?.first)?.substring(0, hintLevel)}...
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4 lg:mb-6">
                  {problems[currentProblem]?.num1} {gameMode === 'addition' ? '+' : '×'} {problems[currentProblem]?.num2} = ?
                </div>
              </div>
            )}
            
            {/* 답안 입력 표시 */}
            <div className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 h-12 lg:h-16 flex items-center justify-center border-b-4 border-gray-300">
              {userAnswer || '_'}
            </div>

            {/* 결과 표시 */}
            {showResult && (
              <div className={`text-xl lg:text-3xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? (
                  <div className="flex items-center justify-center gap-2">
                    <span>🎉</span>
                    <span>정답입니다!</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
                    <span>{timeLeft === 0 ? '⏰' : '😅'}</span>
                    <span className="text-center text-lg lg:text-xl">
                      {timeLeft === 0 ? '시간 초과!' : ''} 정답은 {
                        gameMode === 'english' ? wordProblems[currentProblem]?.english :
                        gameMode === 'proverb' ? (proverbProblems[currentProblem]?.isFirstHalf ? proverbProblems[currentProblem]?.second : proverbProblems[currentProblem]?.first) :
                        problems[currentProblem]?.answer
                      }이에요
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 오른쪽: 키보드 영역 */}
          <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-6 flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
            {gameMode === 'english' ? (
              <EnglishKeyboard
                onLetterClick={handleLetterClick}
                onClear={handleClear}
                onHint={handleHint}
                onSubmit={handleSubmit}
                showResult={showResult}
                userAnswer={userAnswer}
                canHint={hintLevel < wordProblems[currentProblem]?.english.length}
              />
            ) : gameMode === 'proverb' ? (
              <KoreanKeyboard
                onKeyClick={handleKoreanClick}
                onSpace={handleSpace}
                onClear={handleClear}
                onHint={handleHint}
                onSubmit={handleSubmit}
                showResult={showResult}
                userAnswer={userAnswer}
                canHint={hintLevel < (proverbProblems[currentProblem]?.isFirstHalf ? proverbProblems[currentProblem]?.second : proverbProblems[currentProblem]?.first)?.length}
              />
            ) : (
              <NumberKeypad
                onNumberClick={handleNumberClick}
                onClear={handleClear}
                onSubmit={handleSubmit}
                showResult={showResult}
                userAnswer={userAnswer}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}