interface KoreanKeyboardProps {
  onKeyClick: (char: string) => void;
  onSpace: () => void;
  onClear: () => void;
  onHint: () => void;
  onSubmit: () => void;
  showResult: boolean;
  userAnswer: string;
  canHint: boolean;
}

export default function KoreanKeyboard({
  onKeyClick,
  onSpace,
  onClear,
  onHint,
  onSubmit,
  showResult,
  userAnswer,
  canHint
}: KoreanKeyboardProps) {
  return (
    <div className="mb-6">
      <div className="space-y-2 mb-4">
        {/* 첫 번째 줄 - 표준 한글 자판 첫 줄 */}
        <div className="flex justify-center gap-2">
          {['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ'].map(char => (
            <button
              key={char}
              onClick={() => onKeyClick(char)}
              disabled={showResult}
              className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white font-bold py-4 px-4 rounded-lg text-xl lg:text-2xl transition-colors min-w-[50px] lg:min-w-[60px]"
            >
              {char}
            </button>
          ))}
        </div>
        
        {/* 두 번째 줄 - 표준 한글 자판 둘째 줄 */}
        <div className="flex justify-center gap-2">
          {['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ'].map(char => (
            <button
              key={char}
              onClick={() => onKeyClick(char)}
              disabled={showResult}
              className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white font-bold py-4 px-4 rounded-lg text-xl lg:text-2xl transition-colors min-w-[50px] lg:min-w-[60px]"
            >
              {char}
            </button>
          ))}
        </div>
        
        {/* 세 번째 줄 - 표준 한글 자판 셋째 줄 */}
        <div className="flex justify-center gap-2">
          {['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ'].map(char => (
            <button
              key={char}
              onClick={() => onKeyClick(char)}
              disabled={showResult}
              className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white font-bold py-4 px-4 rounded-lg text-xl lg:text-2xl transition-colors min-w-[50px] lg:min-w-[60px]"
            >
              {char}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        <button
          onClick={onHint}
          disabled={showResult || !canHint}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-5 px-3 rounded-lg transition-colors text-base lg:text-lg"
        >
          💡 힌트
        </button>
        <button
          onClick={onSpace}
          disabled={showResult}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-5 px-3 rounded-lg transition-colors text-base lg:text-lg"
        >
          띄어쓰기
        </button>
        <button
          onClick={onClear}
          disabled={showResult}
          className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-bold py-5 px-3 rounded-lg transition-colors text-base lg:text-lg"
        >
          지우기
        </button>
        <button
          onClick={onSubmit}
          disabled={showResult || userAnswer === ''}
          className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white font-bold py-5 px-3 rounded-lg transition-colors text-base lg:text-lg"
        >
          확인
        </button>
      </div>
    </div>
  );
}