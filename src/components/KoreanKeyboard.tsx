import { useState } from 'react';

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
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  // 쌍자음 매핑
  const doubleConsonants: { [key: string]: string } = {
    'ㄱ': 'ㄲ',
    'ㄷ': 'ㄸ',
    'ㅂ': 'ㅃ',
    'ㅅ': 'ㅆ',
    'ㅈ': 'ㅉ'
  };

  // 쌍모음 매핑 (ㅐ/ㅒ, ㅔ/ㅖ)
  const doubleVowels: { [key: string]: string } = {
    'ㅐ': 'ㅒ',
    'ㅔ': 'ㅖ'
  };

  const handleKeyClick = (char: string) => {
    if (isShiftPressed && doubleConsonants[char]) {
      onKeyClick(doubleConsonants[char]);
      setIsShiftPressed(false); // 쌍자음 입력 후 쉬프트 해제
    } else if (isShiftPressed && doubleVowels[char]) {
      onKeyClick(doubleVowels[char]);
      setIsShiftPressed(false); // 쌍모음 입력 후 쉬프트 해제
    } else {
      onKeyClick(char);
    }
  };

  const toggleShift = () => {
    setIsShiftPressed(!isShiftPressed);
  };
  return (
    <div className="w-full max-w-full px-2 lg:px-0">
      <div className="space-y-2 lg:space-y-2 mb-3 lg:mb-4">
        {/* 첫 번째 줄 - 10개 버튼 */}
        <div className="flex gap-1 lg:gap-2">
          {['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ'].map(char => (
            <button
              key={char}
              onClick={() => handleKeyClick(char)}
              disabled={showResult}
              className={`font-bold py-3 px-1 lg:py-4 lg:px-4 rounded-lg text-base lg:text-2xl transition-colors flex-1 shadow-md border border-gray-200 ${
                isShiftPressed && (doubleConsonants[char] || doubleVowels[char])
                  ? 'bg-blue-200 hover:bg-blue-300 text-blue-800'
                  : 'bg-white hover:bg-gray-100 disabled:bg-gray-300 text-black'
              }`}
            >
              {isShiftPressed && doubleConsonants[char] 
                ? doubleConsonants[char] 
                : isShiftPressed && doubleVowels[char] 
                ? doubleVowels[char] 
                : char}
            </button>
          ))}
        </div>
        
        {/* 두 번째 줄 - 9개 버튼 */}
        <div className="flex gap-1 lg:gap-2">
          <div className="flex-1"></div>
          {['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ'].map(char => (
            <button
              key={char}
              onClick={() => handleKeyClick(char)}
              disabled={showResult}
              className="bg-white hover:bg-gray-100 disabled:bg-gray-300 text-black font-bold py-3 px-1 lg:py-4 lg:px-4 rounded-lg text-base lg:text-2xl transition-colors flex-1 shadow-md border border-gray-200"
            >
              {char}
            </button>
          ))}
          <div className="flex-1"></div>
        </div>
        
        {/* 세 번째 줄 - 쉬프트 + 7개 + 백스페이스 */}
        <div className="flex gap-1 lg:gap-2">
          {/* 쉬프트 버튼 */}
          <button
            onClick={toggleShift}
            disabled={showResult}
            className={`font-bold py-3 px-2 lg:py-4 lg:px-4 rounded-lg text-sm lg:text-base transition-colors shadow-md border border-gray-200 ${
              isShiftPressed
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
            style={{ flex: '1.2' }}
          >
            ⇧
          </button>
          
          {['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ'].map(char => (
            <button
              key={char}
              onClick={() => handleKeyClick(char)}
              disabled={showResult}
              className="bg-white hover:bg-gray-100 disabled:bg-gray-300 text-black font-bold py-3 px-1 lg:py-4 lg:px-4 rounded-lg text-base lg:text-2xl transition-colors flex-1 shadow-md border border-gray-200"
            >
              {char}
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
          style={{ flex: '1.5' }}
        >
          힌트
        </button>
        
        {/* 스페이스바 */}
        <button
          onClick={onSpace}
          disabled={showResult}
          className="bg-white hover:bg-gray-100 disabled:bg-gray-300 text-black font-bold py-3 px-2 lg:py-4 lg:px-4 rounded-lg text-lg lg:text-lg transition-colors shadow-md border border-gray-200"
          style={{ flex: '4' }}
        >
          <span>─</span>
        </button>
        
        <button
          onClick={onSubmit}
          disabled={showResult || userAnswer === ''}
          className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white font-bold py-3 px-3 lg:py-4 lg:px-4 rounded-lg text-sm lg:text-lg transition-colors shadow-md border border-gray-200"
          style={{ flex: '1.5' }}
        >
          확인
        </button>
      </div>
    </div>
  );
}