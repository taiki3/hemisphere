#!/usr/bin/env python3
"""
Create a minimal valid ICO file for Windows build
This creates a very simple 16x16 icon that's valid but blank
"""

import struct

# ICO file header
icondir = struct.pack('<HHH', 0, 1, 1)  # Reserved, Type (1=ICO), Count

# ICONDIRENTRY for a 16x16 icon
width = 16
height = 16
colors = 0  # 0 = 256 colors or more
reserved = 0
planes = 1
bitcount = 32  # 32-bit color
size = 40 + (width * height * 4)  # Header + pixel data
offset = 22  # Size of ICONDIR + ICONDIRENTRY

icondirentry = struct.pack('<BBBBHHII', 
    width, height, colors, reserved, planes, bitcount, size, offset)

# BITMAPINFOHEADER
biSize = 40
biWidth = width
biHeight = height * 2  # Double height for ICO
biPlanes = 1
biBitCount = 32
biCompression = 0
biSizeImage = width * height * 4
biXPelsPerMeter = 0
biYPelsPerMeter = 0
biClrUsed = 0
biClrImportant = 0

bitmapheader = struct.pack('<IiiHHIIiiII',
    biSize, biWidth, biHeight, biPlanes, biBitCount, biCompression,
    biSizeImage, biXPelsPerMeter, biYPelsPerMeter, biClrUsed, biClrImportant)

# Create simple blue pixels (BGRA format)
pixels = b'\xED\x95\x64\xFF' * (width * height)  # Cornflower blue

# Write the ICO file
with open('icon.ico', 'wb') as f:
    f.write(icondir)
    f.write(icondirentry)
    f.write(bitmapheader)
    f.write(pixels)
    # No mask data for 32-bit icons

print("Created minimal icon.ico")
print("This is a valid but very basic icon file.")
print("For a better icon, please create a proper one using an image editor.")