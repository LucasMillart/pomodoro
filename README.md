# 🍅 Pomodoro Timer App

Une application moderne de gestion du temps basée sur la technique Pomodoro avec un système innovant de crédit pour les pauses longues.

## ✨ Fonctionnalités

### Timer Pomodoro Personnalisé
- **Sessions de focus** : 30 minutes par défaut (configurable)
- **Pauses courtes** : 5 minutes par défaut
- **Système de crédit** : Gagnez du crédit pour les pauses longues
- **Contrôles** : Start, Pause, Reset, Skip
- **Indicateur visuel** : Barre de progression avec couleurs selon le mode

### Système Innovant de Crédit pour Pauses Longues 🏦
- **Gagner du crédit** : 25 minutes de crédit par session focus complétée
- **Utiliser à la demande** : Démarrez une pause longue quand vous le souhaitez
- **Pauses flexibles** : Choisissez la durée selon vos besoins et votre crédit
- **Pauses prédéfinies** : Pause café (15min), Déjeuner (30min), Pause complète (50min)
- **Gestion du crédit** : Visualisation du crédit total, utilisé et disponible

### Interface Utilisateur
- **Design moderne** avec Tailwind CSS et DaisyUI
- **Responsive** : fonctionne sur mobile, tablette et desktop
- **Thèmes** : Support des thèmes clairs et sombres
- **Animations fluides** avec des transitions CSS

### Gestion d'État Avancée
- **Zustand** pour la gestion d'état global
- **Persistance** des données (sessions complétées, configuration)
- **État synchronisé** entre tous les composants

### Notifications et Audio
- **Notifications navigateur** en fin de session
- **Sons personnalisés** avec Web Audio API
- **Alertes visuelles** avec des toasts DaisyUI
- **Son d'avertissement** à 60 secondes de la fin

### Raccourcis Clavier
- **Espace** : Démarrer/Pause
- **Ctrl + R** : Reset
- **Ctrl + S** : Passer la session
- **Échap** : Pause rapide

### Statistiques et Motivation
- **Compteur de sessions** complétées
- **Temps de focus** total
- **Messages de motivation** contextuels
- **Citations inspirantes** basées sur les performances
- **Objectifs** et jalons de progression

## 🛠️ Stack Technique

### Frontend
- **Next.js 15** avec App Router
- **TypeScript** pour la sécurité de type
- **React 19** avec hooks avancés
- **Tailwind CSS** pour le styling
- **DaisyUI** pour les composants UI

### État et Data
- **Zustand** pour la gestion d'état
- **LocalStorage** pour la persistance
- **date-fns** pour les manipulations de date

### Audio et Notifications
- **Web Audio API** pour les sons personnalisés
- **Notification API** pour les alertes navigateur
- **CSS animations** pour les feedbacks visuels

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le repo
git clone [url-du-repo]
cd pomodoro

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

### Build de Production
```bash
# Créer le build de production
npm run build

# Démarrer en mode production
npm start
```

## 📁 Structure du Projet

```
app/
├── components/           # Composants React
│   ├── PomodoroTimer.tsx        # Timer principal
│   ├── PomodoroStats.tsx        # Statistiques
│   ├── PomodoroNotifications.tsx # Notifications
│   ├── PomodoroMotivation.tsx   # Messages motivants
│   ├── PomodoroKeyboardShortcuts.tsx # Raccourcis
│   └── PomodoroTips.tsx         # Conseils et astuces
├── stores/               # Gestion d'état Zustand
│   └── pomodoroStore.ts         # Store principal
├── hooks/                # Hooks personnalisés
│   └── usePomodoroTimer.ts      # Hook principal du timer
├── utils/                # Utilitaires
│   └── timeUtils.ts             # Gestion du temps
├── globals.css           # Styles globaux
├── layout.tsx           # Layout principal
└── page.tsx            # Page d'accueil
```

## ⚙️ Configuration

### Paramètres du Timer
- **Durée focus** : 1-120 minutes (défaut : 30 min)
- **Pause courte** : 1-30 minutes (défaut : 5 min)  
- **Pause longue** : 1-120 minutes (défaut : 50 min)
- **Crédit par session** : 5-60 minutes (défaut : 25 min)

### Personnalisation
Les paramètres sont sauvegardés automatiquement et persistent entre les sessions.

## 🎯 Logique du Système de Crédit

### Nouveau Cycle Pomodoro
1. **Session Focus** : 30 min → Gagne 25 min de crédit → **Pause courte** (5 min)
2. **Session Focus** : 30 min → Gagne 25 min de crédit → **Pause courte** (5 min)
3. **Utilisation du crédit** : Quand vous le souhaitez, utilisez votre crédit accumulé pour une pause longue

### Avantages du Système
- **Flexibilité** : Vous décidez quand prendre vos pauses longues
- **Motivation** : Accumulez du crédit en étant productif
- **Équilibre** : Empêche les pauses excessives tout en récompensant le travail
- **Personnalisation** : Ajustez le crédit gagné par session selon vos besoins

## 🔮 Fonctionnalités Futures (Roadmap)

### Phase 2 - Authentification et Base de Données
- [ ] Authentification avec Supabase (email/password)
- [ ] Sauvegarde des sessions en base de données
- [ ] Profils utilisateur personnalisés

### Phase 3 - Dashboard et Analytics  
- [ ] Dashboard avec graphiques (Recharts)
- [ ] Statistiques journalières, hebdomadaires, mensuelles
- [ ] Analyse des tendances de productivité

### Phase 4 - Calendrier et Heatmap
- [ ] Calendrier avec heatmap (style GitHub contributions)
- [ ] Visualisation des temps de focus par jour
- [ ] Historique des sessions sur plusieurs mois

### Phase 5 - Fonctionnalités Avancées
- [ ] Gestion des tâches/projets
- [ ] Export des données (CSV, PDF)
- [ ] Intégration avec calendriers externes
- [ ] Mode focus strict (blocage distractions)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

Créé avec ❤️ en utilisant Next.js, TypeScript et les meilleures pratiques React.

---

**Astuce** : Utilisez les raccourcis clavier pour une expérience optimale ! Appuyez sur Espace pour démarrer/pause votre session.
