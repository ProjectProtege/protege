import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

firebase.initializeApp(config)

export const db = firebase.firestore()
export const storage = firebase.storage()