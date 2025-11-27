# Start Backend Server
# This script starts the Flask backend server

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Backend Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to backend directory
Set-Location -Path "$PSScriptRoot\..\backend"

# Check if virtual environment exists
if (-Not (Test-Path "venv")) {
    Write-Host "Virtual environment not found. Creating one..." -ForegroundColor Yellow
    python -m venv venv
    Write-Host "Virtual environment created successfully!" -ForegroundColor Green
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& ".\venv\Scripts\Activate.ps1"

# Check if .env exists
if (-Not (Test-Path ".env")) {
    Write-Host "Warning: .env file not found!" -ForegroundColor Red
    Write-Host "Copying .env.example to .env..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "Please update the .env file with your configuration!" -ForegroundColor Yellow
    Write-Host ""
}

# Install dependencies if needed
Write-Host "Checking dependencies..." -ForegroundColor Yellow
pip install -q -r requirements.txt

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Backend server starting on port 5000" -ForegroundColor Green
Write-Host "  URL: http://localhost:5000" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Start the Flask server
python app.py
