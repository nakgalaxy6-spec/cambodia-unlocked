@echo off
setlocal enabledelayedexpansion
title Cambodia Unlocked - Vercel Deployment
color 0b
cls
echo ========================================================
echo        CAMBODIA UNLOCKED - DEPLOY TO VERCEL
echo ========================================================
echo.
cd /d "%~dp0"

echo [1/3] Building project for Vercel...
set VERCEL=1
call npm run build
if errorlevel 1 (
    echo.
    echo [ERROR] Build failed. Please check errors above.
    pause
    exit /b 1
)

echo.
echo [2/3] Checking Vercel login...
call npx vercel whoami >nul 2>&1
if errorlevel 1 (
    echo.
    echo [NOTICE] You are not logged in to Vercel yet.
    echo Please log in with GitHub or Email when prompted:
    echo.
    call npx vercel login
)

echo.
echo [3/3] Deploying project to Vercel Production (cambodia-unlocked-app)...
echo.
echo ********************************************************
echo  IMPORTANT: When prompted by Vercel:
echo    1. Link to existing project? [y/N]  --^> Type: y
echo    2. What is the name of your project? --^> Type: cambodia-unlocked-app
echo ********************************************************
echo.
call npx vercel --prod
echo.
echo ========================================================
echo DEPLOYMENT COMPLETE!
echo Live website URL is shown above.
echo ========================================================
echo.
pause
