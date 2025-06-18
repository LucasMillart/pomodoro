# 🎨 Design Minimaliste - Interface Pomofocus

Cette documentation décrit la nouvelle interface minimaliste inspirée de Pomofocus, implémentée dans le composant `SimpleTimer`.

## 🎯 Objectifs du Design

- **Simplicité maximale** : Interface épurée avec seulement l'essentiel
- **Focus sur le timer** : Timer géant au centre de l'écran
- **Couleurs thématiques** : Design qui s'adapte au mode actuel
- **Accessibilité** : Navigation clavier et interface intuitive

## 🎨 Palette de Couleurs

### Mode Pomodoro (Focus) 🔴
- **Fond** : Dégradé rouge `from-red-400 to-red-600`
- **Bouton actif** : `bg-white text-red-600`
- **Bouton en cours** : `bg-red-500 text-white`
- **Onglet actif** : `bg-white text-red-600`

### Mode Short Break 🟢
- **Fond** : Dégradé vert `from-green-400 to-green-600`
- **Bouton actif** : `bg-white text-green-600`
- **Bouton en cours** : `bg-green-500 text-white`
- **Onglet actif** : `bg-white text-green-600`

##  Structure de l'Interface

### Header
```
🍅 Pomofocus                    📊 Report  ⚙️ Setting  ⌨️
```

### Navigation (Onglets)
```
┌─────────────────────────────────────────┐
│      [Pomodoro] [Short Break]           │
└─────────────────────────────────────────┘
```

### Timer Principal
```
              25:00
              
             [START]
```

### Footer (Statistiques)
```
    42        2h 30m        125m
  Sessions   Focus Time    Credit
```

## 🔧 Composants Techniques

### SimpleTimer.tsx
- **État local** : Gestion des modals et de l'aide
- **Thèmes dynamiques** : `getThemeColors()` retourne les couleurs selon le mode
- **Raccourcis clavier** : Event listeners pour l'interaction clavier
- **Navigation fluide** : Changement de mode avec `switchToMode()`

### SettingsModal.tsx
- **Configuration complète** : Durées des timers et crédit par session
- **Interface simple** : Inputs numériques avec validation
- **Actions rapides** : Reset des paramètres et du crédit

### StatsModal.tsx
- **Vue d'ensemble** : Sessions, temps focus, crédit disponible/total
- **Cards colorées** : Chaque statistique a sa propre couleur
- **Calculs automatiques** : Conversion minutes → heures/minutes

### KeyboardShortcuts.tsx
- **Aide contextuelle** : Affichage des raccourcis disponibles
- **Design discret** : Tooltip en bas à droite, semi-transparent
- **Toggle simple** : Affichage/masquage avec `?`

## ⌨️ Raccourcis Clavier

| Touche | Action |
|--------|--------|
| `Espace` | Start/Pause timer |
| `R` | Reset timer (si arrêté) |
| `S` | Ouvrir les paramètres |
| `?` | Afficher/masquer l'aide |

## 📐 Responsive Design

### Mobile (< 768px)
- **Timer** : `text-8xl` (grande taille)
- **Boutons** : Taille optimisée pour le tactile
- **Header** : Navigation simplifiée
- **Modals** : Plein écran avec padding réduit

### Desktop (≥ 768px)
- **Timer** : `text-9xl` (très grande taille)
- **Layout** : Centrage parfait avec flexbox
- **Modals** : Taille fixe avec backdrop
- **Aide** : Positionnement fixe en bas à droite

## 🎭 Animations et Transitions

### Boutons
```css
transition-all duration-200 transform hover:scale-105
shadow-lg hover:shadow-xl
```

### Onglets
```css
transition-all /* Changement fluide de couleur */
hover:bg-white/10 /* Effet de survol subtil */
```

### Timer
```css
font-mono tracking-tight /* Espacement uniforme */
text-white /* Couleur fixe pour la lisibilité */
```

## 🔄 États de l'Interface

### Idle (Timer arrêté)
- **Bouton** : "START" avec couleur du thème
- **Onglets** : Cliquables pour changer de mode
- **Reset** : Possible avec `R`

### Running (Timer en cours)
- **Bouton** : "PAUSE" avec couleur du mode
- **Onglets** : Désactivés (grisés)
- **Navigation** : Bloquée jusqu'à la pause

### Paused (Timer en pause)
- **Bouton** : "START" pour reprendre
- **État** : Identique à Idle
- **Temps** : Affiché tel quel (pas de reset)

## 💡 Optimisations UX

### Feedback Visuel
- **Hover effects** : Tous les éléments interactifs
- **Active states** : Onglet et bouton actuel bien visibles
- **Disabled states** : Éléments non-cliquables grisés

### Information Contextuelle
- **Crédit disponible** : Affiché en permanence
- **Aide en temps réel** : Messages selon le contexte
- **Progress feedback** : Session en cours indiquée

### Accessibilité
- **Contraste élevé** : Blanc sur couleurs vives
- **Zones de clic larges** : Boutons et onglets généreux
- **Navigation clavier** : Support complet
- **Labels descriptifs** : Pour les lecteurs d'écran

## 🚀 Performance

### Optimisations React
- **useCallback** : Fonctions d'event optimisées
- **État local minimal** : Seulement les modals et aide
- **Re-renders contrôlés** : Zustand optimise automatiquement

### CSS Optimisé
- **Tailwind** : Classes utilitaires, pas de CSS custom
- **Transitions légères** : Pas d'animations lourdes
- **Responsive natif** : Breakpoints Tailwind standards

### Bundle Size
- **Composants modulaires** : Import seulement du nécessaire
- **Tree-shaking** : Bundles optimisés automatiquement
- **Lazy loading** : Modals chargés à la demande

---

**Design inspiré de [Pomofocus](https://pomofocus.io/) avec des améliorations pour notre système de crédit unique.**
