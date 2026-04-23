import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { useAuth } from './AuthContext'
import { db } from '../lib/firebase'
import {
  doc, collection, onSnapshot, setDoc, addDoc, getDoc,
} from 'firebase/firestore'

const CourseContext = createContext(null)

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export function CourseProvider({ children }) {
  const { user } = useAuth()
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [activityLog, setActivityLog] = useState([])
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    if (!user?.uid) {
      setEnrolledCourses([])
      setActivityLog([])
      setStreak(0)
      return
    }

    const uid = user.uid
    const userRef = doc(db, 'users', uid)
    const coursesRef = collection(db, 'users', uid, 'enrolledCourses')
    const activityRef = collection(db, 'users', uid, 'activityLog')

    // Real-time listener: enrolled courses
    const unsubCourses = onSnapshot(coursesRef, (snap) => {
      setEnrolledCourses(snap.docs.map((d) => ({ ...d.data(), id: d.id })))
    })

    // Real-time listener: activity log (sort client-side to avoid index requirement)
    const unsubActivity = onSnapshot(activityRef, (snap) => {
      const logs = snap.docs
        .map((d) => ({ ...d.data(), id: d.id }))
        .sort((a, b) => new Date(b.time) - new Date(a.time))
        .slice(0, 20)
      setActivityLog(logs)
    })

    // Streak: read → compute → write (with localStorage fallback)
    const handleStreak = async () => {
      const today = todayStr()
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
      const lsKey = `streak_${uid}`

      try {
        const snap = await getDoc(userRef)
        const data = snap.exists() ? snap.data() : {}
        const lastVisit = data.lastVisit || ''

        let count
        if (lastVisit === today) {
          count = Math.max(data.streak || 0, 1)
        } else if (lastVisit === yesterday) {
          count = (data.streak || 0) + 1
        } else {
          count = 1
        }

        await setDoc(userRef, { streak: count, lastVisit: today, email: user.email, uid }, { merge: true })
        localStorage.setItem(lsKey, JSON.stringify({ count, lastVisit: today }))
        setStreak(count)
      } catch {
        // Firestore unavailable — fall back to localStorage
        try {
          const raw = localStorage.getItem(lsKey)
          const data = raw ? JSON.parse(raw) : { count: 0, lastVisit: '' }
          const lastVisit = data.lastVisit || ''
          let count
          if (lastVisit === today) count = Math.max(data.count || 0, 1)
          else if (lastVisit === yesterday) count = (data.count || 0) + 1
          else count = 1
          if (lastVisit !== today) localStorage.setItem(lsKey, JSON.stringify({ count, lastVisit: today }))
          setStreak(count)
        } catch { setStreak(1) }
      }
    }

    handleStreak()

    return () => {
      unsubCourses()
      unsubActivity()
    }
  }, [user?.uid])

  const isEnrolled = (courseId) =>
    enrolledCourses.some((c) => String(c.id) === String(courseId))

  const enrollCourse = async (course) => {
    if (!user?.uid || isEnrolled(course.id)) return
    const uid = user.uid
    try {
      await setDoc(
        doc(db, 'users', uid, 'enrolledCourses', String(course.id)),
        { ...course, enrolledAt: new Date().toISOString(), progress: 0, completedLessons: 0 },
      )
      await addDoc(collection(db, 'users', uid, 'activityLog'), {
        action: 'Enrolled in course',
        detail: course.title,
        type: 'enroll',
        time: new Date().toISOString(),
      })
    } catch (err) {
      console.error('Failed to enroll course:', err)
      throw err
    }
  }

  const hoursLearned = useMemo(
    () => enrolledCourses.reduce(
      (sum, c) => sum + Math.round((parseInt(c.duration) || 0) * (c.progress || 0) / 100),
      0,
    ),
    [enrolledCourses],
  )

  const certificates = useMemo(
    () => enrolledCourses.filter((c) => c.progress >= 100).length,
    [enrolledCourses],
  )

  return (
    <CourseContext.Provider value={{
      enrolledCourses, isEnrolled, enrollCourse,
      activityLog, streak, hoursLearned, certificates,
    }}>
      {children}
    </CourseContext.Provider>
  )
}

export function useCourse() {
  return useContext(CourseContext)
}
