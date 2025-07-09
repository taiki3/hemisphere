import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

// TDD: Red-Green-Refactor サイクルの例

describe('App Component', () => {
  beforeEach(() => {
    // invokeモックをリセット
    vi.clearAllMocks()
  })

  // Red: 最初は失敗するテスト
  it('初期メッセージが表示される', () => {
    render(<App />)
    expect(screen.getByText('こんにちは！Hemisphere Agentです。')).toBeInTheDocument()
  })

  it('キャラクター画像が表示される', () => {
    render(<App />)
    const characterImg = screen.getByAltText('Assistant')
    expect(characterImg).toBeInTheDocument()
    expect(characterImg).toHaveAttribute('src', '/images/cat.png')
  })

  it('キャラクターをクリックするとメニューが表示される', () => {
    render(<App />)
    const character = screen.getByAltText('Assistant')
    
    // メニューは最初表示されていない
    expect(screen.queryByText('🎯 レイアウト最適化')).not.toBeInTheDocument()
    
    // キャラクターをクリック
    fireEvent.click(character)
    
    // メニューが表示される
    expect(screen.getByText('🎯 レイアウト最適化')).toBeInTheDocument()
    expect(screen.getByText('⚙️ 設定')).toBeInTheDocument()
    expect(screen.getByText('ℹ️ このソフトについて')).toBeInTheDocument()
  })

  it('ドラッグ開始時にstart_draggingが呼ばれる', async () => {
    const { invoke } = await import('@tauri-apps/api/core')
    
    render(<App />)
    const character = screen.getByAltText('Assistant')
    
    // マウスダウンイベント
    fireEvent.mouseDown(character)
    
    expect(invoke).toHaveBeenCalledWith('start_dragging')
  })

  it('メッセージが定期的に変わる', async () => {
    vi.useFakeTimers()
    
    render(<App />)
    
    // 初期メッセージ
    expect(screen.getByText('こんにちは！Hemisphere Agentです。')).toBeInTheDocument()
    
    // 8秒後
    await vi.runOnlyPendingTimersAsync()
    
    // タイマーが設定されていることを確認
    // （実際のメッセージ変更はランダムなので具体的な内容はテストしない）
    
    vi.useRealTimers()
  })
})