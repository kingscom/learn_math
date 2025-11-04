interface EnglishKeyboardProps {
  onLetterClick: (letter: string) => void;
  onClear: () => void;
  onHint: () => void;
  onSubmit: () => void;
  showResult: boolean;
  userAnswer: string;
  canHint: boolean;
}

export default function EnglishKeyboard({
  onLetterClick,
  onClear,
  onHint,
  onSubmit,
  showResult,
  userAnswer,
  canHint
}: EnglishKeyboardProps) {
  return (
    <div className="mb-6">
      <div className="space-y-2 mb-4">
        {/* 첫 번째 줄 */}
        <div className="flex justify-center gap-1">
          {['q','w','e','r','t','y','u','i','o','p'].map(letter => (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              disabled={showResult}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-3 px-3 rounded-lg text-lg transition-colors min-w-[40px]"
            >
              {letter}
            </button>
          ))}
        </div>
        
        {/* 두 번째 줄 */}
        <div className="flex justify-center gap-1">
          {['a','s','d','f','g','h','j','k','l'].map(letter => (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              disabled={showResult}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-3 px-3 rounded-lg text-lg transition-colors min-w-[40px]"
            >
              {letter}
            </button>
          ))}
        </div>
        
        {/* 세 번째 줄 */}
        <div className="flex justify-center gap-1">
          {['z','x','c','v','b','n','m'].map(letter => (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              disabled={showResult}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-3 px-3 rounded-lg text-lg transition-colors min-w-[40px]"
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={onClear}
          disabled={showResult}
          className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-bold py-4 px-2 rounded-lg transition-colors text-sm"
        >
          지우기
        </button>
        <button
          onClick={onHint}
          disabled={showResult || !canHint}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-4 px-2 rounded-lg transition-colors text-sm"
        >
          💡 힌트
        </button>
        <button
          onClick={onSubmit}
          disabled={showResult || userAnswer === ''}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 px-2 rounded-lg transition-colors text-sm"
        >
          확인
        </button>
      </div>
    </div>
  );
}