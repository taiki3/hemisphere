import React, { useEffect, useRef } from 'react';
import { Message } from '../types/Message';

interface ChatHistoryProps {
  messages: Message[];
  isThinking: boolean;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, isThinking }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  return (
    <div className="chat-history" ref={scrollRef}>
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`speech-bubble ${message.sender === 'user' ? 'user-bubble' : 'ai-bubble'}`}
        >
          <div className="speech-content">
            {message.text.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      ))}
      {isThinking && (
        <div className="speech-bubble ai-bubble">
          <div className="speech-content">
            <div className="thinking-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};