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
    <div className="grid grid-cols-3 gap-3 mb-6">
      {[1,2,3,4,5,6,7,8,9].map(num => (
        <button
          key={num}
          onClick={() => onNumberClick(num.toString())}
          disabled={showResult}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 px-4 rounded-lg text-xl transition-colors"
        >
          {num}
        </button>
      ))}
      <button
        onClick={onClear}
        disabled={showResult}
        className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-bold py-4 px-4 rounded-lg transition-colors"
      >
        지우기
      </button>
      <button
        onClick={() => onNumberClick('0')}
        disabled={showResult}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 px-4 rounded-lg text-xl transition-colors"
      >
        0
      </button>
      <button
        onClick={onSubmit}
        disabled={showResult || userAnswer === ''}
        className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-4 px-4 rounded-lg transition-colors"
      >
        확인
      </button>
    </div>
  );
}