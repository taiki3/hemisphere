//! Platform abstraction layer for window management

use crate::window_manager::Window;
use anyhow::Result;

/// Platform-specific window system operations
pub trait PlatformWindowSystem: Send + Sync {
    /// Get all windows currently managed by the system
    fn get_all_windows(&self) -> Result<Vec<Window>>;
    
    /// Move a window to a new position
    fn move_window(&self, window_id: &str, x: i32, y: i32) -> Result<()>;
    
    /// Resize a window
    fn resize_window(&self, window_id: &str, width: u32, height: u32) -> Result<()>;
    
    /// Move and resize a window in one operation
    fn set_window_geometry(&self, window_id: &str, x: i32, y: i32, width: u32, height: u32) -> Result<()>;
}

#[cfg(test)]
mod tests {
    use super::*;
    
    // Mock implementation for testing
    struct MockWindowSystem {
        windows: Vec<Window>,
    }
    
    impl MockWindowSystem {
        fn new() -> Self {
            MockWindowSystem {
                windows: vec![],
            }
        }
        
        fn with_windows(windows: Vec<Window>) -> Self {
            MockWindowSystem { windows }
        }
    }
    
    impl PlatformWindowSystem for MockWindowSystem {
        fn get_all_windows(&self) -> Result<Vec<Window>> {
            Ok(self.windows.clone())
        }
        
        fn move_window(&self, _window_id: &str, _x: i32, _y: i32) -> Result<()> {
            Ok(())
        }
        
        fn resize_window(&self, _window_id: &str, _width: u32, _height: u32) -> Result<()> {
            Ok(())
        }
        
        fn set_window_geometry(&self, _window_id: &str, _x: i32, _y: i32, _width: u32, _height: u32) -> Result<()> {
            Ok(())
        }
    }
    
    #[test]
    fn test_mock_window_system_returns_empty_list() {
        let system = MockWindowSystem::new();
        let windows = system.get_all_windows().unwrap();
        assert_eq!(windows.len(), 0);
    }
    
    #[test]
    fn test_mock_window_system_returns_preset_windows() {
        let test_windows = vec![
            Window {
                id: "1".to_string(),
                title: "Test Window".to_string(),
                x: 100,
                y: 100,
                width: 800,
                height: 600,
            },
        ];
        
        let system = MockWindowSystem::with_windows(test_windows.clone());
        let windows = system.get_all_windows().unwrap();
        assert_eq!(windows.len(), 1);
        assert_eq!(windows[0].title, "Test Window");
    }
    
    #[test]
    fn test_trait_is_object_safe() {
        // This test ensures our trait can be used as a trait object
        let system: Box<dyn PlatformWindowSystem> = Box::new(MockWindowSystem::new());
        let _ = system.get_all_windows();
    }
}