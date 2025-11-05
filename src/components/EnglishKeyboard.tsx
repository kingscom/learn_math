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
    <div className="w-full max-w-full px-2 lg:px-0">
      <div className="space-y-2 lg:space-y-2 mb-3 lg:mb-4">
        {/* 첫 번째 줄 - 10개 버튼 */}
        <div className="flex gap-1 lg:gap-2">
          {['q','w','e','r','t','y','u','i','o','p'].map(letter => (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              disabled={showResult}
              className="bg-white hover:bg-gray-100 disabled:bg-gray-300 text-black font-bold py-3 px-1 lg:py-4 lg:px-4 rounded-lg text-base lg:text-2xl transition-colors flex-1 shadow-md border border-gray-200"
            >
              {letter}
            </button>
          ))}
        </div>
        
        {/* 두 번째 줄 - 9개 버튼 */}
        <div className="flex gap-1 lg:gap-2">
          <div className="flex-1"></div>
          {['a','s','d','f','g','h','j','k','l'].map(letter => (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              disabled={showResult}
              className="bg-white hover:bg-gray-100 disabled:bg-gray-300 text-black font-bold py-3 px-1 lg:py-4 lg:px-4 rounded-lg text-base lg:text-2xl transition-colors flex-1 shadow-md border border-gray-200"
            >
              {letter}
            </button>
          ))}
          <div className="flex-1"></div>
        </div>
        
        {/* 세 번째 줄 - 7개 + 백스페이스 */}
        <div className="flex gap-1 lg:gap-2">
          <div className="flex-1"></div>
          {['z','x','c','v','b','n','m'].map(letter => (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              disabled={showResult}
              className="bg-white hover:bg-gray-100 disabled:bg-gray-300 text-black font-bold py-3 px-1 lg:py-4 lg:px-4 rounded-lg text-base lg:text-2xl transition-colors flex-1 shadow-md border border-gray-200"
            >
              {letter}
            </button>
          ))}
          
          {/* 백스페이스 버튼 */}
          <button
            onClick={onClear}
            disabled={showResult}
            className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-bold py-3 px-3 lg:py-4 lg:px-6 rounded-lg text-base lg:text-2xl transition-colors shadow-md border border-gray-200"
            style={{ flex: '1.5' }}
          >
            ←
          </button>
        </div>
      </div>
      
      {/* 네 번째 줄 - 하단 기능 버튼들 */}
      <div className="flex gap-1 lg:gap-2">
        <button
          onClick={onHint}
          disabled={showResult || !canHint}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-3 px-3 lg:py-4 lg:px-4 rounded-lg text-sm lg:text-lg transition-colors shadow-md border border-gray-200"
          style={{ flex: '2' }}
        >
          힌트
        </button>
        
        <button
          onClick={onSubmit}
          disabled={showResult || userAnswer === ''}
          className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white font-bold py-3 px-3 lg:py-4 lg:px-4 rounded-lg text-sm lg:text-lg transition-colors shadow-md border border-gray-200"
          style={{ flex: '2' }}
        >
          확인
        </button>
      </div>
    </div>
  );
}