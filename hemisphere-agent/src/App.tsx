import { useState } from 'react';
import { Character } from './components/Character';
import { SpeechBubble } from './components/SpeechBubble';
import { ContextMenu } from './components/ContextMenu';
import { TextInput } from './components/TextInput';
import { useMessageRotation } from './hooks/useMessageRotation';
import { invoke } from '@tauri-apps/api/core';
import './styles/App.css';

const INITIAL_MESSAGE = { text: "こんにちは！Hemisphere Agentです。" };

function App() {
  const { message, isAnimating, setMessage } = useMessageRotation(INITIAL_MESSAGE);
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
    setIsThinking(true);
    
    try {
      // ユーザーの入力を表示
      setMessage({ text });
      
      // LLMに問い合わせ
      const response = await invoke<string>('ask_llm', { prompt: text });
      
      // レスポンスを表示
      setMessage({ text: response });
    } catch (error) {
      console.error('Failed to get LLM response:', error);
      setMessage({ text: 'ごめんなさい、エラーが発生しました。' });
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
        <Character onClick={handleCharacterClick} />
        <SpeechBubble 
          message={message} 
          isAnimating={isAnimating} 
          isThinking={isThinking}
        />
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