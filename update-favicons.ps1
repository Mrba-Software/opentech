# Script PowerShell pour mettre à jour les favicons dans tous les fichiers HTML
# Ce script remplace les anciennes références de favicon par le logo Opentech

$files = @(
    "programmes.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Mise à jour de $file..." -ForegroundColor Green
        
        # Lire le contenu du fichier
        $content = Get-Content $file -Raw
        
        # Remplacer les anciennes références de favicon
        $content = $content -replace 'favicon\.svg', 'OPEN TECH (2).jpg'
        $content = $content -replace 'favicon\.png', 'OPEN TECH (2).jpg'
        $content = $content -replace 'favicon\.ico', 'OPEN TECH (2).jpg'
        
        # Écrire le contenu mis à jour
        Set-Content -Path $file -Value $content -Encoding UTF8
        
        Write-Host "✓ $file mis à jour" -ForegroundColor Green
    } else {
        Write-Host "✗ $file non trouvé" -ForegroundColor Red
    }
}

Write-Host "`nMise à jour terminée!" -ForegroundColor Green
