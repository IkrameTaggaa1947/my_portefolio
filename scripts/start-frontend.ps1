# Start Frontend Server
# This script starts the frontend development server

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Frontend Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to frontend directory
Set-Location -Path "$PSScriptRoot\..\frontend"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Frontend server starting on port 3000" -ForegroundColor Green
Write-Host "  URL: http://localhost:3000" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start Python HTTP server
python -m http.server 3000
