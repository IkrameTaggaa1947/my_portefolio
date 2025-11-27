# Setup Script - Portfolio Website
# This script sets up the entire project

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Portfolio Website Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Python installation
Write-Host "Checking Python installation..." -ForegroundColor Yellow
$pythonCmd = Get-Command python -ErrorAction SilentlyContinue

if (-not $pythonCmd) {
    Write-Host "ERROR: Python not found!" -ForegroundColor Red
    Write-Host "Please install Python 3.8+ from https://www.python.org/downloads/" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

$pythonVersion = python --version 2>&1
Write-Host "Found: $pythonVersion" -ForegroundColor Green
Write-Host ""

# Navigate to backend directory
Write-Host "Setting up Backend..." -ForegroundColor Yellow
Write-Host "--------------------" -ForegroundColor Gray
$backendPath = Join-Path $PSScriptRoot "..\backend"
Set-Location -Path $backendPath

# Create virtual environment
if (-Not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
    Write-Host "Virtual environment created!" -ForegroundColor Green
} else {
    Write-Host "Virtual environment already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
$activateScript = ".\venv\Scripts\Activate.ps1"

if (Test-Path $activateScript) {
    & $activateScript
    
    Write-Host "Installing dependencies (this may take a minute)..." -ForegroundColor Yellow
    pip install -q -r requirements.txt
    Write-Host "Dependencies installed!" -ForegroundColor Green
}

Write-Host ""

# Setup .env file
if (-Not (Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host ".env file created!" -ForegroundColor Green
    Write-Host ""
    Write-Host "NOTE: Edit backend\.env to configure email (optional)" -ForegroundColor Yellow
} else {
    Write-Host ".env file already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. (Optional) Edit backend\.env for email configuration" -ForegroundColor White
Write-Host "2. Run: .\scripts\start-all.ps1" -ForegroundColor White
Write-Host "3. Open: http://localhost:3000" -ForegroundColor White
Write-Host ""
pause
