const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey')

export const verifyIdToken = async (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://protege-dev-env.firebaseio.com',
    })
  }
  try {
    await admin.auth().verifyIdToken(token)
  } catch (err) {
    // if the token is expired, don't throw an error, it will be refreshed in AuthContext
    if (err.errorInfo.code !== 'auth/id-token-expired') {
      throw err
    }
  }
}
