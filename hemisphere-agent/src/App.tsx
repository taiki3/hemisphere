import { useState } from 'react';
import { Character } from './components/Character';
import { ChatHistory } from './components/ChatHistory';
import { ContextMenu } from './components/ContextMenu';
import { TextInput } from './components/TextInput';
import { invoke } from '@tauri-apps/api/core';
import { Message } from './types/Message';
import './styles/App.css';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'こんにちは！Hemisphere Agentです。',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [showMenu, setShowMenu] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const handleCharacterClick = () => {
    if (!showInput) {
      setShowInput(true);
      setShowMenu(false);
    }
  };

  const handleMenuAction = (action: string) => {
    setShowMenu(false);
    // TODO: アクション処理を別のサービスに移動
    switch (action) {
      case 'optimize':
        // TODO: ウィンドウマネージャーとの連携実装
        break;
      case 'settings':
        // TODO: 設定画面の実装
        break;
      case 'about':
        // TODO: バージョン情報の表示
        break;
    }
  };

  const handleTextSubmit = async (text: string) => {
    setShowInput(false);
    
    // ユーザーメッセージを追加
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    
    setIsThinking(true);
    
    try {
      // LLMに問い合わせ
      const response = await invoke<string>('ask_llm', { prompt: text });
      
      // AIメッセージを追加
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to get LLM response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'ごめんなさい、エラーが発生しました。',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleInputCancel = () => {
    setShowInput(false);
  };

  return (
    <div className="app ukagaka-style">
      <div className="character-container">
        <ChatHistory messages={messages} isThinking={isThinking} />
        <Character onClick={handleCharacterClick} />
        {showMenu && <ContextMenu onAction={handleMenuAction} />}
        <TextInput 
          isVisible={showInput}
          onSubmit={handleTextSubmit}
          onCancel={handleInputCancel}
        />
      </div>
      <div className="ghost-shadow"></div>
    </div>
  );
}

export default App;