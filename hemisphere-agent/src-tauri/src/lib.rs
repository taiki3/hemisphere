pub mod tray_icon;

use tauri::Runtime;

// Tauriコマンド: ウィンドウをドラッグ開始
#[tauri::command]
pub fn start_dragging<R: Runtime>(window: tauri::Window<R>) {
    window.start_dragging().ok();
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_start_dragging_command_exists() {
        // start_dragging関数が存在することを確認
        // 実際の動作テストはモックが必要
        assert_eq!(std::any::type_name_of_val(&start_dragging::<tauri::Wry>), 
                   "hemisphere_agent::start_dragging<tauri::runtime::wry::Wry>");
    }
}