# Hemisphere プロジェクト開発ガイド

## プロジェクト概要

**Hemisphere**は、人間とAIが対等なパートナーとして共生する新時代の創作環境です。このプロジェクトは、人間半球（Human Hemisphere）とAI半球（AI Hemisphere）という二つの領域が融合し、一つの完全な「知性の球体」を形成することを目指しています。

### プロジェクトの哲学

- **AI-First Development**: AIによる開発を前提とした設計
- **Radical Component Independence**: コンポーネント間の徹底した独立性
- **相互リスペクト**: AIは人間の補助ツールではなく、対等なパートナー

## アーキテクチャ概要

Hemisphereは「分割アーキテクチャ in モノレポ」戦略を採用しています。

### コンポーネント構成

1. **hemisphere-wm** (Window Manager)
   - AI半球の"手足"として機能
   - Rustベースの軽量タイル型ウィンドウマネージャ
   - MCP経由で外部から操作可能

2. **hemisphere-agent** (Desktop Agent)
   - AI半球の"感覚と思考"として機能
   - Tauriベースのデスクトップエージェント
   - LLMと連携してユーザーコンテキストを理解

### 技術スタック

- **言語**: Rust, TypeScript, HTML, CSS
- **フレームワーク**: Tauri
- **通信プロトコル**: MCP (Machine Control Program) Interface over JSON-RPC
- **プラットフォーム**: Linux, Windows (初期リリース)

## プロジェクト構造（予定）

```
hemisphere/
├── hemisphere-wm/          # ウィンドウマネージャ
│   ├── src/               # Rustソースコード
│   ├── Cargo.toml
│   └── README.md
├── hemisphere-agent/       # デスクトップエージェント
│   ├── src/               # Tauriアプリケーション
│   ├── src-tauri/         # Rustバックエンド
│   ├── package.json
│   └── README.md
├── mcp-spec/              # MCPインタフェース仕様
│   ├── protocol.md
│   └── examples/
├── docs/                  # プロジェクトドキュメント
├── CLAUDE.md              # このファイル
├── design.md              # 設計ドキュメント
└── README.md              # プロジェクト概要
```

## 開発ガイドライン

### 最重要原則：テスト駆動開発（TDD）

このプロジェクトでは、**t-wadaのTDD原則**に従います。すべてのコードは以下のサイクルで開発されます：

1. **Red**: 失敗するテストを最初に書く
2. **Green**: テストを通過する最小限の実装を行う
3. **Refactor**: テストが通る状態を保ちながらコードを改善する

#### TDDの実践指針

- **テストファースト**: 実装前に必ずテストを書く
- **小さなステップ**: 一度に一つのテストケースに集中
- **シンプルさ**: 最初は最も単純な実装から始める
- **継続的リファクタリング**: グリーンになったら即座に改善を検討

#### テストの種類と配置

```
hemisphere-wm/
├── src/
│   ├── lib.rs
│   └── window_manager.rs
└── tests/
    ├── unit/        # ユニットテスト
    ├── integration/ # 統合テスト
    └── e2e/         # エンドツーエンドテスト
```

### AI開発者向けの重要指針

1. **TDDサイクルの厳守**
   - 新機能追加時は必ず失敗するテストから開始
   - テストなしのコードはレビューで却下
   - カバレッジ目標: 80%以上

2. **コンポーネント独立性の維持**
   - `hemisphere-wm`と`hemisphere-agent`は、MCPの仕様書のみを頼りに開発可能
   - 内部実装の詳細を知らなくても、インタフェースを通じて完全に機能する

3. **可読性とモジュール性**
   - 人間とAI双方にとって理解しやすいコード
   - 明確な責務分割と厳格な型定義

4. **MCPプロトコルの遵守**
   - MCPは二つの半球が協調するための共通言語
   - 仕様変更時は必ず両コンポーネントの互換性を確保

### 開発フロー（TDD適用）

1. **機能開発時**
   - MCPインタフェースの仕様からテストケースを導出
   - 失敗するテストを書く（Red）
   - 最小限の実装でテストを通す（Green）
   - リファクタリング（Refactor）
   - 各コンポーネントは独立してTDDサイクルを回す
   - 統合テストで協調動作を確認

2. **デバッグ時**
   - まず失敗するテストでバグを再現
   - テストが通るように修正
   - 回帰テストとして保持

### TDDの具体例

```rust
// 1. Red: 失敗するテストを書く
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_windows_returns_empty_list_when_no_windows() {
        let wm = WindowManager::new();
        let windows = wm.get_windows();
        assert_eq!(windows.len(), 0);
    }
}

// 2. Green: 最小限の実装
pub struct WindowManager;

impl WindowManager {
    pub fn new() -> Self {
        WindowManager
    }
    
    pub fn get_windows(&self) -> Vec<Window> {
        vec![]
    }
}

// 3. Refactor: 必要に応じて改善
```

## MCP (Machine Control Program) Interface

MCPは、`hemisphere-agent`と`hemisphere-wm`間の通信プロトコルです。

### 基本仕様

- **プロトコル**: JSON-RPC 2.0
- **通信方式**: IPC (詳細は実装時に決定)

### 主要なAPI（予定）

```json
// ウィンドウレイアウトの提案
{
  "jsonrpc": "2.0",
  "method": "propose_layout",
  "params": {
    "layout_type": "split_vertical",
    "windows": ["editor", "terminal"]
  },
  "id": 1
}

// アクティブウィンドウの情報取得
{
  "jsonrpc": "2.0",
  "method": "get_active_window",
  "id": 2
}

// フォーカス変更の通知
{
  "jsonrpc": "2.0",
  "method": "notify_focus_change",
  "params": {
    "window_id": "editor-1",
    "timestamp": "2025-07-08T10:00:00Z"
  }
}
```

## 現在の開発状況

- プロジェクト初期化完了
- 設計ドキュメント作成済み
- 次のステップ: 基本的なプロジェクト構造の作成

## 今後の開発計画

1. **Phase 1**: 基本構造の確立
   - モノレポ構造のセットアップ
   - 各コンポーネントの初期化

2. **Phase 2**: コアコンポーネントの実装
   - `hemisphere-wm`の基本機能
   - `hemisphere-agent`のUI基盤

3. **Phase 3**: MCP統合
   - プロトコル実装
   - コンポーネント間通信の確立

4. **Phase 4**: LLM統合
   - エージェントへのLLM組み込み
   - コンテキスト理解機能の実装

## 貢献ガイドライン

このプロジェクトは、AIと人間の共同開発を前提としています。コードレビュー時は、両者にとっての可読性を重視してください。

## 注意事項

- macOSサポートは初期リリースの対象外です
- 各コンポーネントは独立して動作可能ですが、真の価値は連携時に発揮されます