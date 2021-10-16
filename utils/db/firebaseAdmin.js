const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey')

export const verifyIdToken = (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FB_DATABASE_URL,
    })
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch((err) => {
      throw err
    })
}
