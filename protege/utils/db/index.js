import admin from 'firebase-admin'
import serviceaccount from './serviceAccountKey.json'

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceaccount),
      databaseURL: 'https://protege-dev-env.firebaseio.com',
    })
  } catch (error) {
    console.error('Firebase admin initialization error', error.stack)
  }
}
