// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod lib;
mod tray_icon;

use anyhow::Result;
use tracing::info;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

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
            
            // ウィンドウの背景を透明にする
            if let Some(window) = app.get_webview_window("main") {
                // ウィンドウの背景を完全に透明にする
                #[cfg(target_os = "windows")]
                {
                    use tauri::window::Color;
                    window.set_background_color(Some(Color(0, 0, 0, 0)))?;
                }
            }
            
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![lib::start_dragging])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}