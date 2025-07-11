import React from 'react';

interface Message {
  text: string;
  isThinking?: boolean;
}

interface SpeechBubbleProps {
  message: Message;
  isAnimating: boolean;
  isThinking?: boolean;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({ message, isAnimating, isThinking }) => {
  return (
    <div className={`speech-bubble ${isAnimating ? 'animating' : ''}`}>
      <div className="speech-content">
        {isThinking ? (
          <div className="thinking-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          message.text.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))
        )}
      </div>
    </div>
  );
};