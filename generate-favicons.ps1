# Script PowerShell pour générer les favicons à partir du logo
# Nécessite ImageMagick installé sur le système

param(
    [string]$InputImage = "img/OPEN TECH (2).jpg",
    [string]$OutputDir = "img/favicons"
)

# Créer le dossier de sortie s'il n'existe pas
if (!(Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force
}

Write-Host "Génération des favicons à partir de $InputImage..." -ForegroundColor Green

# Vérifier si ImageMagick est installé
try {
    $magickVersion = magick -version 2>$null
    Write-Host "ImageMagick détecté" -ForegroundColor Green
} catch {
    Write-Host "ImageMagick n'est pas installé. Veuillez l'installer depuis https://imagemagick.org/" -ForegroundColor Red
    Write-Host "Ou utilisez un service en ligne comme https://favicon.io/" -ForegroundColor Yellow
    exit 1
}

# Générer les différentes tailles de favicon
$sizes = @(16, 32, 48, 64, 128, 256)

foreach ($size in $sizes) {
    $outputFile = "$OutputDir/favicon-${size}x${size}.png"
    Write-Host "Génération de favicon ${size}x${size}..." -ForegroundColor Cyan
    
    # Commande ImageMagick pour redimensionner et optimiser
    magick "$InputImage" -resize ${size}x${size} -background white -gravity center -extent ${size}x${size} "$outputFile"
    
    if (Test-Path $outputFile) {
        Write-Host "✓ Généré: $outputFile" -ForegroundColor Green
    } else {
        Write-Host "✗ Erreur lors de la génération de $outputFile" -ForegroundColor Red
    }
}

# Générer le favicon.ico (multi-tailles)
Write-Host "Génération du favicon.ico..." -ForegroundColor Cyan
magick "$InputImage" -resize 16x16 -background white -gravity center -extent 16x16 `
       "$InputImage" -resize 32x32 -background white -gravity center -extent 32x32 `
       "$InputImage" -resize 48x48 -background white -gravity center -extent 48x48 `
       "$OutputDir/favicon.ico"

if (Test-Path "$OutputDir/favicon.ico") {
    Write-Host "✓ Généré: favicon.ico" -ForegroundColor Green
} else {
    Write-Host "✗ Erreur lors de la génération du favicon.ico" -ForegroundColor Red
}

# Générer le favicon.svg (optionnel, pour les navigateurs modernes)
Write-Host "Génération du favicon.svg..." -ForegroundColor Cyan
magick "$InputImage" -resize 64x64 -background white -gravity center -extent 64x64 "$OutputDir/favicon.svg"

Write-Host "`nFavicons générés dans le dossier: $OutputDir" -ForegroundColor Green
Write-Host "Copiez les fichiers suivants dans votre dossier img/:" -ForegroundColor Yellow
Write-Host "- favicon.ico" -ForegroundColor White
Write-Host "- favicon-16x16.png" -ForegroundColor White
Write-Host "- favicon-32x32.png" -ForegroundColor White
Write-Host "- favicon.svg (optionnel)" -ForegroundColor White
