// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod tray_icon;

use anyhow::Result;
use tauri::Runtime;
use tracing::info;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

// Tauriコマンド: ウィンドウをドラッグ開始
#[tauri::command]
fn start_dragging<R: Runtime>(window: tauri::Window<R>) {
    window.start_dragging().ok();
}

fn main() -> Result<()> {
    // Initialize tracing
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "hemisphere_agent=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    info!("Starting Hemisphere Agent");

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            // トレイアイコンの作成
            tray_icon::create_tray_icon(app.handle())?;
            
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![start_dragging])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}