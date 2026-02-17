# Script pour ajouter facilement vos certificats PDF au portfolio
# Usage: .\add-certificates.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Gestionnaire de Certificats Portfolio" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$certFolder = "$PSScriptRoot\..\frontend\certificates"

# Liste des certificats attendus
$certificates = @{
    "1" = @{
        "name" = "DataCamp Professional Data Scientist"
        "file" = "datacamp-professional-data-scientist.pdf"
    }
    "2" = @{
        "name" = "Google Data Analytics"
        "file" = "google-data-analytics.pdf"
    }
    "3" = @{
        "name" = "AWS Machine Learning"
        "file" = "aws-machine-learning.pdf"
    }
    "4" = @{
        "name" = "IBM Python for Data Science"
        "file" = "ibm-python-data-science.pdf"
    }
    "5" = @{
        "name" = "HackerRank SQL Advanced"
        "file" = "hackerrank-sql-advanced.pdf"
    }
    "6" = @{
        "name" = "Tableau Desktop Specialist"
        "file" = "tableau-desktop-specialist.pdf"
    }
}

# Afficher le statut des certificats
Write-Host "Statut actuel des certificats:" -ForegroundColor Yellow
Write-Host ""

foreach ($key in $certificates.Keys | Sort-Object) {
    $cert = $certificates[$key]
    $filePath = Join-Path $certFolder $cert.file
    
    if (Test-Path $filePath) {
        Write-Host "  ✓ [$key] $($cert.name)" -ForegroundColor Green
    } else {
        Write-Host "  ✗ [$key] $($cert.name)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Options:" -ForegroundColor White
Write-Host "  1-6: Ajouter un certificat spécifique" -ForegroundColor Gray
Write-Host "  A:   Ajouter tous les certificats depuis un dossier" -ForegroundColor Gray
Write-Host "  Q:   Quitter" -ForegroundColor Gray
Write-Host ""

$choice = Read-Host "Votre choix"

if ($choice -eq "Q" -or $choice -eq "q") {
    Write-Host "Terminé." -ForegroundColor Yellow
    exit 0
}

if ($choice -eq "A" -or $choice -eq "a") {
    $sourceFolder = Read-Host "Entrez le chemin du dossier contenant vos certificats PDF"
    
    if (-not (Test-Path $sourceFolder)) {
        Write-Host "Erreur: Le dossier n'existe pas." -ForegroundColor Red
        exit 1
    }
    
    $pdfFiles = Get-ChildItem $sourceFolder -Filter "*.pdf"
    
    Write-Host ""
    Write-Host "PDFs trouvés:" -ForegroundColor Green
    for ($i = 0; $i -lt $pdfFiles.Count; $i++) {
        Write-Host "  [$i] $($pdfFiles[$i].Name)" -ForegroundColor White
    }
    
    Write-Host ""
    Write-Host "Associez chaque PDF à un certificat (entrez le numéro 1-6 ou S pour ignorer):" -ForegroundColor Yellow
    
    foreach ($pdf in $pdfFiles) {
        Write-Host ""
        Write-Host "Fichier: $($pdf.Name)" -ForegroundColor Cyan
        Write-Host "Certificats disponibles:" -ForegroundColor White
        foreach ($key in $certificates.Keys | Sort-Object) {
            Write-Host "  [$key] $($certificates[$key].name)" -ForegroundColor Gray
        }
        
        $certChoice = Read-Host "Associer à quel certificat? (1-6 ou S pour ignorer)"
        
        if ($certChoice -ne "S" -and $certChoice -ne "s" -and $certificates.ContainsKey($certChoice)) {
            $destFile = Join-Path $certFolder $certificates[$certChoice].file
            Copy-Item $pdf.FullName $destFile -Force
            Write-Host "  ✓ Copié vers $($certificates[$certChoice].file)" -ForegroundColor Green
        }
    }
    
} elseif ($certificates.ContainsKey($choice)) {
    $cert = $certificates[$choice]
    Write-Host ""
    Write-Host "Ajout du certificat: $($cert.name)" -ForegroundColor Cyan
    
    Add-Type -AssemblyName System.Windows.Forms
    $FileBrowser = New-Object System.Windows.Forms.OpenFileDialog -Property @{
        Filter = 'PDF Files (*.pdf)|*.pdf'
        Title = "Sélectionnez le certificat PDF: $($cert.name)"
    }
    
    if ($FileBrowser.ShowDialog() -eq 'OK') {
        $destFile = Join-Path $certFolder $cert.file
        Copy-Item $FileBrowser.FileName $destFile -Force
        Write-Host ""
        Write-Host "✓ Certificat ajouté avec succès!" -ForegroundColor Green
        Write-Host "  Fichier: $($cert.file)" -ForegroundColor White
    } else {
        Write-Host "Annulé." -ForegroundColor Yellow
    }
} else {
    Write-Host "Choix invalide." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Rafraîchissez votre navigateur (Ctrl+F5) pour voir les changements!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
