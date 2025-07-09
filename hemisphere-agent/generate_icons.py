#!/usr/bin/env python3
"""
Simple icon generator for Hemisphere Agent
Creates basic icon files required for Tauri build
"""

import os
from PIL import Image, ImageDraw, ImageFont

def create_icon():
    # Create a simple icon with a hemisphere design
    sizes = [16, 32, 48, 64, 128, 256]
    
    # Create the largest size first
    max_size = 256
    img = Image.new('RGBA', (max_size, max_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw a simple hemisphere design
    # Background circle
    margin = 20
    draw.ellipse([margin, margin, max_size-margin, max_size-margin], 
                 fill=(100, 149, 237), outline=(70, 130, 180), width=3)
    
    # Draw a simple "H" for Hemisphere
    font_size = 120
    try:
        # Try to use a system font
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        # Fallback to default font
        font = ImageFont.load_default()
    
    # Draw the H
    text = "H"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (max_size - text_width) // 2
    y = (max_size - text_height) // 2 - 10
    draw.text((x, y), text, fill=(255, 255, 255), font=font)
    
    # Save as PNG first
    os.makedirs('src-tauri/icons', exist_ok=True)
    img.save('src-tauri/icons/icon.png', 'PNG')
    print("Created icon.png")
    
    # Create ICO file with multiple sizes
    ico_images = []
    for size in sizes:
        resized = img.resize((size, size), Image.Resampling.LANCZOS)
        ico_images.append(resized)
    
    # Save as ICO
    ico_images[0].save('src-tauri/icons/icon.ico', format='ICO', 
                       sizes=[(s, s) for s in sizes], 
                       append_images=ico_images[1:])
    print("Created icon.ico with sizes:", sizes)
    
    # Also create smaller PNG versions for different platforms
    for size in [32, 128]:
        resized = img.resize((size, size), Image.Resampling.LANCZOS)
        resized.save(f'src-tauri/icons/{size}x{size}.png', 'PNG')
        print(f"Created {size}x{size}.png")

if __name__ == "__main__":
    try:
        create_icon()
        print("\nIcon files created successfully!")
        print("You can now build the application with 'cargo tauri build'")
    except ImportError:
        print("Error: Pillow library not installed.")
        print("Install it with: pip install Pillow")
        print("\nAlternatively, you can:")
        print("1. Use an online ICO converter with any image")
        print("2. Or use image editing software like GIMP to create an ICO file")
        print("3. The ICO should contain these sizes: 16x16, 32x32, 48x48, 64x64, 128x128, 256x256")