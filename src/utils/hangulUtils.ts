// 한글 조합을 위한 유틸리티 함수들

// 한글 자모 상수 (유니코드 표준 순서)
const 초성 = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const 중성 = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const 종성 = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

const 한글시작 = 0xAC00;
const 한글끝 = 0xD7A3;

// 겹받침 조합 테이블
const 겹받침 = {
  'ㄱㅅ': 'ㄳ', 'ㄴㅈ': 'ㄵ', 'ㄴㅎ': 'ㄶ',
  'ㄹㄱ': 'ㄺ', 'ㄹㅁ': 'ㄻ', 'ㄹㅂ': 'ㄼ', 'ㄹㅅ': 'ㄽ', 'ㄹㅌ': 'ㄾ', 'ㄹㅍ': 'ㄿ', 'ㄹㅎ': 'ㅀ',
  'ㅂㅅ': 'ㅄ'
} as const;

// 복합 모음 조합 테이블
const 복합모음 = {
  'ㅗㅏ': 'ㅘ', 'ㅗㅐ': 'ㅙ', 'ㅗㅣ': 'ㅚ',
  'ㅜㅓ': 'ㅝ', 'ㅜㅔ': 'ㅞ', 'ㅜㅣ': 'ㅟ',
  'ㅡㅣ': 'ㅢ'
} as const;

// 자음/모음 판별
function is자음(char: string): boolean {
  return 초성.includes(char);
}

function is모음(char: string): boolean {
  return 중성.includes(char);
}

function is한글(char: string): boolean {
  const code = char.charCodeAt(0);
  return code >= 한글시작 && code <= 한글끝;
}

// 한글 조합
function 한글조합(초: string, 중: string, 종: string = ''): string {
  const 초인덱스 = 초성.indexOf(초);
  const 중인덱스 = 중성.indexOf(중);
  const 종인덱스 = 종성.indexOf(종);
  
  if (초인덱스 === -1 || 중인덱스 === -1 || 종인덱스 === -1) {
    return 초 + 중 + 종;
  }
  
  const code = 한글시작 + (초인덱스 * 588) + (중인덱스 * 28) + 종인덱스;
  return String.fromCharCode(code);
}

// 한글 분해
function 한글분해(char: string): { 초: string; 중: string; 종: string } | null {
  if (!is한글(char)) return null;
  
  const code = char.charCodeAt(0) - 한글시작;
  const 초인덱스 = Math.floor(code / 588);
  const 중인덱스 = Math.floor((code % 588) / 28);
  const 종인덱스 = code % 28;
  
  return {
    초: 초성[초인덱스],
    중: 중성[중인덱스],
    종: 종성[종인덱스]
  };
}

export const handleKoreanInput = (currentAnswer: string, inputChar: string): string => {
  console.log('=== 한글 입력 ===');
  console.log('현재:', `"${currentAnswer}"`, '입력:', inputChar);
  
  if (currentAnswer.length >= 20) return currentAnswer;
  
  const 마지막 = currentAnswer.slice(-1);
  const 앞부분 = currentAnswer.slice(0, -1);
  
  // 1. 마지막 글자가 자음이고 입력이 모음인 경우
  if (마지막 && is자음(마지막) && is모음(inputChar)) {
    console.log('🔤 자음+모음 조합');
    const result = 앞부분 + 한글조합(마지막, inputChar);
    console.log('✅', result);
    return result;
  }
  
  // 2. 마지막 글자가 완성형 한글인 경우
  if (마지막 && is한글(마지막)) {
    const 분해 = 한글분해(마지막);
    if (!분해) return currentAnswer + inputChar;
    
    // 2-1. 받침이 없고 입력이 자음 → 받침 추가
    if (분해.종 === '' && is자음(inputChar)) {
      console.log('🔤 받침 추가');
      const result = 앞부분 + 한글조합(분해.초, 분해.중, inputChar);
      console.log('✅', result);
      return result;
    }
    
    // 2-2. 받침이 있고 입력이 자음 → 겹받침 시도
    if (분해.종 !== '' && is자음(inputChar)) {
      const 겹받침결과 = 겹받침[`${분해.종}${inputChar}` as keyof typeof 겹받침];
      if (겹받침결과) {
        console.log('🔤 겹받침 조합');
        const result = 앞부분 + 한글조합(분해.초, 분해.중, 겹받침결과);
        console.log('✅', result);
        return result;
      }
      // 겹받침 불가 → 새 글자 시작
      console.log('🔤 새 글자 (자음)');
      const result = currentAnswer + inputChar;
      console.log('✅', result);
      return result;
    }
    
    // 2-3. 받침이 없고 입력이 모음 → 복합모음 시도
    if (분해.종 === '' && is모음(inputChar)) {
      const 복합모음결과 = 복합모음[`${분해.중}${inputChar}` as keyof typeof 복합모음];
      if (복합모음결과) {
        console.log('🔤 복합모음 조합');
        const result = 앞부분 + 한글조합(분해.초, 복합모음결과);
        console.log('✅', result);
        return result;
      }
      // 복합모음 불가 → 새 글자 시작 (ㅇ을 초성으로)
      console.log('🔤 새 글자 (모음, 초성 ㅇ)');
      const result = 앞부분 + 한글조합(분해.초, 분해.중) + 한글조합('ㅇ', inputChar);
      console.log('✅', result);
      return result;
    }
    
    // 2-4. 받침이 있고 입력이 모음 → 받침을 다음 글자 초성으로
    if (분해.종 !== '' && is모음(inputChar)) {
      console.log('🔤 받침 → 초성 이동');
      // 겹받침인 경우 분리
      let 이동할초성 = 분해.종;
      let 남은종성 = '';
      
      // 겹받침 분리 확인
      for (const [key, value] of Object.entries(겹받침)) {
        if (value === 분해.종) {
          남은종성 = key[0];
          이동할초성 = key[1];
          break;
        }
      }
      
      const result = 앞부분 + 한글조합(분해.초, 분해.중, 남은종성) + 한글조합(이동할초성, inputChar);
      console.log('✅', result);
      return result;
    }
  }
  
  // 3. 마지막 글자가 모음이고 입력이 자음인 경우
  if (마지막 && is모음(마지막) && is자음(inputChar)) {
    console.log('🔤 모음+자음 → ㅇ 초성 조합');
    const result = 앞부분 + 한글조합('ㅇ', 마지막, inputChar);
    console.log('✅', result);
    return result;
  }
  
  // 4. 마지막 글자가 모음이고 입력도 모음인 경우
  if (마지막 && is모음(마지막) && is모음(inputChar)) {
    const 복합모음결과 = 복합모음[`${마지막}${inputChar}` as keyof typeof 복합모음];
    if (복합모음결과) {
      console.log('🔤 복합모음 조합 (단독)');
      const result = 앞부분 + 복합모음결과;
      console.log('✅', result);
      return result;
    }
  }
  
  // 5. 기본 - 단순 추가
  console.log('🔤 단순 추가');
  const result = currentAnswer + inputChar;
  console.log('✅', result);
  return result;
};

export const handleKoreanBackspace = (currentAnswer: string): string => {
  if (currentAnswer.length === 0) return currentAnswer;
  
  console.log('=== 백스페이스 ===');
  console.log('현재:', `"${currentAnswer}"`);
  
  const 마지막 = currentAnswer.slice(-1);
  const 앞부분 = currentAnswer.slice(0, -1);
  
  // 완성형 한글인 경우 분해
  if (is한글(마지막)) {
    const 분해 = 한글분해(마지막);
    if (!분해) return 앞부분;
    
    // 받침이 있으면 받침만 제거
    if (분해.종 !== '') {
      // 겹받침인 경우 하나만 제거
      for (const [key, value] of Object.entries(겹받침)) {
        if (value === 분해.종) {
          const result = 앞부분 + 한글조합(분해.초, 분해.중, key[0]);
          console.log('✅ 겹받침 분해:', result);
          return result;
        }
      }
      const result = 앞부분 + 한글조합(분해.초, 분해.중);
      console.log('✅ 받침 제거:', result);
      return result;
    }
    
    // 중성만 있으면 초성만 남김
    const result = 앞부분 + 분해.초;
    console.log('✅ 중성 제거:', result);
    return result;
  }
  
  // 자음/모음인 경우
  if (is자음(마지막) || is모음(마지막)) {
    // 복합모음 분해 확인
    for (const [key, value] of Object.entries(복합모음)) {
      if (value === 마지막) {
        const result = 앞부분 + key[0];
        console.log('✅ 복합모음 분해:', result);
        return result;
      }
    }
  }
  
  // 일반 문자 제거
  console.log('✅ 문자 제거:', 앞부분);
  return 앞부분;
};

export const addSpace = (currentAnswer: string): string => {
  if (currentAnswer.length < 20) {
    return currentAnswer + ' ';
  }
  return currentAnswer;
};