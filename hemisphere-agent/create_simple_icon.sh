#!/bin/bash
# Simple icon creation script using ImageMagick

# Create icons directory if it doesn't exist
mkdir -p src-tauri/icons

# Create a simple icon using ImageMagick convert command
# This creates a blue circle with white "H" letter

# First, check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed."
    echo "Please install it with: sudo apt-get install imagemagick"
    echo ""
    echo "Alternatively, you can create icons manually:"
    echo "1. Create or find a 256x256 PNG image for your app"
    echo "2. Use an online converter like https://convertio.co/png-ico/"
    echo "3. Save the ICO file as src-tauri/icons/icon.ico"
    echo "4. Save the PNG file as src-tauri/icons/icon.png"
    exit 1
fi

# Create a 256x256 PNG icon
convert -size 256x256 xc:transparent \
    -fill '#6495ED' -draw 'circle 128,128 128,20' \
    -fill '#4682B4' -draw 'circle 128,128 125,20' \
    -fill white -pointsize 120 -gravity center \
    -font DejaVu-Sans-Bold -annotate +0+0 'H' \
    src-tauri/icons/icon.png

echo "Created icon.png"

# Convert PNG to ICO with multiple sizes
convert src-tauri/icons/icon.png \
    -define icon:auto-resize=256,128,64,48,32,16 \
    src-tauri/icons/icon.ico

echo "Created icon.ico"

# Create additional PNG sizes
for size in 32 128; do
    convert src-tauri/icons/icon.png -resize ${size}x${size} \
        src-tauri/icons/${size}x${size}.png
    echo "Created ${size}x${size}.png"
done

echo ""
echo "Icon files created successfully!"
echo "You can now build the application."