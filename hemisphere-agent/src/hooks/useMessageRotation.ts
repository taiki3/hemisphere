import { useState, useEffect } from 'react';

interface Message {
  text: string;
  isThinking?: boolean;
}

const MESSAGES: Message[] = [
  { text: "今日も一緒に頑張りましょう！" },
  { text: "何かお手伝いできることはありますか？" },
  { text: "ウィンドウの配置を最適化しましょうか？" },
  { text: "作業に集中できていますか？", isThinking: true },
  { text: "コーディングの調子はどうですか？" },
  { text: "休憩も大切ですよ。" },
];

const ROTATION_INTERVAL = 8000;
const ANIMATION_DURATION = 300;

export function useMessageRotation(initialMessage: Message) {
  const [message, setMessageState] = useState<Message>(initialMessage);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  useEffect(() => {
    if (isUserInteracting) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        const randomMessage = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        setMessageState(randomMessage);
        setIsAnimating(false);
      }, ANIMATION_DURATION);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [isUserInteracting]);

  const setMessage = (newMessage: Message) => {
    setIsUserInteracting(true);
    setIsAnimating(true);
    
    setTimeout(() => {
      setMessageState(newMessage);
      setIsAnimating(false);
      
      // 10秒後に自動ローテーションを再開
      setTimeout(() => {
        setIsUserInteracting(false);
      }, 10000);
    }, ANIMATION_DURATION);
  };

  return { message, isAnimating, setMessage };
}