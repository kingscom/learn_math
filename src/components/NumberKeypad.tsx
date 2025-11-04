interface NumberKeypadProps {
  onNumberClick: (num: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  showResult: boolean;
  userAnswer: string;
}

export default function NumberKeypad({
  onNumberClick,
  onClear,
  onSubmit,
  showResult,
  userAnswer
}: NumberKeypadProps) {
  return (
    <div className="grid grid-cols-3 gap-4 lg:gap-6 mb-6">
      {[1,2,3,4,5,6,7,8,9].map(num => (
        <button
          key={num}
          onClick={() => onNumberClick(num.toString())}
          disabled={showResult}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-6 px-6 lg:py-8 lg:px-8 rounded-lg text-2xl lg:text-4xl transition-colors min-h-[60px] lg:min-h-[80px]"
        >
          {num}
        </button>
      ))}
      <button
        onClick={onClear}
        disabled={showResult}
        className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-bold py-6 px-6 lg:py-8 lg:px-8 rounded-lg transition-colors text-base lg:text-xl min-h-[60px] lg:min-h-[80px]"
      >
        지우기
      </button>
      <button
        onClick={() => onNumberClick('0')}
        disabled={showResult}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-6 px-6 lg:py-8 lg:px-8 rounded-lg text-2xl lg:text-4xl transition-colors min-h-[60px] lg:min-h-[80px]"
      >
        0
      </button>
      <button
        onClick={onSubmit}
        disabled={showResult || userAnswer === ''}
        className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-6 px-6 lg:py-8 lg:px-8 rounded-lg transition-colors text-base lg:text-xl min-h-[60px] lg:min-h-[80px]"
      >
        확인
      </button>
    </div>
  );
}