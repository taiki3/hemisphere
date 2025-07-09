import React from 'react';

interface ContextMenuProps {
  onAction: (action: string) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ onAction }) => {
  return (
    <div className="context-menu">
      <button onClick={() => onAction('optimize')}>
        🎯 レイアウト最適化
      </button>
      <button onClick={() => onAction('settings')}>
        ⚙️ 設定
      </button>
      <button onClick={() => onAction('about')}>
        ℹ️ このソフトについて
      </button>
    </div>
  );
};