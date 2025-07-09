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
  const [message, setMessage] = useState<Message>(initialMessage);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        const randomMessage = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        setMessage(randomMessage);
        setIsAnimating(false);
      }, ANIMATION_DURATION);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return { message, isAnimating };
}