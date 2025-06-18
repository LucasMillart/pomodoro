/**
 * Utilitaires pour la gestion du temps dans l'application Pomodoro
 */

/**
 * Formate un temps en secondes vers le format MM:SS
 * @param seconds - Nombre de secondes
 * @returns String formatée "MM:SS"
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

/**
 * Convertit des minutes en secondes
 * @param minutes - Nombre de minutes
 * @returns Nombre de secondes
 */
export function minutesToSeconds(minutes: number): number {
  return minutes * 60
}

/**
 * Convertit des secondes en minutes (arrondi à l'entier inférieur)
 * @param seconds - Nombre de secondes
 * @returns Nombre de minutes
 */
export function secondsToMinutes(seconds: number): number {
  return Math.floor(seconds / 60)
}

/**
 * Formate une durée en secondes vers un format lisible (ex: "25 min", "1h 30min")
 * @param seconds - Nombre de secondes
 * @returns String formatée
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (hours > 0) {
    return remainingMinutes > 0 
      ? `${hours}h ${remainingMinutes}min`
      : `${hours}h`
  }
  
  return `${minutes}min`
}

/**
 * Calcule le pourcentage d'avancement d'une session
 * @param timeLeft - Temps restant en secondes
 * @param totalDuration - Durée totale en secondes
 * @returns Pourcentage d'avancement (0-100)
 */
export function calculateProgress(timeLeft: number, totalDuration: number): number {
  const elapsed = totalDuration - timeLeft
  return Math.round((elapsed / totalDuration) * 100)
}
