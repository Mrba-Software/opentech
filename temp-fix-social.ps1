# Script de solution temporaire - Utilise l'image existante avec URL correcte

$files = @(
    "index.html",
    "about.html", 
    "services.html",
    "programmes.html",
    "projects.html",
    "contact.html"
)

# URL correctement encodée pour l'image existante
$oldUrl = 'img/opentech-logo.jpg'
$newUrl = 'img/OPEN%20TECH%20%282%29.jpg'

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Mise à jour temporaire de $file..." -ForegroundColor Yellow
        
        # Lire le contenu du fichier
        $content = Get-Content $file -Raw
        
        # Remplacer temporairement par l'URL encodée correctement
        $content = $content -replace [regex]::Escape($oldUrl), $newUrl
        
        # Écrire le contenu mis à jour
        Set-Content -Path $file -Value $content -Encoding UTF8
        
        Write-Host "✓ $file mis à jour (temporaire)" -ForegroundColor Green
    }
}

Write-Host "`nSolution temporaire appliquée!" -ForegroundColor Green
Write-Host "L'image devrait maintenant s'afficher lors du partage." -ForegroundColor Yellow
Write-Host "`nActions recommandées :" -ForegroundColor Cyan
Write-Host "1. Déployez votre site sur Netlify avec la nouvelle image 'opentech-logo.jpg'" -ForegroundColor White
Write-Host "2. Puis exécutez à nouveau 'fix-social-images.ps1' pour revenir au nom propre" -ForegroundColor White
