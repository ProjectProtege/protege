import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
}

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(config)
  firebase.analytics()
} else {
  firebase.app()
}

export const db = firebase.firestore()
export const storage = firebase.storage()
export const auth = firebase.auth()
