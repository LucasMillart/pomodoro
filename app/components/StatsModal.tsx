'use client'

import { usePomodoroStore } from '../stores/pomodoroStore'

interface StatsModalProps {
  isOpen: boolean
  onClose: () => void
}

const StatsModal = ({ isOpen, onClose }: StatsModalProps) => {
  const { sessionsCompleted, settings } = usePomodoroStore()

  if (!isOpen) return null

  const totalFocusMinutes = sessionsCompleted * settings.focusDuration
  const hours = Math.floor(totalFocusMinutes / 60)
  const minutes = totalFocusMinutes % 60

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">📊 Statistics</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Sessions Completed */}
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">
                {sessionsCompleted}
              </div>
              <div className="text-sm text-red-700 font-medium">
                Sessions
              </div>
              <div className="text-xs text-red-500 mt-1">
                Completed
              </div>
            </div>
            
            {/* Focus Time */}
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {hours}h {minutes}m              </div>
              <div className="text-sm text-blue-700 font-medium">
                Focus Time
              </div>
              <div className="text-xs text-blue-500 mt-1">
                Total
              </div>
            </div>
          </div>
          
          {/* Progress Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Progress Overview</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Average session length:</span>
                <span className="font-medium">{settings.focusDuration} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Short break duration:</span>
                <span className="font-medium">{settings.shortBreakDuration} min</span>
              </div>
            </div>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </>
  )
}

export default StatsModal
