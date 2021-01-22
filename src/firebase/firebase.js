import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

firebase.initializeApp(config)
firebase.analytics()

const app = firebase.app()
export const db = firebase.firestore()
export const storage = firebase.storage()
export const auth = firebase.auth()

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console.info(
    '%c testing locally -- hitting local firestore and auth emulators',
    'color: #a974d9;'
  )
  db.useEmulator('localhost', 8080)
  auth.useEmulator('http://localhost:9099/')
}

if (app.name) {
  // eslint-disable-next-line no-console
  console.info('%c Firebase Mode Activated!', 'color: green')
} else {
  // eslint-disable-next-line no-console
  console.error('Firebase not working. Check firebase/firebase.js file.')
}
