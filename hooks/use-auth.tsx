"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string | null
  email: string | null
  image: string | null
}

type AuthContextType = {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Simulate loading the user from localStorage on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
    setLoading(false)
  }, [])

  // Mock sign in function
  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const user = {
        id: "user_123",
        name: "Demo User",
        email: email,
        image: null,
      }

      setUser(user)
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user))
      }
    } catch (error) {
      console.error("Failed to sign in:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Mock sign up function
  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const user = {
        id: "user_" + Math.random().toString(36).substring(2, 9),
        name: name,
        email: email,
        image: null,
      }

      setUser(user)
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user))
      }
    } catch (error) {
      console.error("Failed to sign up:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Sign out function
  const signOut = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
