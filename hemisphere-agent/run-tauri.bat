@echo off
REM Tauri開発サーバー起動スクリプト（Windows用）

REM WebView2のデバッグを有効化
set WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS=--disable-features=RendererCodeIntegrity

REM Rustのバックトレースを有効化
set RUST_BACKTRACE=1

REM ターゲットディレクトリをクリア（オプション）
REM rmdir /s /q src-tauri\target

echo Starting Tauri development server...
npm run tauri:dev