import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import './styles/App.css';

interface Message {
  text: string;
  isThinking?: boolean;
}

function App() {
  const [message, setMessage] = useState<Message>({ text: "こんにちは！Hemisphere Agentです。" });
  const [isAnimating, setIsAnimating] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // 定期的にメッセージを更新
    const messages = [
      { text: "今日も一緒に頑張りましょう！" },
      { text: "何かお手伝いできることはありますか？" },
      { text: "ウィンドウの配置を最適化しましょうか？" },
      { text: "作業に集中できていますか？", isThinking: true },
      { text: "コーディングの調子はどうですか？" },
      { text: "休憩も大切ですよ。" },
    ];

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setMessage(randomMessage);
        setIsAnimating(false);
      }, 300);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleCharacterClick = () => {
    setShowMenu(!showMenu);
  };

  const handleDragStart = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await invoke('start_dragging');
    } catch (error) {
      console.error('Failed to start dragging:', error);
    }
  };

  const handleMenuAction = (action: string) => {
    setShowMenu(false);
    switch (action) {
      case 'optimize':
        setMessage({ text: "ウィンドウレイアウトを分析中...", isThinking: true });
        break;
      case 'settings':
        setMessage({ text: "設定画面は開発中です！" });
        break;
      case 'about':
        setMessage({ text: "Hemisphere Agent v0.1.0\n人間とAIの共生を目指して。" });
        break;
    }
  };

  return (
    <div className="app ukagaka-style">
      <div className="character-container">
        <img 
          src="/images/cat.png" 
          alt="Assistant" 
          className="character"
          onClick={handleCharacterClick}
          onMouseDown={handleDragStart}
        />
        
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

        {showMenu && (
          <div className="context-menu">
            <button onClick={() => handleMenuAction('optimize')}>
              🎯 レイアウト最適化
            </button>
            <button onClick={() => handleMenuAction('settings')}>
              ⚙️ 設定
            </button>
            <button onClick={() => handleMenuAction('about')}>
              ℹ️ このソフトについて
            </button>
          </div>
        )}
      </div>

      <div className="ghost-shadow"></div>
    </div>
  );
}

export default App;