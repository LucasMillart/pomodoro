import { createClient } from '@/utils/supabase/client'
import { TimerMode } from '../stores/pomodoroStore'

// Interface pour les sessions
export interface Session {
  id: string
  user_id: string
  start_time: string
  end_time: string | null
  duration: number
  type: 'pomodoro' | 'short_break' | 'long_break'
  completed: boolean
  task_description?: string
  created_at: string
  updated_at: string
}

// Convertir TimerMode en type de session
const modeToSessionType = (mode: TimerMode): 'pomodoro' | 'short_break' => {
  return mode === 'focus' ? 'pomodoro' : 'short_break'
}

// Créer une nouvelle session
export const createSession = async (
  mode: TimerMode,
  taskDescription?: string
): Promise<Session | null> => {
  const supabase = createClient()
  
  // Vérifier si l'utilisateur est connecté
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  
  const { data, error } = await supabase
    .from('sessions')
    .insert({
      user_id: user.id,
      type: modeToSessionType(mode),
      task_description: taskDescription || null
    })
    .select('*')
    .single()
    
  if (error) {
    console.error('Error creating session:', error)
    return null
  }
  
  return data as Session
}

// Compléter une session existante
export const completeSession = async (
  sessionId: string,
  duration: number
) => {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('sessions')
    .update({
      end_time: new Date().toISOString(),
      duration,
      completed: true
    })
    .eq('id', sessionId)
    .select()
    .single()
    
  if (error) {
    console.error('Error completing session:', error)
    return null
  }
  
  return data as Session
}

// Obtenir l'historique des sessions d'un utilisateur
export const getUserSessions = async (limit = 10) => {
  const supabase = createClient()
  
  // Vérifier si l'utilisateur est connecté
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
  
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit)
    
  if (error) {
    console.error('Error fetching sessions:', error)
    return []
  }
  
  return data as Session[]
}

// Obtenir des statistiques des sessions
export const getUserStats = async () => {
  const supabase = createClient()
  
  // Vérifier si l'utilisateur est connecté
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  
  // Obtenir le total des sessions et le temps total
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', user.id)
    .eq('completed', true)
    
  if (error) {
    console.error('Error fetching stats:', error)
    return null
  }
  
  const sessions = data as Session[]
  const totalSessions = sessions.length
  const totalFocusTime = sessions
    .filter(s => s.type === 'pomodoro')
    .reduce((sum, s) => sum + s.duration, 0)
  
  return {
    totalSessions,
    totalFocusTime, // en secondes
    totalFocusTimeHours: Math.floor(totalFocusTime / 3600)
  }
}
