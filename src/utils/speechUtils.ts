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
      utterance.rate = 0.5; // 엄청 느리게
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

// 정답 사운드 재생 (딩동댕)
export const playCorrectSound = (): void => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99]; // 도, 미, 솔
    let startTime = audioContext.currentTime;

    notes.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);

      startTime += 0.15;
    });
  } catch (error) {
    console.log('Sound playback not supported');
  }
};

// 오답 사운드 재생 (땡)
export const playWrongSound = (): void => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 200; // 낮은 부저음
    oscillator.type = 'sawtooth';

    const startTime = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0.3, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.5);
  } catch (error) {
    console.log('Sound playback not supported');
  }
};
