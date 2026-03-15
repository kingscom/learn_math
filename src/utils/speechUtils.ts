// 영어 발음 재생 함수 (Web Speech API 사용)
export const speakEnglish = (text: string, times: number = 1): void => {
  if ('speechSynthesis' in window) {
    let count = 0;
    
    const speak = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9; // 조금 느리게
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      utterance.onend = () => {
        count++;
        if (count < times) {
          // 다음 발음 전 짧은 딜레이
          setTimeout(speak, 500);
        }
      };
      
      window.speechSynthesis.speak(utterance);
    };
    
    speak();
  }
};

// 하랑이 영어 전용 - 더 느리고 명확한 발음
export const speakEnglishSlow = (text: string, times: number = 1): void => {
  if ('speechSynthesis' in window) {
    let count = 0;
    
    const speak = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.3; // 엄청 느리게
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      utterance.onend = () => {
        count++;
        if (count < times) {
          // 다음 발음 전 긴 딜레이
          setTimeout(speak, 1000);
        }
      };
      
      window.speechSynthesis.speak(utterance);
    };
    
    speak();
  }
};

// 발음을 멈추는 함수
export const stopSpeaking = (): void => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
