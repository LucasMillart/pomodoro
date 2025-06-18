'use client'

interface StatsFooterProps {
  sessionsCompleted: number
  focusTimeMinutes: number
  longBreakCredit: number
  currentMode: 'focus' | 'shortBreak' | 'longBreak'
}

const StatsFooter = ({ 
  sessionsCompleted, 
  focusTimeMinutes, 
  longBreakCredit, 
  currentMode 
}: StatsFooterProps) => {
  const hours = Math.floor(focusTimeMinutes / 60)
  const minutes = focusTimeMinutes % 60

  return (
    <footer className="p-6">
      <div className="flex justify-center items-center gap-8 text-white/80 text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{sessionsCompleted}</div>
          <div>Sessions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            {hours}h {minutes}m
          </div>
          <div>Focus Time</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{longBreakCredit}m</div>
          <div>Credit</div>
        </div>
      </div>
      
      {/* Info contextuelle */}
      {longBreakCredit > 0 && currentMode !== 'longBreak' && (
        <div className="text-center mt-4 text-white/60 text-xs">
          💡 You have {longBreakCredit} minutes of long break credit available
        </div>
      )}
      
      {currentMode === 'longBreak' && (
        <div className="text-center mt-4 text-white/60 text-xs">
          🎉 Enjoying your long break! {longBreakCredit} minutes remaining
        </div>
      )}
    </footer>
  )
}

export default StatsFooter
