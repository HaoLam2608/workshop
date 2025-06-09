'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface UserType {
  name: string | null
  id: string | null
  role: string | null
}

interface AuthContextType {
  user: UserType | null
  login: (userData: UserType) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedName = localStorage.getItem('hoten')
    const storedId = localStorage.getItem('userId')
    const storedRole = localStorage.getItem('vaitro')

    if (storedName && storedId && storedRole) {
      setUser({ name: storedName, id: storedId, role: storedRole })
    }

    setIsLoading(false)
  }, [])

  const login = (userData: UserType) => {
    localStorage.setItem('hoten', userData.name || '')
    localStorage.setItem('userId', userData.id || '')
    localStorage.setItem('vaitro', userData.role || '')
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('hoten')
    localStorage.removeItem('userId')
    localStorage.removeItem('vaitro')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
