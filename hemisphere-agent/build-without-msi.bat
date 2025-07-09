@echo off
echo Building Hemisphere Agent without MSI installer...
npm run tauri build -- --bundles nsis
echo.
echo If build successful, the exe file is at:
echo target\release\hemisphere-agent.exe