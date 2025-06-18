'use client'

interface ModeTabsProps {
  currentMode: 'focus' | 'shortBreak' | 'longBreak'
  status: 'idle' | 'running' | 'paused'
  longBreakAvailable: number
  onModeChange: (mode: 'focus' | 'shortBreak' | 'longBreak') => void
  colors: {
    tabActive: string
  }
}

const ModeTabs = ({ 
  currentMode, 
  status, 
  longBreakAvailable, 
  onModeChange, 
  colors 
}: ModeTabsProps) => {
  const handleTabClick = (mode: 'focus' | 'shortBreak' | 'longBreak') => {
    if (status !== 'idle') return
    if (mode === 'longBreak' && longBreakAvailable === 0) return
    onModeChange(mode)
  }

  return (
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
            : longBreakAvailable === 0
            ? 'text-white/30 cursor-not-allowed'
            : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
        onClick={() => handleTabClick('longBreak')}
        disabled={status === 'running' || longBreakAvailable === 0}
      >
        Long Break
      </button>
    </div>
  )
}

export default ModeTabs
