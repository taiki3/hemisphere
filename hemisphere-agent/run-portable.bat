@echo off
echo Running Hemisphere Agent (Portable)...
cd /d "%~dp0"
start "" "target\release\hemisphere-agent.exe"