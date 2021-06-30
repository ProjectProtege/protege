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

if (!firebase.apps.length) {
  firebase.initializeApp(config)
} else {
  firebase.app()
}

// eslint-disable-next-line prefer-destructuring
const analytics = firebase.analytics

export { analytics }

const app = firebase.app()
export const db = firebase.firestore()
export const storage = firebase.storage()
export const auth = firebase.auth()

// if (process.env.NODE_ENV === 'development') {
//   // eslint-disable-next-line no-console
//   console.info(
//     '%c testing locally -- hitting local firestore and auth emulators',
//     'color: #a974d9;'
//   )
//   db.useEmulator('localhost', 8080)
//   auth.useEmulator('http://localhost:9099/')
// }

if (app.name) {
  // eslint-disable-next-line no-console
  console.info('%c Firebase Mode Activated!', 'color: green')
} else {
  // eslint-disable-next-line no-console
  console.error('Firebase not working. Check firebase/firebase.js file.')
}
