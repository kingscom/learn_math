import { GameMode } from '../types';

interface GameCompleteProps {
  score: number;
  gameMode: GameMode;
  onRestart: () => void;
  onRetry: () => void;
}

export default function GameComplete({ score, gameMode, onRestart, onRetry }: GameCompleteProps) {
  const getGameTitle = () => {
    switch (gameMode) {
      case 'addition': return '덧셈';
      case 'multiplication': return '곱셈';
      case 'english': return '영어 단어';
      case 'proverb': return '한국 속담';
      default: return '게임';
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="text-center p-8 bg-white rounded-3xl shadow-2xl max-w-md mx-4">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">축하합니다!</h1>
        <p className="text-xl text-gray-600 mb-6">
          {getGameTitle()} 게임에서<br />
          총 10문제 중 <span className="font-bold text-blue-600">{score}개</span> 맞혔어요!
        </p>
        <div className="mb-6">
          {score >= 8 && <div className="text-2xl">🌟 훌륭해요!</div>}
          {score >= 6 && score < 8 && <div className="text-2xl">👍 잘했어요!</div>}
          {score < 6 && <div className="text-2xl">💪 다시 도전해보세요!</div>}
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