'use client'

import { useEffect } from 'react'

interface KeyboardShortcutsHandlerProps {
  status: 'idle' | 'running' | 'paused'
  onStartPause: () => void
  onReset: () => void
  onShowSettings: () => void
  onToggleKeyboardHelp: () => void
}

const useKeyboardShortcuts = ({
  status,
  onStartPause,
  onReset,
  onShowSettings,
  onToggleKeyboardHelp
}: KeyboardShortcutsHandlerProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignorer si on est dans un input
      if (e.target instanceof HTMLInputElement) return
      
      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault()
          onStartPause()
          break
        case 'r':
          if (status !== 'running') {
            onReset()
          }
          break
        case 's':
          onShowSettings()
          break
        case '?':
          onToggleKeyboardHelp()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [status, onStartPause, onReset, onShowSettings, onToggleKeyboardHelp])
}

export default useKeyboardShortcuts
