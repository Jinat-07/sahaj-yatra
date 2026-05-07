import { User } from './types'

const STORAGE_KEY = 'sahaj_yatra_user'

export interface AuthState {
  user: User | null
  isLoading: boolean
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, phone: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: () => boolean
}

// Load user from localStorage (client-side only)
export const loadUserFromStorage = (): User | null => {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

// Save user to localStorage (client-side only)
export const saveUserToStorage = (user: User): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

// Remove user from localStorage (client-side only)
export const removeUserFromStorage = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

// Simple validation functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 6
}
