fn main() {
    // Check if icon file exists and print debug information
    let icon_path = std::path::Path::new("icons/icon.ico");
    if icon_path.exists() {
        println!("cargo:warning=Icon file found at: {:?}", icon_path.canonicalize());
    } else {
        println!("cargo:warning=Icon file NOT found at: {:?}", icon_path);
        println!("cargo:warning=Current directory: {:?}", std::env::current_dir());
        
        // List files in icons directory
        if let Ok(entries) = std::fs::read_dir("icons") {
            println!("cargo:warning=Files in icons directory:");
            for entry in entries {
                if let Ok(entry) = entry {
                    println!("cargo:warning=  - {:?}", entry.path());
                }
            }
        } else {
            println!("cargo:warning=Icons directory not found or cannot be read");
        }
    }
    
    tauri_build::build()
}