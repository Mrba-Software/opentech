# Script PowerShell pour mettre à jour les URLs des images dans les métadonnées Open Graph
# Remplace les références à "OPEN%20TECH%20(2).jpg" par "opentech-logo.jpg"

$files = @(
    "index.html",
    "about.html", 
    "services.html",
    "programmes.html",
    "projects.html",
    "contact.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Mise à jour de $file..." -ForegroundColor Green
        
        # Lire le contenu du fichier
        $content = Get-Content $file -Raw
        
        # Remplacer les URLs d'images dans les métadonnées Open Graph et Twitter
        $content = $content -replace 'img/OPEN%20TECH%20\(2\)\.jpg', 'img/opentech-logo.jpg'
        $content = $content -replace 'img/OPEN TECH \(2\)\.jpg', 'img/opentech-logo.jpg'
        
        # Écrire le contenu mis à jour
        Set-Content -Path $file -Value $content -Encoding UTF8
        
        Write-Host "✓ $file mis à jour" -ForegroundColor Green
    } else {
        Write-Host "✗ $file non trouvé" -ForegroundColor Red
    }
}

Write-Host "`nMise à jour terminée!" -ForegroundColor Green
Write-Host "Les images devraient maintenant s'afficher correctement lors du partage." -ForegroundColor Yellow
