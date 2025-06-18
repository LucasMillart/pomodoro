'use client'

import { formatTime } from '../../utils/timeUtils'

interface TimerDisplayProps {
  timeLeft: number
  status: 'idle' | 'running' | 'paused'
  onToggle: () => void
  colors: {
    button: string
    buttonActive: string
  }
}

const TimerDisplay = ({ timeLeft, status, onToggle, colors }: TimerDisplayProps) => {
  return (
    <div className="text-center mb-8">
      <div className="text-8xl md:text-9xl font-bold text-white mb-6 font-mono tracking-tight">
        {formatTime(timeLeft)}
      </div>
      
      <button 
        className={`
          px-12 py-4 rounded-lg text-xl font-bold uppercase tracking-wide
          transition-all duration-200 transform hover:scale-105
          shadow-lg hover:shadow-xl
          ${status === 'running' ? colors.buttonActive : colors.button}
        `}
        onClick={onToggle}
      >
        {status === 'running' ? 'PAUSE' : 'START'}
      </button>
    </div>
  )
}

export default TimerDisplay
