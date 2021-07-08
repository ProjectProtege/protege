const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey')

export const verifyIdToken = (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://protege-dev-env.firebaseio.com',
    })
  }
  return admin
    .auth()
    .verifyIdToken(token)
    .catch((err) => {
      throw err
    })
}
