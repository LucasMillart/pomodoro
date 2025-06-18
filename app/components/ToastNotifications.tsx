'use client'

import { useEffect, useState } from 'react'
import { usePomodoroStore } from '../stores/pomodoroStore'

interface Toast {
  id: string
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
  duration?: number
}

const ToastNotifications = () => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const { currentMode, status, sessionsCompleted } = usePomodoroStore()

  // Surveiller les changements d'état pour afficher des notifications
  useEffect(() => {
    const addToast = (toast: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).substr(2, 9)
      const newToast = { ...toast, id }
      
      setToasts(prev => [...prev, newToast])
      
      // Auto-remove après la durée spécifiée
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, toast.duration || 3000)
    }    // Notification lors du démarrage d'une session
    if (status === 'running') {
      let message = ''
      switch (currentMode) {
        case 'focus':
          message = '🍅 Focus session started! Time to be productive.'
          break
        case 'shortBreak':
          message = '☕ Short break time! Relax for a moment.'
          break
      }
      
      if (message) {
        addToast({
          message,
          type: 'info',
          duration: 2000
        })
      }
    }
  }, [status, currentMode])

  // Notification à la fin d'une session focus
  useEffect(() => {
    if (sessionsCompleted > 0) {
      const previousSessions = JSON.parse(localStorage.getItem('pomodoro-store') || '{}')?.state?.sessionsCompleted || 0
      
      if (sessionsCompleted > previousSessions) {
        addToast({
          message: `🎉 Session ${sessionsCompleted} completed! +25min credit earned.`,
          type: 'success',
          duration: 4000
        })
      }
    }
  }, [sessionsCompleted])

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }
    
    setToasts(prev => [...prev, newToast])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, toast.duration || 3000)
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const getToastColors = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'warning':
        return 'bg-yellow-500 text-white'
      case 'error':
        return 'bg-red-500 text-white'
      default:
        return 'bg-blue-500 text-white'
    }
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            ${getToastColors(toast.type)}
            px-6 py-3 rounded-lg shadow-lg
            animate-in slide-in-from-right duration-300
            max-w-sm cursor-pointer
            hover:opacity-90 transition-opacity
          `}
          onClick={() => removeToast(toast.id)}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{toast.message}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeToast(toast.id)
              }}
              className="ml-3 text-white/80 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ToastNotifications
