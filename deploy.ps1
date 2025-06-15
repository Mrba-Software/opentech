# Vérifier si Netlify CLI est installé
if (-not (Get-Command netlify -ErrorAction SilentlyContinue)) {
    Write-Host "Installation de Netlify CLI..."
    npm install -g netlify-cli
}

# Vérifier si l'utilisateur est connecté à Netlify
$netlifyStatus = netlify status 2>&1
if ($netlifyStatus -match "You are not logged in") {
    Write-Host "Connexion à Netlify..."
    netlify login
}

# Déployer le site
Write-Host "Déploiement du site..."
netlify deploy --prod

Write-Host "Déploiement terminé !" 