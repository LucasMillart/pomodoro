'use client'

import { useState } from 'react'
import { usePomodoroStore } from '../stores/pomodoroStore'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { settings, updateSettings } = usePomodoroStore()
  const [tempSettings, setTempSettings] = useState(settings)

  const handleSave = () => {
    updateSettings(tempSettings)
    onClose()
  }

  const handleReset = () => {
    setTempSettings(settings)
  }

  if (!isOpen) return null

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
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Settings Form */}
          <div className="space-y-6">
            {/* Timer Durations */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Timer Durations</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="focusDuration" className="block text-sm font-medium text-gray-600 mb-1">
                    Pomodoro (minutes)
                  </label>
                  <input
                    type="number"
                    id="focusDuration"
                    min="1"
                    max="60"
                    value={tempSettings.focusDuration}
                    onChange={(e) => setTempSettings({
                      ...tempSettings,
                      focusDuration: parseInt(e.target.value) || 25
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="shortBreakDuration" className="block text-sm font-medium text-gray-600 mb-1">
                    Short Break (minutes)
                  </label>
                  <input
                    type="number"
                    id="shortBreakDuration"                    min="1"                    max="30"
                    value={tempSettings.shortBreakDuration}
                    onChange={(e) => setTempSettings({
                      ...tempSettings,
                      shortBreakDuration: parseInt(e.target.value) || 5
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsModal
