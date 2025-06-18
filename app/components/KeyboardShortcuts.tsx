'use client'

interface KeyboardShortcutsProps {
  isVisible: boolean
}

const KeyboardShortcuts = ({ isVisible }: KeyboardShortcutsProps) => {
  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white rounded-lg p-4 text-xs z-30 backdrop-blur-sm">
      <h3 className="font-semibold mb-2">⌨️ Keyboard Shortcuts</h3>
      <div className="space-y-1 min-w-[200px]">
        <div className="flex justify-between">
          <span className="text-white/70">Start/Pause:</span>
          <kbd className="bg-white/20 px-2 py-1 rounded text-xs">Space</kbd>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Reset:</span>
          <kbd className="bg-white/20 px-2 py-1 rounded text-xs">R</kbd>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Settings:</span>
          <kbd className="bg-white/20 px-2 py-1 rounded text-xs">S</kbd>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Toggle Help:</span>
          <kbd className="bg-white/20 px-2 py-1 rounded text-xs">?</kbd>
        </div>
      </div>
    </div>
  )
}

export default KeyboardShortcuts
