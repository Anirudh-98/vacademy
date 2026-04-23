import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { syncUserProfile } from '../lib/userService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Ensure the user's document exists and update last visit
          await syncUserProfile(firebaseUser.uid, firebaseUser.email, firebaseUser.displayName);
        } catch (error) {
          console.error("Error syncing user profile:", error);
        }
      }
      setUser(firebaseUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])


  const logout = () => signOut(auth)

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
