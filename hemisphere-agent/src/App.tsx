import { useState } from 'react';
import { Character } from './components/Character';
import { SpeechBubble } from './components/SpeechBubble';
import { ContextMenu } from './components/ContextMenu';
import { useMessageRotation } from './hooks/useMessageRotation';
import './styles/App.css';

const INITIAL_MESSAGE = { text: "こんにちは！Hemisphere Agentです。" };

function App() {
  const { message, isAnimating } = useMessageRotation(INITIAL_MESSAGE);
  const [showMenu, setShowMenu] = useState(false);

  const handleCharacterClick = () => {
    setShowMenu(!showMenu);
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

  return (
    <div className="app ukagaka-style">
      <div className="character-container">
        <Character onClick={handleCharacterClick} />
        <SpeechBubble message={message} isAnimating={isAnimating} />
        {showMenu && <ContextMenu onAction={handleMenuAction} />}
      </div>
      <div className="ghost-shadow"></div>
    </div>
  );
}

export default App;