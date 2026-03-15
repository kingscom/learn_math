import { GameMode } from '../types';
import { WordProblem } from '../types';

interface GameCompleteProps {
  score: number;
  gameMode: GameMode;
  onRestart: () => void;
  onRetry: () => void;
  hayoungProblems?: WordProblem[];
  hayoungResults?: boolean[];
}

export default function GameComplete({ score, gameMode, onRestart, onRetry, hayoungProblems, hayoungResults }: GameCompleteProps) {
  const getGameTitle = () => {
    switch (gameMode) {
      case 'addition': return '덧셈';
      case 'multiplication': return '곱셈';
      case 'division': return '나누기';
      case 'english': return '영어 단어';
      case 'english2': return '영어 단어2';
      case 'proverb': return '한국 속담';
      case 'country': return '나라와 수도';
      case 'historical': return '위인 퀴즈';
      case 'riddle': return '수수께끼';
      case 'hayoung': return '하영이 영어';
      default: return '게임';
    }
  };

  const totalProblems = gameMode === 'hayoung' ? (hayoungProblems?.length || 0) : 10;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="text-center p-8 bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">축하합니다!</h1>
        <p className="text-xl text-gray-600 mb-6">
          {getGameTitle()} 게임에서<br />
          총 {totalProblems}문제 중 <span className="font-bold text-blue-600">{score}개</span> 맞혔어요!
        </p>
        
        {/* 하영이 영어 게임 상세 결과 */}
        {gameMode === 'hayoung' && hayoungProblems && hayoungResults && (
          <div className="mb-6 max-h-60 overflow-y-auto bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-3">문제별 결과</h3>
            <div className="space-y-2 text-sm">
              {hayoungProblems.map((problem, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-white rounded">
                  <span className="text-left flex-1">{problem.korean}</span>
                  <span className="text-gray-500 mx-2">→</span>
                  <span className="text-left flex-1 font-mono">{problem.english}</span>
                  <span className="text-xl ml-2">
                    {hayoungResults[index] ? '✅' : '❌'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mb-6">
          {score >= totalProblems * 0.8 && <div className="text-2xl">🌟 훌륭해요!</div>}
          {score >= totalProblems * 0.6 && score < totalProblems * 0.8 && <div className="text-2xl">👍 잘했어요!</div>}
          {score < totalProblems * 0.6 && <div className="text-2xl">💪 다시 도전해보세요!</div>}
        </div>
        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
          >
            같은 게임 다시하기
          </button>
          <button
            onClick={onRestart}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
          >
            메뉴로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}