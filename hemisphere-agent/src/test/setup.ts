import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Tauri API のモック
vi.mock('@tauri-apps/api/core', () => ({
  invoke: vi.fn(),
}))