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
    <div className="w-full max-w-full">
      <div className="space-y-1 lg:space-y-2 mb-2 lg:mb-4">
        {/* 첫 번째 줄 */}
        <div className="flex justify-center gap-1 lg:gap-2">
          {['q','w','e','r','t','y','u','i','o','p'].map(letter => (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              disabled={showResult}
              className="bg-white hover:bg-gray-100 disabled:bg-gray-300 text-black font-bold py-3 px-2 lg:py-4 lg:px-4 rounded-lg text-base lg:text-2xl transition-colors min-w-[32px] lg:min-w-[60px] flex-1 max-w-[40px] lg:max-w-[60px] shadow-md border border-gray-200"
            >
              {letter.toUpperCase()}
            </button>
          ))}
        </div>
        
        {/* 두 번째 줄 */}
        <div className="flex justify-center gap-1 lg:gap-2">
          {['a','s','d','f','g','h','j','k','l'].map(letter => (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              disabled={showResult}
              className="bg-white hover:bg-gray-100 disabled:bg-gray-300 text-black font-bold py-3 px-2 lg:py-4 lg:px-4 rounded-lg text-base lg:text-2xl transition-colors min-w-[32px] lg:min-w-[60px] flex-1 max-w-[42px] lg:max-w-[60px] shadow-md border border-gray-200"
            >
              {letter.toUpperCase()}
            </button>
          ))}
        </div>
        
        {/* 세 번째 줄 */}
        <div className="flex justify-center gap-1 lg:gap-2">
          {['z','x','c','v','b','n','m'].map(letter => (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              disabled={showResult}
              className="bg-white hover:bg-gray-100 disabled:bg-gray-300 text-black font-bold py-3 px-2 lg:py-4 lg:px-4 rounded-lg text-base lg:text-2xl transition-colors min-w-[32px] lg:min-w-[60px] flex-1 max-w-[48px] lg:max-w-[60px] shadow-md border border-gray-200"
            >
              {letter}
            </button>
          ))}
          
          {/* 백스페이스 버튼 */}
          <button
            onClick={onClear}
            disabled={showResult}
            className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-bold py-3 px-2 lg:py-4 lg:px-4 rounded-lg text-base lg:text-2xl transition-colors min-w-[60px] lg:min-w-[80px] shadow-md border border-gray-200"
          >
            ←
          </button>
        </div>
      </div>
      
      {/* 네 번째 줄 - 하단 기능 버튼들 */}
      <div className="flex justify-center gap-1 lg:gap-2">
        <button
          onClick={onHint}
          disabled={showResult || !canHint}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-3 px-2 lg:py-4 lg:px-4 rounded-lg text-xs lg:text-lg transition-colors min-w-[60px] lg:min-w-[80px] shadow-md border border-gray-200"
        >
          힌트
        </button>
        
        <button
          onClick={onSubmit}
          disabled={showResult || userAnswer === ''}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3 px-2 lg:py-4 lg:px-4 rounded-lg text-xs lg:text-lg transition-colors min-w-[60px] lg:min-w-[80px] shadow-md border border-gray-200"
        >
          확인
        </button>
      </div>
    </div>
  );
}