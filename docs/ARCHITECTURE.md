# Use DaisyUI specific theme color classes

DaisyUI has special classes, such as bg-primary, bg-secondary, bg-accent, etc...
Use these classes instead of making custom colors so that you can implement a feature to
be able to switch the themes to whatever you wish :)

Use color="" for the icons if it's necessary to change them when light themes :) (This is a feature from lucide-react, the icon dependency used in this project, not daisyUI)

# Change the taskbar for macOS

For macOS, using a custom titlebar will also lose some features provided by the system, such as moving or aligning the window. Another approach to customizing the titlebar but keeping native functions could be making the titlebar transparent and setting the window background color. See the usage (macOS) Transparent Titlebar with Custom Window Background Color.
https://v2.tauri.app/learn/window-customization/#creating-a-custom-titlebar

# Test the app on multiple OS using a VM to ensure that it works

self explanatory
