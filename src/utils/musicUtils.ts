// 클래식 음악 배경음 생성 함수
export const createBackgroundMusic = (): void => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // 클래식한 분위기의 멜로디 생성
    const playNote = (frequency: number, startTime: number, duration: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, startTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    // 간단한 클래식 멜로디 패턴
    const melody = [
      { note: 261.63, duration: 0.5 }, // C4
      { note: 293.66, duration: 0.5 }, // D4
      { note: 329.63, duration: 0.5 }, // E4
      { note: 349.23, duration: 0.5 }, // F4
      { note: 392.00, duration: 1.0 }, // G4
      { note: 349.23, duration: 0.5 }, // F4
      { note: 329.63, duration: 0.5 }, // E4
      { note: 293.66, duration: 0.5 }, // D4
      { note: 261.63, duration: 1.0 }, // C4
    ];

    let currentTime = audioContext.currentTime + 0.1;
    
    const playMelody = () => {
      melody.forEach((note) => {
        playNote(note.note, currentTime, note.duration);
        currentTime += note.duration;
      });
      
      // 멜로디 반복
      setTimeout(() => {
        currentTime = audioContext.currentTime + 0.1;
        playMelody();
      }, melody.reduce((sum, note) => sum + note.duration, 0) * 1000 + 2000);
    };

    playMelody();
  } catch (error) {
    console.log('Background music not available');
  }
};