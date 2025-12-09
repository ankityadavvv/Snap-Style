@echo off
echo ==========================================
echo    NeemansStylist Code Uploader (v2)
echo ==========================================
echo.
echo 1. Configuration...
set PATH=%PATH%;C:\Program Files\Git\cmd
git config --global user.email "you@example.com" 2>nul
git config --global user.name "Neemans User" 2>nul

echo.
echo 2. Setting up Repository...
git remote remove origin 2>nul
git remote add origin https://github.com/ankityadavvv/Snap-Style.git

echo.
echo 3. Preparing Code...
git branch -M main
git add .
git commit -m "Deployment Update" 2>nul

echo.
echo 4. Push to GitHub...
echo.
echo [IMPORTANT] A browser window might open. Please sign in to GitHub if asked.
echo.
git push -u origin main

echo.
if %ERRORLEVEL% NEQ 0 (
    echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    echo    ERROR: Upload failed.
    echo    Please read the error message above.
    echo    Note: You might need to sign in to GitHub.
    echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
) else (
    echo ==========================================
    echo    SUCCESS! Code uploaded.
    echo ==========================================
)
pause
