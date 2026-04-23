import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { useAuth } from './AuthContext'
import { db } from '../lib/firebase'
import { doc, collection, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore'
import { liveClasses } from '../data/liveClasses'

const LiveClassContext = createContext(null)

export function LiveClassProvider({ children }) {
  const { user } = useAuth()
  const [registrations, setRegistrations] = useState({})

  useEffect(() => {
    if (!user?.uid) {
      setRegistrations({})
      return
    }

    const regRef = collection(db, 'users', user.uid, 'liveRegistrations')

    const unsub = onSnapshot(regRef, (snap) => {
      const regs = {}
      snap.docs.forEach((d) => { regs[d.id] = d.data() })
      setRegistrations(regs)
    })

    return unsub
  }, [user?.uid])

  const isRegistered = (classId) => Boolean(registrations[String(classId)])

  const registerForClass = async (classId, { name, email }) => {
    if (!user?.uid) return
    try {
      await setDoc(
        doc(db, 'users', user.uid, 'liveRegistrations', String(classId)),
        { classId: String(classId), name, email, registeredAt: new Date().toISOString() },
      )
    } catch (err) {
      console.error('Failed to register for class:', err)
      throw err
    }
  }

  const unregisterFromClass = async (classId) => {
    if (!user?.uid) return
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'liveRegistrations', String(classId)))
    } catch (err) {
      console.error('Failed to unregister from class:', err)
      throw err
    }
  }

  const registeredClasses = useMemo(
    () => liveClasses.filter((c) => Boolean(registrations[String(c.id)])),
    [registrations],
  )

  return (
    <LiveClassContext.Provider value={{
      registrations, isRegistered, registerForClass, unregisterFromClass, registeredClasses,
    }}>
      {children}
    </LiveClassContext.Provider>
  )
}

export function useLiveClass() {
  return useContext(LiveClassContext)
}
