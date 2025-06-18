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
    longBreakCredit,
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
          e.preventDefault()
          resetTimer()
          break
        case 's':
          e.preventDefault()
          setShowSettings(!showSettings)
          break
        case 't':
          e.preventDefault()
          setShowStats(!showStats)
          break
        case '?':
          e.preventDefault()
          setShowKeyboardHelp(!showKeyboardHelp)
          break
        case '1':
          e.preventDefault()
          if (status === 'idle') switchToMode('focus')
          break
        case '2':
          e.preventDefault()
          if (status === 'idle') switchToMode('shortBreak')
          break
        case '3':
          e.preventDefault()
          if (status === 'idle' && longBreakCredit.availableMinutes > 0) {
            switchToMode('longBreak')
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [status, showSettings, showStats, showKeyboardHelp, startTimer, pauseTimer, resetTimer, switchToMode, longBreakCredit.availableMinutes])

  // Fonction pour obtenir les couleurs du thème selon le mode
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
      case 'longBreak':
        return {
          bg: 'from-blue-400 to-blue-600',
          button: 'bg-white text-blue-600 hover:bg-blue-50',
          buttonActive: 'bg-blue-500 text-white hover:bg-blue-600',
          tab: 'bg-blue-500/20',
          tabActive: 'bg-white text-blue-600'
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
  const handleTabClick = (mode: 'focus' | 'shortBreak' | 'longBreak') => {
    if (status !== 'idle') return
    if (mode === 'longBreak' && longBreakCredit.availableMinutes === 0) return
    switchToMode(mode)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} flex flex-col`}>
      {/* Header simple */}
      <header className="flex justify-between items-center p-6 text-white">
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
      </header>

      {/* Contenu principal centré */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
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
            <button 
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                currentMode === 'longBreak' 
                  ? colors.tabActive
                  : longBreakCredit.availableMinutes === 0
                  ? 'text-white/30 cursor-not-allowed'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => handleTabClick('longBreak')}
              disabled={status === 'running' || longBreakCredit.availableMinutes === 0}
            >
              Long Break
            </button>
          </div>

          {/* Timer principal */}
          <div className="text-center mb-8">
            <div className="text-8xl md:text-9xl font-bold text-white mb-6 font-mono tracking-tight">
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
        </div>
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
              {Math.floor((sessionsCompleted * settings.focusDuration) / 60)}h{' '}
              {(sessionsCompleted * settings.focusDuration) % 60}m
            </div>
            <div>Focus Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{longBreakCredit.availableMinutes}m</div>
            <div>Credit</div>
          </div>
        </div>
        
        {/* Info contextuelle */}
        {longBreakCredit.availableMinutes > 0 && currentMode !== 'longBreak' && (
          <div className="text-center mt-4 text-white/60 text-xs">
            💡 You have {longBreakCredit.availableMinutes} minutes of long break credit available
          </div>
        )}
        
        {/* Message pendant la pause longue */}
        {currentMode === 'longBreak' && (
          <div className="text-center mt-4 text-white text-sm bg-white/20 rounded-lg px-4 py-2">
            🎉 Enjoying your long break! {longBreakCredit.availableMinutes} minutes remaining
          </div>
        )}
      </footer>

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
