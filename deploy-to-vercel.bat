@echo off
setlocal enabledelayedexpansion
title Cambodia Unlocked - Auto Deploy to https://cambodia-unlocked-app.vercel.app/
color 0b
cls
echo ========================================================
echo   CAMBODIA UNLOCKED - AUTO DEPLOY TO VERCEL
echo   Target: https://cambodia-unlocked-app.vercel.app/
echo ========================================================
echo.
cd /d "%~dp0"

echo [1/4] Building production project for Vercel...
set VERCEL=1
call npm run build
if errorlevel 1 (
    echo.
    echo [ERROR] Build failed.
    pause
    exit /b 1
)

echo.
echo [2/4] Checking Vercel login...
call npx vercel whoami >nul 2>&1
if errorlevel 1 (
    echo.
    echo [ACTION NEEDED] Please log in to Vercel in the browser that opens...
    echo.
    call npx vercel login
)

echo.
echo [3/4] Linking to project: cambodia-unlocked-app...
call npx vercel link --yes --project cambodia-unlocked-app

echo.
echo [4/4] Deploying to Production (https://cambodia-unlocked-app.vercel.app/)...
call npx vercel deploy --prebuilt --prod --yes

echo.
echo ========================================================
echo  DEPLOYMENT COMPLETE!
echo  Visit: https://cambodia-unlocked-app.vercel.app/
echo ========================================================
echo.
pause
