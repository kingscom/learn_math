interface MultipleChoiceProps {
  choices: string[];
  onChoiceSelect: (choice: string) => void;
  onSubmit: () => void;
  showResult: boolean;
  userAnswer: string;
  correctAnswer: string;
}

export default function MultipleChoice({
  choices,
  onChoiceSelect,
  onSubmit,
  showResult,
  userAnswer,
  correctAnswer
}: MultipleChoiceProps) {
  return (
    <div className="w-full max-w-full px-2 lg:px-0">
      <div className="grid grid-cols-1 gap-3 lg:gap-4 mb-4">
        {choices.map((choice, index) => {
          let buttonClass = "bg-white hover:bg-gray-100 disabled:bg-gray-300 text-black font-bold py-4 px-4 lg:py-6 lg:px-6 rounded-xl text-base lg:text-xl transition-colors shadow-md border-2 text-left";
          
          // 선택된 답안 표시
          if (!showResult && choice === userAnswer) {
            buttonClass = "bg-blue-100 hover:bg-blue-200 text-black font-bold py-4 px-4 lg:py-6 lg:px-6 rounded-xl text-base lg:text-xl transition-colors shadow-md border-2 border-blue-400 text-left";
          } else if (!showResult) {
            buttonClass = "bg-white hover:bg-gray-100 text-black font-bold py-4 px-4 lg:py-6 lg:px-6 rounded-xl text-base lg:text-xl transition-colors shadow-md border-2 border-gray-200 text-left";
          }
          
          if (showResult) {
            if (choice === correctAnswer) {
              buttonClass = "bg-green-500 text-white font-bold py-4 px-4 lg:py-6 lg:px-6 rounded-xl text-base lg:text-xl shadow-md border-2 border-green-600 text-left";
            } else if (choice === userAnswer && choice !== correctAnswer) {
              buttonClass = "bg-red-500 text-white font-bold py-4 px-4 lg:py-6 lg:px-6 rounded-xl text-base lg:text-xl shadow-md border-2 border-red-600 text-left";
            } else {
              buttonClass = "bg-gray-300 text-gray-600 font-bold py-4 px-4 lg:py-6 lg:px-6 rounded-xl text-base lg:text-xl shadow-md border-2 border-gray-400 text-left";
            }
          }

          return (
            <button
              key={index}
              onClick={() => onChoiceSelect(choice)}
              disabled={showResult}
              className={buttonClass}
            >
              <span className={`inline-block w-6 h-6 lg:w-8 lg:h-8 rounded-full text-center text-sm lg:text-base font-bold mr-3 leading-6 lg:leading-8 ${
                !showResult && choice === userAnswer ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
              }`}>
                {String.fromCharCode(65 + index)}
              </span>
              {choice}
            </button>
          );
        })}
      </div>
      
      {/* 확인 버튼 */}
      <div className="flex justify-center">
        <button
          onClick={onSubmit}
          disabled={showResult || !userAnswer}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3 px-8 lg:py-4 lg:px-12 rounded-xl text-lg lg:text-xl transition-colors shadow-lg"
        >
          {showResult ? '완료' : '확인'}
        </button>
      </div>
    </div>
  );
}