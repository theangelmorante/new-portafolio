import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'
import { getAuth, Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Inicializar Firebase solo en el cliente
let app: FirebaseApp
let db: Firestore
let storage: FirebaseStorage
let auth: Auth

if (typeof window !== 'undefined') {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }
  
  db = getFirestore(app)
  storage = getStorage(app)
  auth = getAuth(app)
} else {
  // En el servidor, crear objetos dummy para satisfacer TypeScript
  // Estos nunca se usarán porque Firebase solo se usa en componentes 'use client'
  app = {} as FirebaseApp
  db = {} as Firestore
  storage = {} as FirebaseStorage
  auth = {} as Auth
}

export { db, storage, auth }
export default app
