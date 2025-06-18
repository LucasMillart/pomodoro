'use client'

interface HeaderProps {
  onShowStats: () => void
  onShowSettings: () => void
  onToggleKeyboardHelp: () => void
}

const Header = ({ onShowStats, onShowSettings, onToggleKeyboardHelp }: HeaderProps) => {
  return (
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
          onClick={onShowStats}
        >
          📊 Report
        </button>
        <button 
          className="text-white/80 hover:text-white text-sm font-medium"
          onClick={onShowSettings}
        >
          ⚙️ Setting
        </button>
        <button 
          className="text-white/80 hover:text-white text-sm font-medium"
          onClick={onToggleKeyboardHelp}
          title="Keyboard shortcuts (?)"
        >
          ⌨️
        </button>
      </div>
    </header>
  )
}

export default Header
