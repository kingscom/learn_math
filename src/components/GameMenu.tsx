import { GameMode } from '../types';

interface GameMenuProps {
  onStartGame: (mode: 'addition' | 'multiplication' | 'english' | 'proverb' | 'country' | 'historical') => void;
}

export default function GameMenu({ onStartGame }: GameMenuProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="text-center p-8 bg-white rounded-3xl shadow-2xl max-w-2xl mx-4">
        <h1 className="text-5xl font-bold text-gray-800 mb-8">🎮 하영하랑 게임</h1>
        <p className="text-lg text-gray-600 mb-12">재미있게 배워보세요!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={() => onStartGame('addition')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-8 rounded-xl text-xl transition-colors shadow-lg"
          >
            <div className="text-3xl mb-2">➕</div>
            <div>덧셈</div>
            <div className="text-sm opacity-80">5~19 범위</div>
          </button>
          
          <button
            onClick={() => onStartGame('multiplication')}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-6 px-8 rounded-xl text-xl transition-colors shadow-lg"
          >
            <div className="text-3xl mb-2">✖️</div>
            <div>곱셈</div>
            <div className="text-sm opacity-80">2~9 범위</div>
          </button>
          
          <button
            onClick={() => onStartGame('english')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-8 rounded-xl text-xl transition-colors shadow-lg"
          >
            <div className="text-3xl mb-2">🔤</div>
            <div>영어 단어</div>
            <div className="text-sm opacity-80">초등 1학년 수준</div>
          </button>
          
          <button
            onClick={() => onStartGame('proverb')}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-6 px-8 rounded-xl text-xl transition-colors shadow-lg"
          >
            <div className="text-3xl mb-2">📜</div>
            <div>한국 속담</div>
            <div className="text-sm opacity-80">앞뒤 맞추기</div>
          </button>

          <button
            onClick={() => onStartGame('country')}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-6 px-8 rounded-xl text-xl transition-colors shadow-lg"
          >
            <div className="text-3xl mb-2">🌍</div>
            <div>나라와 수도</div>
            <div className="text-sm opacity-80">세계 지리</div>
          </button>

          <button
            onClick={() => onStartGame('historical')}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-6 px-8 rounded-xl text-xl transition-colors shadow-lg md:col-span-2 lg:col-span-1"
          >
            <div className="text-3xl mb-2">👑</div>
            <div>위인 퀴즈</div>
            <div className="text-sm opacity-80">국내외 인물</div>
          </button>
        </div>
      </div>
    </div>
  );
}