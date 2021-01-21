/* eslint-disable no-console */
import admin from 'firebase-admin'
import serviceAccountKey from './serviceAccountKey'

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey),
      databaseURL: 'https://protege-dev-env.firebaseio.com',
    })
  } catch (error) {
    console.error('Firebase admin initialization error', error.stack)
  }
}

export default admin.firestore()
