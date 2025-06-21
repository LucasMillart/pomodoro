import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createSession, completeSession } from '../utils/sessionUtils'

// Types pour le timer Pomodoro
export type TimerMode = 'focus' | 'shortBreak'
export type TimerStatus = 'idle' | 'running' | 'paused'

interface PomodoroSettings {
  focusDuration: number // en minutes
  shortBreakDuration: number // en minutes
}

interface PomodoroState {
  // État du timer
  timeLeft: number // en secondes
  currentMode: TimerMode
  status: TimerStatus
  sessionsCompleted: number // sessions focus complétées
  currentSessionId: string | null // ID de la session en cours dans Supabase
  
  // Configuration
  settings: PomodoroSettings
  
  // Actions
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  skipSession: () => void
  updateSettings: (newSettings: Partial<PomodoroSettings>) => void
  
  // Actions pour changer de mode manuellement
  switchToMode: (mode: TimerMode) => void
  
  // Timer interne
  intervalId: NodeJS.Timeout | null
  tick: () => void
  switchToNextMode: () => void
}

// Configuration par défaut
const defaultSettings: PomodoroSettings = {
  focusDuration: 30, // 30 minutes par défaut
  shortBreakDuration: 5,
}

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set, get) => ({
      // État initial
      timeLeft: defaultSettings.focusDuration * 60,
      currentMode: 'focus',
      status: 'idle',
      sessionsCompleted: 0,
      currentSessionId: null,
      settings: defaultSettings,
      intervalId: null,

      // Démarrer le timer
      startTimer: () => {
        const { intervalId, status } = get()
        
        if (status === 'running') return
        
        // Nettoyer l'ancien interval si il existe
        if (intervalId) {
          clearInterval(intervalId)
        }
        
        // Créer un nouveau timer
        const newIntervalId = setInterval(() => {
          get().tick()
        }, 1000)
        
        set({
          status: 'running',
          intervalId: newIntervalId,
        })
      },

      // Mettre en pause le timer
      pauseTimer: () => {
        const { intervalId } = get()
        
        if (intervalId) {
          clearInterval(intervalId)
        }
        
        set({
          status: 'paused',
          intervalId: null,
        })
      },

      // Réinitialiser le timer
      resetTimer: () => {
        const { intervalId, settings, currentMode } = get()
        
        if (intervalId) {
          clearInterval(intervalId)
        }
        
        const duration = currentMode === 'focus' 
          ? settings.focusDuration
          : settings.shortBreakDuration
        
        set({
          timeLeft: duration * 60,
          status: 'idle',
          intervalId: null,
        })
      },

      // Passer à la session suivante
      skipSession: () => {
        const { intervalId } = get()
        
        if (intervalId) {
          clearInterval(intervalId)
        }
        
        get().switchToNextMode()
        
        set({
          status: 'idle',
          intervalId: null,
        })
      },

      // Mettre à jour les paramètres
      updateSettings: (newSettings) => {
        const { settings, currentMode, status } = get()
        const updatedSettings = { ...settings, ...newSettings }
        
        // Si le timer n'est pas en cours, mettre à jour le temps restant
        if (status === 'idle') {
          const duration = currentMode === 'focus' 
            ? updatedSettings.focusDuration
            : updatedSettings.shortBreakDuration
            
          set({
            settings: updatedSettings,
            timeLeft: duration * 60,
          })
        } else {
          set({ settings: updatedSettings })
        }
      },

      // Changer de mode manuellement (seulement si le timer n'est pas en cours)
      switchToMode: (mode) => {
        const { status, intervalId, settings } = get()
        
        // Ne permet le changement de mode que si le timer est arrêté
        if (status === 'running') return
        
        // Nettoyer l'interval si il existe
        if (intervalId) {
          clearInterval(intervalId)
        }
        
        // Calculer la durée pour le nouveau mode
        const duration = mode === 'focus' 
          ? settings.focusDuration
          : settings.shortBreakDuration
        
        set({
          currentMode: mode,
          timeLeft: duration * 60,
          status: 'idle',
          intervalId: null,
        })
      },

      // Fonction tick du timer (appelée chaque seconde)
      tick: () => {
        const { timeLeft } = get()
        
        if (timeLeft <= 1) {
          // Fin du timer, passer au mode suivant
          get().switchToNextMode()
        } else {
          set({ timeLeft: timeLeft - 1 })
        }
      },

      // Logique pour passer au mode suivant
      switchToNextMode: () => {
        const { 
          currentMode, 
          sessionsCompleted,
          settings,
          intervalId
        } = get()
        
        // Nettoyer l'interval
        if (intervalId) {
          clearInterval(intervalId)
        }
          let nextMode: TimerMode
        let newSessionsCompleted = sessionsCompleted
        
        if (currentMode === 'focus') {
          // Fin d'une session de focus
          newSessionsCompleted = sessionsCompleted + 1
          
          // Compléter la session dans Supabase si c'est une session focus
          const { currentSessionId } = get()
          if (currentSessionId) {
            // Calculer la durée effective (en secondes)
            const actualDuration = settings.focusDuration * 60
            
            completeSession(currentSessionId, actualDuration)
              .catch(err => console.error('Error completing session:', err))
          }
          
          // Aller en pause courte après une session focus
          nextMode = 'shortBreak'
        } else {
          // Fin d'une pause courte, retour au focus
          nextMode = 'focus'
        }
        
        // Calculer le nouveau temps
        const duration = nextMode === 'focus' 
          ? settings.focusDuration
          : settings.shortBreakDuration
          // Créer une nouvelle session dans Supabase
        createSession(nextMode).then(session => {
          if (session) {
            set({
              currentSessionId: session.id
            })
          }
        })
        
        set({
          currentMode: nextMode,
          timeLeft: duration * 60,
          status: 'idle',
          sessionsCompleted: newSessionsCompleted,
          intervalId: null,
        })
      },
    }),
    {
      name: 'pomodoro-store',
      // Sauvegarder seulement certaines valeurs (pas l'intervalId)
      partialize: (state) => ({
        sessionsCompleted: state.sessionsCompleted,
        settings: state.settings,
      }),
    }
  )
)
