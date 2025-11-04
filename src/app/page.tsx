'use client';

import { useState, useEffect } from 'react';

interface Problem {
  num1: number;
  num2: number;
  answer: number;
}

interface WordProblem {
  korean: string;
  english: string;
}

type GameMode = 'menu' | 'addition' | 'multiplication' | 'english';

// 초등학교 수준의 영어 단어들 (300개)
const englishWords: WordProblem[] = [
  // 가족 (15개)
  { korean: '엄마', english: 'mom' },
  { korean: '아빠', english: 'dad' },
  { korean: '아기', english: 'baby' },
  { korean: '할머니', english: 'grandma' },
  { korean: '할아버지', english: 'grandpa' },
  { korean: '형', english: 'brother' },
  { korean: '누나', english: 'sister' },
  { korean: '삼촌', english: 'uncle' },
  { korean: '이모', english: 'aunt' },
  { korean: '사촌', english: 'cousin' },
  { korean: '가족', english: 'family' },
  { korean: '부모님', english: 'parents' },
  { korean: '아들', english: 'son' },
  { korean: '딸', english: 'daughter' },
  { korean: '아이', english: 'child' },

  // 동물 (30개)
  { korean: '고양이', english: 'cat' },
  { korean: '개', english: 'dog' },
  { korean: '새', english: 'bird' },
  { korean: '물고기', english: 'fish' },
  { korean: '토끼', english: 'rabbit' },
  { korean: '말', english: 'horse' },
  { korean: '소', english: 'cow' },
  { korean: '돼지', english: 'pig' },
  { korean: '양', english: 'sheep' },
  { korean: '닭', english: 'chicken' },
  { korean: '오리', english: 'duck' },
  { korean: '코끼리', english: 'elephant' },
  { korean: '사자', english: 'lion' },
  { korean: '호랑이', english: 'tiger' },
  { korean: '곰', english: 'bear' },
  { korean: '원숭이', english: 'monkey' },
  { korean: '기린', english: 'giraffe' },
  { korean: '얼룩말', english: 'zebra' },
  { korean: '뱀', english: 'snake' },
  { korean: '거북이', english: 'turtle' },
  { korean: '개구리', english: 'frog' },
  { korean: '나비', english: 'butterfly' },
  { korean: '벌', english: 'bee' },
  { korean: '개미', english: 'ant' },
  { korean: '거미', english: 'spider' },
  { korean: '쥐', english: 'mouse' },
  { korean: '늑대', english: 'wolf' },
  { korean: '여우', english: 'fox' },
  { korean: '사슴', english: 'deer' },
  { korean: '펭귄', english: 'penguin' },

  // 음식 (40개)
  { korean: '사과', english: 'apple' },
  { korean: '바나나', english: 'banana' },
  { korean: '오렌지', english: 'orange' },
  { korean: '포도', english: 'grape' },
  { korean: '딸기', english: 'strawberry' },
  { korean: '수박', english: 'watermelon' },
  { korean: '복숭아', english: 'peach' },
  { korean: '배', english: 'pear' },
  { korean: '체리', english: 'cherry' },
  { korean: '레몬', english: 'lemon' },
  { korean: '우유', english: 'milk' },
  { korean: '빵', english: 'bread' },
  { korean: '달걀', english: 'egg' },
  { korean: '버터', english: 'butter' },
  { korean: '치즈', english: 'cheese' },
  { korean: '고기', english: 'meat' },
  { korean: '생선', english: 'fish' },
  { korean: '쌀', english: 'rice' },
  { korean: '면', english: 'noodle' },
  { korean: '수프', english: 'soup' },
  { korean: '샐러드', english: 'salad' },
  { korean: '피자', english: 'pizza' },
  { korean: '햄버거', english: 'hamburger' },
  { korean: '케이크', english: 'cake' },
  { korean: '쿠키', english: 'cookie' },
  { korean: '아이스크림', english: 'icecream' },
  { korean: '초콜릿', english: 'chocolate' },
  { korean: '사탕', english: 'candy' },
  { korean: '감자', english: 'potato' },
  { korean: '당근', english: 'carrot' },
  { korean: '양파', english: 'onion' },
  { korean: '토마토', english: 'tomato' },
  { korean: '오이', english: 'cucumber' },
  { korean: '상추', english: 'lettuce' },
  { korean: '옥수수', english: 'corn' },
  { korean: '콩', english: 'bean' },
  { korean: '차', english: 'tea' },
  { korean: '커피', english: 'coffee' },
  { korean: '주스', english: 'juice' },
  { korean: '물', english: 'water' },

  // 신체 (20개)
  { korean: '머리', english: 'head' },
  { korean: '얼굴', english: 'face' },
  { korean: '눈', english: 'eye' },
  { korean: '코', english: 'nose' },
  { korean: '입', english: 'mouth' },
  { korean: '귀', english: 'ear' },
  { korean: '이빨', english: 'tooth' },
  { korean: '목', english: 'neck' },
  { korean: '어깨', english: 'shoulder' },
  { korean: '팔', english: 'arm' },
  { korean: '손', english: 'hand' },
  { korean: '손가락', english: 'finger' },
  { korean: '다리', english: 'leg' },
  { korean: '발', english: 'foot' },
  { korean: '발가락', english: 'toe' },
  { korean: '배', english: 'stomach' },
  { korean: '등', english: 'back' },
  { korean: '가슴', english: 'chest' },
  { korean: '무릎', english: 'knee' },
  { korean: '엉덩이', english: 'hip' },

  // 의류 (20개)
  { korean: '옷', english: 'clothes' },
  { korean: '셔츠', english: 'shirt' },
  { korean: '바지', english: 'pants' },
  { korean: '치마', english: 'skirt' },
  { korean: '드레스', english: 'dress' },
  { korean: '재킷', english: 'jacket' },
  { korean: '코트', english: 'coat' },
  { korean: '스웨터', english: 'sweater' },
  { korean: '양말', english: 'socks' },
  { korean: '신발', english: 'shoes' },
  { korean: '운동화', english: 'sneakers' },
  { korean: '부츠', english: 'boots' },
  { korean: '모자', english: 'hat' },
  { korean: '장갑', english: 'gloves' },
  { korean: '벨트', english: 'belt' },
  { korean: '안경', english: 'glasses' },
  { korean: '시계', english: 'watch' },
  { korean: '반지', english: 'ring' },
  { korean: '목걸이', english: 'necklace' },
  { korean: '귀걸이', english: 'earring' },

  // 집/가구 (25개)
  { korean: '집', english: 'house' },
  { korean: '방', english: 'room' },
  { korean: '부엌', english: 'kitchen' },
  { korean: '화장실', english: 'bathroom' },
  { korean: '거실', english: 'living' },
  { korean: '침실', english: 'bedroom' },
  { korean: '문', english: 'door' },
  { korean: '창문', english: 'window' },
  { korean: '지붕', english: 'roof' },
  { korean: '벽', english: 'wall' },
  { korean: '바닥', english: 'floor' },
  { korean: '천장', english: 'ceiling' },
  { korean: '계단', english: 'stairs' },
  { korean: '의자', english: 'chair' },
  { korean: '테이블', english: 'table' },
  { korean: '침대', english: 'bed' },
  { korean: '소파', english: 'sofa' },
  { korean: '책상', english: 'desk' },
  { korean: '서랍', english: 'drawer' },
  { korean: '냉장고', english: 'fridge' },
  { korean: '텔레비전', english: 'tv' },
  { korean: '컴퓨터', english: 'computer' },
  { korean: '전화', english: 'phone' },
  { korean: '램프', english: 'lamp' },
  { korean: '거울', english: 'mirror' },

  // 학교/학용품 (25개)
  { korean: '학교', english: 'school' },
  { korean: '교실', english: 'classroom' },
  { korean: '선생님', english: 'teacher' },
  { korean: '학생', english: 'student' },
  { korean: '친구', english: 'friend' },
  { korean: '책', english: 'book' },
  { korean: '연필', english: 'pencil' },
  { korean: '펜', english: 'pen' },
  { korean: '지우개', english: 'eraser' },
  { korean: '자', english: 'ruler' },
  { korean: '가위', english: 'scissors' },
  { korean: '풀', english: 'glue' },
  { korean: '종이', english: 'paper' },
  { korean: '노트', english: 'notebook' },
  { korean: '가방', english: 'bag' },
  { korean: '필통', english: 'pencilcase' },
  { korean: '칠판', english: 'blackboard' },
  { korean: '분필', english: 'chalk' },
  { korean: '시험', english: 'test' },
  { korean: '숙제', english: 'homework' },
  { korean: '공부', english: 'study' },
  { korean: '읽기', english: 'reading' },
  { korean: '쓰기', english: 'writing' },
  { korean: '수학', english: 'math' },
  { korean: '과학', english: 'science' },

  // 교통수단 (15개)
  { korean: '차', english: 'car' },
  { korean: '버스', english: 'bus' },
  { korean: '기차', english: 'train' },
  { korean: '비행기', english: 'airplane' },
  { korean: '배', english: 'ship' },
  { korean: '자전거', english: 'bicycle' },
  { korean: '오토바이', english: 'motorcycle' },
  { korean: '트럭', english: 'truck' },
  { korean: '택시', english: 'taxi' },
  { korean: '지하철', english: 'subway' },
  { korean: '헬리콥터', english: 'helicopter' },
  { korean: '로켓', english: 'rocket' },
  { korean: '스쿠터', english: 'scooter' },
  { korean: '보트', english: 'boat' },
  { korean: '요트', english: 'yacht' },

  // 자연/날씨 (20개)
  { korean: '해', english: 'sun' },
  { korean: '달', english: 'moon' },
  { korean: '별', english: 'star' },
  { korean: '하늘', english: 'sky' },
  { korean: '구름', english: 'cloud' },
  { korean: '비', english: 'rain' },
  { korean: '눈', english: 'snow' },
  { korean: '바람', english: 'wind' },
  { korean: '천둥', english: 'thunder' },
  { korean: '번개', english: 'lightning' },
  { korean: '나무', english: 'tree' },
  { korean: '꽃', english: 'flower' },
  { korean: '잎', english: 'leaf' },
  { korean: '풀', english: 'grass' },
  { korean: '산', english: 'mountain' },
  { korean: '바다', english: 'sea' },
  { korean: '강', english: 'river' },
  { korean: '호수', english: 'lake' },
  { korean: '해변', english: 'beach' },
  { korean: '돌', english: 'stone' },

  // 색깔 (12개)
  { korean: '빨간색', english: 'red' },
  { korean: '파란색', english: 'blue' },
  { korean: '노란색', english: 'yellow' },
  { korean: '초록색', english: 'green' },
  { korean: '검은색', english: 'black' },
  { korean: '흰색', english: 'white' },
  { korean: '보라색', english: 'purple' },
  { korean: '분홍색', english: 'pink' },
  { korean: '주황색', english: 'orange' },
  { korean: '회색', english: 'gray' },
  { korean: '갈색', english: 'brown' },
  { korean: '금색', english: 'gold' },

  // 숫자 (10개)
  { korean: '하나', english: 'one' },
  { korean: '둘', english: 'two' },
  { korean: '셋', english: 'three' },
  { korean: '넷', english: 'four' },
  { korean: '다섯', english: 'five' },
  { korean: '여섯', english: 'six' },
  { korean: '일곱', english: 'seven' },
  { korean: '여덟', english: 'eight' },
  { korean: '아홉', english: 'nine' },
  { korean: '열', english: 'ten' },

  // 장소 (15개)
  { korean: '병원', english: 'hospital' },
  { korean: '마트', english: 'market' },
  { korean: '공원', english: 'park' },
  { korean: '도서관', english: 'library' },
  { korean: '은행', english: 'bank' },
  { korean: '우체국', english: 'post' },
  { korean: '식당', english: 'restaurant' },
  { korean: '카페', english: 'cafe' },
  { korean: '영화관', english: 'cinema' },
  { korean: '미술관', english: 'museum' },
  { korean: '놀이터', english: 'playground' },
  { korean: '수영장', english: 'pool' },
  { korean: '체육관', english: 'gym' },
  { korean: '상점', english: 'store' },
  { korean: '농장', english: 'farm' },

  // 스포츠/놀이 (20개)
  { korean: '공', english: 'ball' },
  { korean: '축구', english: 'soccer' },
  { korean: '야구', english: 'baseball' },
  { korean: '농구', english: 'basketball' },
  { korean: '테니스', english: 'tennis' },
  { korean: '수영', english: 'swimming' },
  { korean: '달리기', english: 'running' },
  { korean: '자전거', english: 'cycling' },
  { korean: '스케이트', english: 'skating' },
  { korean: '스키', english: 'skiing' },
  { korean: '장난감', english: 'toy' },
  { korean: '인형', english: 'doll' },
  { korean: '로봇', english: 'robot' },
  { korean: '퍼즐', english: 'puzzle' },
  { korean: '블록', english: 'block' },
  { korean: '게임', english: 'game' },
  { korean: '그림', english: 'picture' },
  { korean: '음악', english: 'music' },
  { korean: '노래', english: 'song' },
  { korean: '춤', english: 'dance' },

  // 기타 일상 (13개)
  { korean: '시간', english: 'time' },
  { korean: '돈', english: 'money' },
  { korean: '선물', english: 'gift' },
  { korean: '생일', english: 'birthday' },
  { korean: '파티', english: 'party' },
  { korean: '휴일', english: 'holiday' },
  { korean: '여행', english: 'travel' },
  { korean: '사진', english: 'photo' },
  { korean: '편지', english: 'letter' },
  { korean: '상자', english: 'box' },
  { korean: '열쇠', english: 'key' },
  { korean: '문제', english: 'problem' },
  { korean: '답', english: 'answer' }
];

export default function Home() {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [problems, setProblems] = useState<Problem[]>([]);
  const [wordProblems, setWordProblems] = useState<WordProblem[]>([]);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [hintLevel, setHintLevel] = useState(0);

  // 선택된 게임 모드에 따라 문제 생성
  useEffect(() => {
    if (gameMode === 'menu') return;

    if (gameMode === 'english') {
      // 영어 단어 문제 10개 랜덤 선택
      const shuffled = [...englishWords].sort(() => Math.random() - 0.5);
      setWordProblems(shuffled.slice(0, 10));
    } else {
      const generateProblems = () => {
        const newProblems: Problem[] = [];
        for (let i = 0; i < 10; i++) {
        if (gameMode === 'addition') {
          // 5~19 범위의 덧셈 문제
          const num1 = Math.floor(Math.random() * 15) + 5;
          const num2 = Math.floor(Math.random() * 15) + 5;
            newProblems.push({
              num1,
              num2,
              answer: num1 + num2
            });
          } else if (gameMode === 'multiplication') {
            // 2~9 범위의 곱셈 문제
            const num1 = Math.floor(Math.random() * 8) + 2;
            const num2 = Math.floor(Math.random() * 8) + 2;
            newProblems.push({
              num1,
              num2,
              answer: num1 * num2
            });
          }
        }
        return newProblems;
      };

      setProblems(generateProblems());
    }
  }, [gameMode]);

  // 수학 문제에만 타이머 적용
  useEffect(() => {
    if (gameMode === 'addition' || gameMode === 'multiplication') {
      if (!showResult && !gameComplete) {
        setTimeLeft(10);
        const timer = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              // 시간 초과 시 자동으로 틀린 것으로 처리
              setIsCorrect(false);
              setShowResult(true);
              setTimeout(() => {
                const problemsLength = problems.length;
                if (currentProblem < problemsLength - 1) {
                  setCurrentProblem(prev => prev + 1);
                  setUserAnswer('');
                  setShowResult(false);
                  setHintLevel(0);
                } else {
                  setGameComplete(true);
                }
              }, 1500);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        setTimerId(timer);
        
        return () => {
          if (timer) {
            clearInterval(timer);
          }
        };
      }
    }
  }, [currentProblem, gameMode, showResult, gameComplete, problems.length]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timerId]);

  const handleNumberClick = (num: string) => {
    // 곱셈의 경우 최대 81 (9×9), 덧셈의 경우 최대 58 (29+29)
    const maxLength = gameMode === 'multiplication' ? 2 : 3;
    if (userAnswer.length < maxLength) {
      setUserAnswer(prev => prev + num);
    }
  };

  const handleLetterClick = (letter: string) => {
    // 영어 단어는 최대 10글자까지
    if (userAnswer.length < 10) {
      setUserAnswer(prev => prev + letter);
    }
  };

  const handleClear = () => {
    setUserAnswer(prev => prev.slice(0, -1));
  };

  const handleHint = () => {
    if (gameMode === 'english' && wordProblems.length > 0) {
      const correctAnswer = wordProblems[currentProblem].english;
      const nextHintLevel = Math.min(hintLevel + 1, correctAnswer.length);
      setHintLevel(nextHintLevel);
    }
  };

  const handleSubmit = () => {
    if (userAnswer === '') return;

    // 타이머 정리
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }

    let correct = false;
    
    if (gameMode === 'english') {
      const correctAnswer = wordProblems[currentProblem].english.toLowerCase();
      correct = userAnswer.toLowerCase() === correctAnswer;
    } else {
      const userNum = parseInt(userAnswer);
      correct = userNum === problems[currentProblem].answer;
    }
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(prev => prev + 1);
    }

    const problemsLength = gameMode === 'english' ? wordProblems.length : problems.length;
    
    setTimeout(() => {
      if (currentProblem < problemsLength - 1) {
        setCurrentProblem(prev => prev + 1);
        setUserAnswer('');
        setShowResult(false);
        setHintLevel(0); // 다음 문제로 이동 시 힌트 초기화
      } else {
        setGameComplete(true);
      }
    }, 1500);
  };

  const restartGame = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    setCurrentProblem(0);
    setUserAnswer('');
    setScore(0);
    setGameComplete(false);
    setShowResult(false);
    setTimeLeft(10);
    setHintLevel(0);
    setGameMode('menu');
  };

  const startGame = (mode: 'addition' | 'multiplication' | 'english') => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    setGameMode(mode);
    setCurrentProblem(0);
    setUserAnswer('');
    setScore(0);
    setGameComplete(false);
    setShowResult(false);
    setTimeLeft(10);
    setHintLevel(0);
  };

  // 메뉴 화면
  if (gameMode === 'menu') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
        <div className="text-center p-8 bg-white rounded-3xl shadow-2xl max-w-md mx-4">
          <div className="text-6xl mb-6">🎓</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">게임을 선택하세요!</h1>
          
          <div className="space-y-4">
            <button
              onClick={() => startGame('addition')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-8 rounded-xl text-xl transition-colors shadow-lg"
            >
              <div className="text-3xl mb-2">➕</div>
              <div>더하기</div>
              <div className="text-sm opacity-80">5~19 범위 (10초 제한)</div>
            </button>
            
            <button
              onClick={() => startGame('multiplication')}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-6 px-8 rounded-xl text-xl transition-colors shadow-lg"
            >
              <div className="text-3xl mb-2">✖️</div>
              <div>곱하기</div>
              <div className="text-sm opacity-80">2~9 범위 (10초 제한)</div>
            </button>
            
            <button
              onClick={() => startGame('english')}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-8 rounded-xl text-xl transition-colors shadow-lg"
            >
              <div className="text-3xl mb-2">🔤</div>
              <div>영어 단어</div>
              <div className="text-sm opacity-80">초등 1학년 수준</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if ((gameMode !== 'english' && problems.length === 0) || (gameMode === 'english' && wordProblems.length === 0)) {
    return <div className="flex min-h-screen items-center justify-center">로딩 중...</div>;
  }

  if (gameComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="text-center p-8 bg-white rounded-3xl shadow-2xl max-w-md mx-4">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">축하합니다!</h1>
          <p className="text-xl text-gray-600 mb-6">
            총 10문제 중 <span className="font-bold text-blue-600">{score}개</span> 맞혔어요!
          </p>
          <div className="mb-6">
            {score >= 8 && <div className="text-2xl">🌟 훌륭해요!</div>}
            {score >= 6 && score < 8 && <div className="text-2xl">👍 잘했어요!</div>}
            {score < 6 && <div className="text-2xl">💪 다시 도전해보세요!</div>}
          </div>
          <div className="space-y-3">
            <button
              onClick={() => setGameMode(gameMode)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
            >
              같은 게임 다시하기
            </button>
            <button
              onClick={restartGame}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
            >
              메뉴로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100">
      <div className="text-center p-8 bg-white rounded-3xl shadow-2xl max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500">문제 {currentProblem + 1}/10</div>
          <div className="text-sm text-gray-500">점수: {score}</div>
        </div>

        {(gameMode === 'addition' || gameMode === 'multiplication') && !showResult && (
          <div className="mb-4">
            <div className={`text-2xl font-bold text-center ${timeLeft <= 3 ? 'text-red-500' : 'text-blue-500'}`}>
              ⏰ {timeLeft}초
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${timeLeft <= 3 ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${(timeLeft / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="mb-8">
          {gameMode === 'english' ? (
            <div>
              <div className="text-4xl font-bold text-gray-800 mb-4">
                {wordProblems[currentProblem].korean}
              </div>
              {hintLevel > 0 && (
                <div className="text-2xl text-blue-600 mb-4">
                  💡 힌트: {wordProblems[currentProblem].english.substring(0, hintLevel)}...
                </div>
              )}
            </div>
          ) : (
            <div className="text-4xl font-bold text-gray-800 mb-4">
              {problems[currentProblem].num1} {gameMode === 'addition' ? '+' : '×'} {problems[currentProblem].num2} = ?
            </div>
          )}
          
          <div className="text-3xl font-bold mb-6 h-12 flex items-center justify-center">
            {userAnswer || '_'}
          </div>

          {showResult && (
            <div className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? (
                <div className="flex items-center justify-center gap-2">
                  <span>🎉</span>
                  <span>정답입니다!</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>{timeLeft === 0 ? '⏰' : '😅'}</span>
                  <span>{timeLeft === 0 ? '시간 초과!' : ''} 정답은 {gameMode === 'english' ? wordProblems[currentProblem].english : problems[currentProblem].answer}이에요</span>
                </div>
              )}
            </div>
          )}
        </div>

        {gameMode === 'english' ? (
          // QWERTY 키보드 배열
          <div className="mb-6">
            <div className="space-y-2 mb-4">
              {/* 첫 번째 줄 */}
              <div className="flex justify-center gap-1">
                {['q','w','e','r','t','y','u','i','o','p'].map(letter => (
                  <button
                    key={letter}
                    onClick={() => handleLetterClick(letter)}
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
                    onClick={() => handleLetterClick(letter)}
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
                    onClick={() => handleLetterClick(letter)}
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
                onClick={handleClear}
                disabled={showResult}
                className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-bold py-4 px-2 rounded-lg transition-colors text-sm"
              >
                지우기
              </button>
              <button
                onClick={handleHint}
                disabled={showResult || hintLevel >= wordProblems[currentProblem]?.english.length}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-4 px-2 rounded-lg transition-colors text-sm"
              >
                💡 힌트
              </button>
              <button
                onClick={handleSubmit}
                disabled={showResult || userAnswer === ''}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 px-2 rounded-lg transition-colors text-sm"
              >
                확인
              </button>
            </div>
          </div>
        ) : (
          // 숫자 키패드
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[1,2,3,4,5,6,7,8,9].map(num => (
              <button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                disabled={showResult}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 px-4 rounded-lg text-xl transition-colors"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleClear}
              disabled={showResult}
              className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-bold py-4 px-4 rounded-lg transition-colors"
            >
              지우기
            </button>
            <button
              onClick={() => handleNumberClick('0')}
              disabled={showResult}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 px-4 rounded-lg text-xl transition-colors"
            >
              0
            </button>
            <button
              onClick={handleSubmit}
              disabled={showResult || userAnswer === ''}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-4 px-4 rounded-lg transition-colors"
            >
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
