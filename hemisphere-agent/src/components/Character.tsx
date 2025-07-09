import React from 'react';
import { invoke } from '@tauri-apps/api/core';

interface CharacterProps {
  onClick: () => void;
}

export const Character: React.FC<CharacterProps> = ({ onClick }) => {
  const handleDragStart = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await invoke('start_dragging');
    } catch (error) {
      console.error('Failed to start dragging:', error);
    }
  };

  return (
    <img 
      src="/images/cat.png" 
      alt="Assistant" 
      className="character"
      onClick={onClick}
      onMouseDown={handleDragStart}
    />
  );
};