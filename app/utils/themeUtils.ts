// Utilitaire pour les couleurs du thème selon le mode
export const getThemeColors = (mode: 'focus' | 'shortBreak') => {
  switch (mode) {
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
