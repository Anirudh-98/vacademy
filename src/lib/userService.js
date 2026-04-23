import { db } from './firebase';
import { 
  doc, 
  setDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  serverTimestamp, 
  getDoc 
} from 'firebase/firestore';

/**
 * Ensures the user profile exists in Firestore and updates the last visit time.
 */
export const syncUserProfile = async (uid, email, displayName) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid,
      email,
      displayName: displayName || '',
      bio: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      twitter: '',
      streak: 0,
      lastVisit: serverTimestamp(),
      joinedAt: serverTimestamp()
    });
    return true; // Indicates a new user was created
  } else {
    await updateDoc(userRef, {
      lastVisit: serverTimestamp()
    });
    return false; // User already existed
  }
};

/**
 * Updates specific fields on the user profile.
 */
export const updateUserProfile = async (uid, data) => {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, data, { merge: true });
};

/**
 * Enrolls a student into a course.
 * course: The course object containing an 'id' property.
 */
export const enrollInCourse = async (uid, course) => {
  const courseRef = doc(db, 'users', uid, 'enrolledCourses', course.id);
  await setDoc(courseRef, {
    ...course,
    enrolledAt: serverTimestamp(),
    progress: 0,
    completedLessons: []
  });
};

/**
 * Logs a specific user activity.
 */
export const logActivity = async (uid, action, detail, type) => {
  const logRef = collection(db, 'users', uid, 'activityLog');
  await addDoc(logRef, {
    action,
    detail,
    type,
    time: serverTimestamp()
  });
};

/**
 * Registers a user for a live class.
 */
export const registerForLiveClass = async (uid, classId, name, email) => {
  const classRef = doc(db, 'users', uid, 'liveRegistrations', classId);
  await setDoc(classRef, {
    classId,
    name,
    email,
    registeredAt: serverTimestamp()
  });
};

/**
 * Enrolls a user in a learning path.
 */
export const enrollInLearningPath = async (uid, pathId) => {
  const pathRef = doc(db, 'users', uid, 'learningPaths', pathId);
  await setDoc(pathRef, {
    enrolledAt: serverTimestamp(),
    currentStep: 1
  });
};
