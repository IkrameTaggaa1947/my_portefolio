# Script pour ajouter facilement votre photo au portfolio
# Usage: .\add-photo.ps1 "chemin_vers_votre_photo.jpg"

param(
    [Parameter(Mandatory=$false)]
    [string]$PhotoPath
)

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Ajouter Votre Photo au Portfolio" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

$destinationPath = "$PSScriptRoot\frontend\images\profile.jpg"

if ([string]::IsNullOrEmpty($PhotoPath)) {
    Write-Host "Aucun chemin fourni. Recherche de photos sur le Bureau..." -ForegroundColor Yellow
    Write-Host ""
    
    $bureauPath = [Environment]::GetFolderPath("Desktop")
    $photos = Get-ChildItem $bureauPath -Include *.jpg,*.jpeg,*.png -Recurse -ErrorAction SilentlyContinue | Select-Object -First 10
    
    if ($photos.Count -eq 0) {
        Write-Host "Aucune photo trouvée sur le Bureau." -ForegroundColor Red
        Write-Host ""
        Write-Host "Utilisation:" -ForegroundColor White
        Write-Host "  .\add-photo.ps1 'C:\chemin\vers\votre\photo.jpg'" -ForegroundColor Gray
        exit 1
    }
    
    Write-Host "Photos trouvées:" -ForegroundColor Green
    for ($i = 0; $i -lt $photos.Count; $i++) {
        Write-Host "  [$i] $($photos[$i].Name)" -ForegroundColor White
    }
    
    Write-Host ""
    $selection = Read-Host "Entrez le numéro de votre photo (ou Q pour quitter)"
    
    if ($selection -eq "Q" -or $selection -eq "q") {
        Write-Host "Annulé." -ForegroundColor Yellow
        exit 0
    }
    
    $PhotoPath = $photos[$selection].FullName
}

if (-not (Test-Path $PhotoPath)) {
    Write-Host "Erreur: Le fichier '$PhotoPath' n'existe pas." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Copie de la photo..." -ForegroundColor Yellow
Copy-Item $PhotoPath $destinationPath -Force

if (Test-Path $destinationPath) {
    Write-Host "✓ Photo ajoutée avec succès!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Prochaine étape:" -ForegroundColor Cyan
    Write-Host "  1. Ouvrez votre navigateur sur http://localhost:3000" -ForegroundColor White
    Write-Host "  2. Appuyez sur Ctrl+F5 pour rafraîchir" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "✗ Erreur lors de la copie de la photo." -ForegroundColor Red
    exit 1
}
