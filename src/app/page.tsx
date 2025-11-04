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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="text-center p-8 bg-white rounded-3xl shadow-2xl max-w-2xl mx-4 w-full">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={restartGame}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            🏠 메뉴
          </button>
          <div className="text-xl font-bold text-gray-800">점수: {score}/10</div>
        </div>

        {/* 타이머 (수학 게임만) */}
        {(gameMode === 'addition' || gameMode === 'multiplication') && (
          <div className="mb-4">
            <div className="text-lg font-bold text-red-600 mb-2">⏰ {timeLeft}초</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(timeLeft / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* 진행률 */}
        <div className="mb-6">
          <div className="text-sm text-gray-500">문제 {currentProblem + 1}/10</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${((currentProblem + 1) / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 문제 표시 */}
        <div className="mb-8">
          {gameMode === 'english' ? (
            <div>
              <div className="text-4xl font-bold text-gray-800 mb-4">
                {wordProblems[currentProblem]?.korean}
              </div>
              {hintLevel > 0 && (
                <div className="text-2xl text-blue-600 mb-4">
                  💡 힌트: {wordProblems[currentProblem]?.english.substring(0, hintLevel)}...
                </div>
              )}
            </div>
          ) : gameMode === 'proverb' ? (
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-4">
                📜 속담 완성하기
              </div>
              <div className="text-2xl font-bold text-purple-700 mb-4">
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
                <div className="text-xl text-blue-600 mb-4">
                  💡 힌트: {(proverbProblems[currentProblem]?.isFirstHalf ? proverbProblems[currentProblem]?.second : proverbProblems[currentProblem]?.first)?.substring(0, hintLevel)}...
                </div>
              )}
            </div>
          ) : (
            <div className="text-4xl font-bold text-gray-800 mb-4">
              {problems[currentProblem]?.num1} {gameMode === 'addition' ? '+' : '×'} {problems[currentProblem]?.num2} = ?
            </div>
          )}
          
          {/* 답안 입력 표시 */}
          <div className="text-3xl font-bold mb-6 h-12 flex items-center justify-center">
            {userAnswer || '_'}
          </div>

          {/* 결과 표시 */}
          {showResult && (
            <div className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? (
                <div className="flex items-center justify-center gap-2">
                  <span>🎉</span>
                  <span>정답입니다!</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>{timeLeft === 0 ? '⏰' : '😅'}</span>
                  <span>
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

        {/* 키보드/키패드 */}
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
  );
}