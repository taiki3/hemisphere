import React from 'react';

interface Message {
  text: string;
  isThinking?: boolean;
}

interface SpeechBubbleProps {
  message: Message;
  isAnimating: boolean;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({ message, isAnimating }) => {
  return (
    <div className={`speech-bubble ${isAnimating ? 'animating' : ''}`}>
      <div className="speech-content">
        {message.text.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
      {message.isThinking && (
        <div className="thinking-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </div>
  );
};