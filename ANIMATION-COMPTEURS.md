# Animation des Compteurs - Opentech Website

## Vue d'ensemble

Le système d'animation des compteurs a été intégré dans toutes les pages du site Opentech pour créer des effets visuels attrayants lorsque les statistiques deviennent visibles à l'écran.

## Fonctionnalités

### Types de Compteurs Supportés

1. **Compteurs avec signe plus** : `50+`, `100+`, `5+`
2. **Pourcentages** : `95%`, `200%`
3. **Millions** : `3M+`
4. **Formats 24/7** : `24/7` (affichage direct)
5. **Nombres simples** : `3`, `5`, `24`

### Classes CSS Utilisées

- `.counter-number` : Classe générique pour tous les compteurs
- `[data-counter]` : Attribut data pour identifier les compteurs
- `.text-3xl.font-bold.text-yellow-400` : Sélecteur spécifique pour programmes.html
- `.stat-number` : Classe alternative pour les statistiques

## Utilisation

### Méthode Recommandée

Pour ajouter un compteur animé, utilisez la structure suivante :

```html
<div class="counter-number" data-counter>50+</div>
```

### Exemples d'Implémentation

#### Compteurs Basiques
```html
<div class="text-center">
  <div class="text-3xl font-bold text-primary-600 mb-2 counter-number" data-counter>50+</div>
  <div class="text-gray-600">Projets Réalisés</div>
</div>
```

#### Compteurs dans des Cercles
```html
<div class="text-center">
  <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 counter-number" data-counter>
    100+
  </div>
  <div class="font-bold text-lg text-gray-900">Projets</div>
</div>
```

#### Style Programmes (avec classes spécifiques)
```html
<div class="text-center">
  <div class="text-3xl font-bold text-yellow-400 mb-2">100+</div>
  <div class="text-white/80 text-sm">Bénéficiaires visés</div>
</div>
```

## Configuration

### Paramètres d'Animation

- **Durée** : 2 secondes (2000ms)
- **Déclenchement** : Quand 50% de l'élément est visible
- **Fréquence de mise à jour** : Toutes les 30ms

### Seuil de Visibilité

L'animation se déclenche quand l'élément devient visible à 50% (`threshold: 0.5`) dans la fenêtre du navigateur.

## Pages Intégrées

### ✅ Pages avec Compteurs Animés

1. **index.html**
   - Section Hero : 4 compteurs (50+, 100+, 200%, 5+)
   - Section Impact : 4 compteurs (50+, 100+, 200%, 95%)
   - Section Partenaires : 4 compteurs dans des cercles

2. **about.html**
   - Section Stats : 4 compteurs (5+, 50+, 100+, 24)

3. **projects.html**
   - Section Hero : 4 compteurs (50+, 95%, 3M+, 24)

4. **programmes.html**
   - Section Hero : 3 compteurs (3, 100+, 5)

5. **services.html**
   - Pas de compteurs statistiques spécifiques

6. **contact.html**
   - Pas de compteurs statistiques spécifiques

## Test et Débogage

### Page de Test

Une page de test complète est disponible : `test-counters.html`

Cette page teste tous les formats de compteurs :
- Compteurs basiques
- Formats spéciaux (M+, %, 24/7)
- Style programmes
- Compteurs dans des cercles

### Vérification du Fonctionnement

1. Ouvrir la page de test
2. Faire défiler pour voir les animations se déclencher
3. Utiliser le bouton "Relancer les animations" pour retester

## Architecture Technique

### Classe CounterAnimation

```javascript
class CounterAnimation {
  constructor() {
    this.init();
  }

  init() {
    this.animateCounters();
  }

  animateCounters() {
    // Configuration de l'IntersectionObserver
    // Recherche et observation des compteurs
  }

  startCounterAnimation(counter) {
    // Logique d'animation spécifique à chaque format
  }
}
```

### Intégration

La classe est automatiquement initialisée dans `modern.js` :

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // ...autres initialisations...
  new CounterAnimation();
  // ...
});
```

## Maintenance

### Ajouter de Nouveaux Formats

Pour supporter de nouveaux formats de compteurs, modifier la méthode `startCounterAnimation()` dans `modern.js`.

### Ajouter de Nouveaux Sélecteurs

Ajouter de nouveaux sélecteurs dans le tableau `counterSelectors` de la méthode `animateCounters()`.

### Modification des Paramètres

Les paramètres d'animation (durée, seuil, fréquence) peuvent être ajustés dans les constantes de la classe `CounterAnimation`.

## Bonnes Pratiques

1. **Toujours utiliser** `data-counter` ou `.counter-number` pour les nouveaux compteurs
2. **Tester** sur différentes tailles d'écran
3. **Vérifier** que l'animation ne se déclenche qu'une fois par élément
4. **S'assurer** que les compteurs contiennent des nombres valides

## Compatibilité

- ✅ Tous les navigateurs modernes
- ✅ Support des animations CSS
- ✅ IntersectionObserver API
- ✅ Responsive design

---

**Dernière mise à jour** : 3 juillet 2025
**Version** : 2.0
**Auteur** : Opentech Development Team
