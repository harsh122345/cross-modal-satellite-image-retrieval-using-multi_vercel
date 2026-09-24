@echo off
setlocal enabledelayedexpansion

echo ===================================================================
echo   Uploading Project to GitHub:
echo   harsh122345/cross-modal-satellite-image-retrieval-using-multi_vercel
echo ===================================================================
echo.

cd /d "%~dp0"

:: 1. Check if git is available in PATH
where git >nul 2>&1
if %errorlevel% equ 0 (
    set "GIT_EXE=git"
    goto :RUN_GIT
)

:: 2. Check standard installation directories
if exist "%ProgramFiles%\Git\cmd\git.exe" (
    set "GIT_EXE=%ProgramFiles%\Git\cmd\git.exe"
    set "PATH=%ProgramFiles%\Git\cmd;%PATH%"
    goto :RUN_GIT
)
if exist "%ProgramFiles(x86)%\Git\cmd\git.exe" (
    set "GIT_EXE=%ProgramFiles(x86)%\Git\cmd\git.exe"
    set "PATH=%ProgramFiles(x86)%\Git\cmd;%PATH%"
    goto :RUN_GIT
)
if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" (
    set "GIT_EXE=%LOCALAPPDATA%\Programs\Git\cmd\git.exe"
    set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"
    goto :RUN_GIT
)

:: 3. Git not found -> Offer automatic install via winget
echo [NOTICE] Git is not installed or not in PATH.
echo Attempting to install Git automatically using Windows Package Manager (winget)...
echo.
winget install --id Git.Git -e --source winget

if exist "%ProgramFiles%\Git\cmd\git.exe" (
    set "GIT_EXE=%ProgramFiles%\Git\cmd\git.exe"
    set "PATH=%ProgramFiles%\Git\cmd;%PATH%"
    goto :RUN_GIT
)
if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" (
    set "GIT_EXE=%LOCALAPPDATA%\Programs\Git\cmd\git.exe"
    set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"
    goto :RUN_GIT
)

echo.
echo ===================================================================
echo [ACTION REQUIRED] Please install Git manually from:
echo https://git-scm.com/download/win
echo After installing, run this script again or restart your terminal.
echo ===================================================================
echo.
pause
exit /b 1

:RUN_GIT
echo Found Git: !GIT_EXE!
echo.
echo [1/4] Staging all project files...
"!GIT_EXE!" add -A

echo [2/4] Committing changes...
"!GIT_EXE!" commit -m "Upload Cross-Modal Satellite Image Retrieval with Vercel, FastAPI, Opening Animation & Soundtrack"

echo [3/4] Setting main branch...
"!GIT_EXE!" branch -M main

echo [4/4] Pushing to GitHub repository...
"!GIT_EXE!" push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo Pushing with force in case remote contains conflicting initial files...
    "!GIT_EXE!" push -u origin main --force
)

echo.
if %errorlevel% equ 0 (
    echo ===================================================================
    echo [SUCCESS] Project files uploaded successfully to:
    echo https://github.com/harsh122345/cross-modal-satellite-image-retrieval-using-multi_vercel
    echo ===================================================================
) else (
    echo [ERROR] Git push failed. Please verify your GitHub login / authentication credentials.
)
echo.
pause
