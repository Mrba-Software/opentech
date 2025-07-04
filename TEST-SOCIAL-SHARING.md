# Guide de Test - Partage sur Réseaux Sociaux

## ✅ Corrections apportées

### Problème résolu :
- **Avant :** `img/OPEN%20TECH%20(2).jpg` (espaces encodés)
- **Après :** `img/opentech-logo.jpg` (nom clean sans espaces)

### Fichiers mis à jour :
- ✅ index.html
- ✅ about.html  
- ✅ services.html
- ✅ programmes.html
- ✅ projects.html
- ✅ contact.html
- ✅ composants/nav-bar.html
- ✅ composants/meta-social.html

## 🧪 Comment tester

### 1. Test automatique
Utilisez ces outils pour valider vos métadonnées :

**Facebook Debugger :**
```
https://developers.facebook.com/tools/debug/
```
- Entrez : `https://opentech.netlify.app/about.html`
- Cliquez sur "Debug" 
- Vérifiez que l'image apparaît

**Twitter Card Validator :**
```
https://cards-dev.twitter.com/validator
```
- Entrez l'URL de votre page
- Vérifiez l'aperçu de la carte

**LinkedIn Post Inspector :**
```
https://www.linkedin.com/post-inspector/
```
- Testez vos URLs
- Vérifiez l'aperçu

### 2. Test manuel
1. **WhatsApp :** Envoyez votre lien dans une conversation
2. **Discord :** Collez le lien dans un channel
3. **Slack :** Partagez le lien dans un workspace

### 3. Forcer la mise à jour du cache
Si l'ancienne image apparaît encore :

**Facebook :**
- Dans le debugger, cliquez "Scrape Again"

**Twitter :**
- Attendez 1-2 heures ou changez légèrement l'URL

**LinkedIn :**
- Utilisez le Post Inspector pour forcer le refresh

## 🔍 Vérifications techniques

### URL de l'image corrigée :
```
https://opentech.netlify.app/img/opentech-logo.jpg
```

### Métadonnées clés :
```html
<!-- Open Graph -->
<meta property="og:image" content="https://opentech.netlify.app/img/opentech-logo.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- Twitter -->
<meta name="twitter:image" content="https://opentech.netlify.app/img/opentech-logo.jpg">
<meta name="twitter:card" content="summary_large_image">
```

## ⚠️ Points importants

1. **Délai de propagation :** Les changements peuvent prendre 1-24h pour être visibles
2. **Cache des plateformes :** Certaines gardent l'ancienne version en cache
3. **Taille de l'image :** Recommandé 1200x630px pour un rendu optimal
4. **Format :** JPG/PNG sont les plus compatibles

## 🚀 Résultat attendu

Vos liens afficheront maintenant :
- ✅ **Image :** Votre logo Opentech
- ✅ **Titre :** Le titre de la page
- ✅ **Description :** La description de la page
- ✅ **URL :** L'URL de votre site

## 📞 Si le problème persiste

1. Vérifiez que `img/opentech-logo.jpg` est accessible à : `https://opentech.netlify.app/img/opentech-logo.jpg`
2. Testez avec les outils de debug mentionnés
3. Attendez quelques heures pour la propagation du cache
