use tauri::{AppHandle, Runtime, Manager};
use tauri::tray::{TrayIconBuilder, MouseButton, MouseButtonState, TrayIconEvent};
use tauri::menu::{MenuBuilder, MenuItemBuilder};

pub fn create_tray_icon<R: Runtime>(app: &AppHandle<R>) -> Result<(), Box<dyn std::error::Error>> {
    // メニューアイテムの作成
    let quit_i = MenuItemBuilder::with_id("quit", "終了").build(app)?;
    let hide_i = MenuItemBuilder::with_id("hide", "隠す").build(app)?;
    let show_i = MenuItemBuilder::with_id("show", "表示").build(app)?;
    
    // メニューの作成
    let menu = MenuBuilder::new(app)
        .items(&[&show_i, &hide_i, &quit_i])
        .build()?;
    
    // トレイアイコンの作成
    let _tray = TrayIconBuilder::with_id("main")
        .tooltip("Hemisphere Agent")
        .menu(&menu)
        .on_menu_event(move |app, event| match event.id.as_ref() {
            "quit" => {
                app.exit(0);
            }
            "hide" => {
                if let Some(window) = app.get_webview_window("main") {
                    window.hide().unwrap();
                }
            }
            "show" => {
                if let Some(window) = app.get_webview_window("main") {
                    window.show().unwrap();
                    window.set_focus().unwrap();
                }
            }
            _ => {}
        })
        .on_tray_icon_event(|tray, event| {
            if let TrayIconEvent::Click {
                button: MouseButton::Left,
                button_state: MouseButtonState::Up,
                ..
            } = event
            {
                let app = tray.app_handle();
                if let Some(window) = app.get_webview_window("main") {
                    let visible = window.is_visible().unwrap_or(false);
                    if visible {
                        window.hide().unwrap();
                    } else {
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                }
            }
        })
        .build(app)?;
    
    Ok(())
}