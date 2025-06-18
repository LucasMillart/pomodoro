'use client'

import { useEffect, useState } from 'react'
import { usePomodoroStore } from '../stores/pomodoroStore'
import { formatTime } from '../utils/timeUtils'
import SettingsModal from './SettingsModal'
import StatsModal from './StatsModal'
import KeyboardShortcuts from './KeyboardShortcuts'
import ToastNotifications from './ToastNotifications'

const SimpleTimer = () => {
  const [showSettings, setShowSettings] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false)
    const {
    timeLeft,
    currentMode,
    status,
    sessionsCompleted,
    settings,
    startTimer,
    pauseTimer,
    resetTimer,
    switchToMode,
  } = usePomodoroStore()

  // Nettoyer l'interval lors du démontage du composant
  useEffect(() => {
    return () => {
      const { intervalId } = usePomodoroStore.getState()
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [])

  // Gestion des raccourcis clavier
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignorer si on est dans un input
      if (e.target instanceof HTMLInputElement) return
      
      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault()
          if (status === 'running') {
            pauseTimer()
          } else {
            startTimer()
          }
          break
        case 'r':
          if (status !== 'running') {
            resetTimer()
          }
          break
        case 's':
          setShowSettings(true)
          break
        case '?':
          setShowKeyboardHelp(!showKeyboardHelp)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [status, startTimer, pauseTimer, resetTimer, showKeyboardHelp])

  // Obtenir la couleur du thème selon le mode  // Couleurs du thème basées sur le mode actuel
  const getThemeColors = () => {
    switch (currentMode) {
      case 'focus':
        return {
          bg: 'from-red-400 to-red-600',
          button: 'bg-white text-red-600 hover:bg-red-50',
          buttonActive: 'bg-red-500 text-white hover:bg-red-600',
          tab: 'bg-red-500/20',
          tabActive: 'bg-white text-red-600'
        }
      case 'shortBreak':
        return {
          bg: 'from-green-400 to-green-600',
          button: 'bg-white text-green-600 hover:bg-green-50',
          buttonActive: 'bg-green-500 text-white hover:bg-green-600',
          tab: 'bg-green-500/20',
          tabActive: 'bg-white text-green-600'
        }
      default:
        return {
          bg: 'from-red-400 to-red-600',
          button: 'bg-white text-red-600 hover:bg-red-50',
          buttonActive: 'bg-red-500 text-white hover:bg-red-600',
          tab: 'bg-red-500/20',
          tabActive: 'bg-white text-red-600'
        }
    }
  }

  const colors = getThemeColors()

  // Gérer le changement d'onglet
  const handleTabClick = (mode: 'focus' | 'shortBreak') => {
    if (status !== 'idle') return
    switchToMode(mode)
  }
  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} flex flex-col`}>
      <div className="max-w-6xl mx-auto w-full flex flex-col min-h-screen">
        {/* Header simple */}
        <header className="flex justify-between items-center p-4 lg:p-2 lg:px-6 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-lg">🍅</span>
          </div>
          <h1 className="text-xl font-bold">Pomofocus</h1>
        </div>
        <div className="flex gap-3">
          <button 
            className="text-white/80 hover:text-white text-sm font-medium"
            onClick={() => setShowStats(true)}
          >
            📊 Report
          </button>
          <button 
            className="text-white/80 hover:text-white text-sm font-medium"
            onClick={() => setShowSettings(true)}
          >
            ⚙️ Setting
          </button>
          <button 
            className="text-white/80 hover:text-white text-sm font-medium"
            onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
            title="Keyboard shortcuts (?)"
          >
            ⌨️
          </button>
        </div>
      </header>      {/* Contenu principal centré */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="card bg-white/10 backdrop-blur-sm w-full max-w-md">
          <div className="card-body p-8">
            {/* Onglets de mode */}
            <div className="flex bg-white/20 rounded-lg p-1 mb-12">
              <button 
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                  currentMode === 'focus' 
                    ? colors.tabActive
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => handleTabClick('focus')}
                disabled={status === 'running'}
              >
                Pomodoro
              </button>            
              <button 
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                  currentMode === 'shortBreak' 
                    ? colors.tabActive
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => handleTabClick('shortBreak')}
                disabled={status === 'running'}
              >
                Short Break
              </button>
            </div>

            {/* Timer principal */}
            <div className="text-center mb-8">
              <div className="text-7xl md:text-8xl font-bold text-white mb-6 font-mono tracking-tight">
                {formatTime(timeLeft)}
              </div>
              
              {/* Bouton principal */}
              <button 
                className={`
                  px-12 py-4 rounded-lg text-xl font-bold uppercase tracking-wide
                  transition-all duration-200 transform hover:scale-105
                  shadow-lg hover:shadow-xl
                  ${status === 'running' ? colors.buttonActive : colors.button}
                `}
                onClick={status === 'running' ? pauseTimer : startTimer}
              >
                {status === 'running' ? 'PAUSE' : 'START'}
              </button>
            </div>
          </div>        </div>
      </main>

        {/* Footer avec statistiques */}
        <footer className="p-6">
          <div className="flex justify-center items-center gap-8 text-white/80 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{sessionsCompleted}</div>
              <div>Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {Math.floor((sessionsCompleted * settings.focusDuration) / 60)}h{' '}              {(sessionsCompleted * settings.focusDuration) % 60}m
              </div>
              <div>Focus Time</div>
            </div>
          </div>        </footer>
      </div>

      {/* Modals */}
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
      <StatsModal 
        isOpen={showStats} 
        onClose={() => setShowStats(false)} 
      />

      {/* Keyboard Shortcuts */}
      <KeyboardShortcuts isVisible={showKeyboardHelp} />
        {/* Toast Notifications */}
      <ToastNotifications />
    </div>
  )
}

export default SimpleTimer
