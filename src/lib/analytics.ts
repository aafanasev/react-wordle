import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyD1w0ATPH0CgN_PfNsrGC0xJozjByIFmYs',
  authDomain: 'wordle-9c4d8.firebaseapp.com',
  projectId: 'wordle-9c4d8',
  storageBucket: 'wordle-9c4d8.appspot.com',
  messagingSenderId: '285159166515',
  appId: '1:285159166515:web:aeb87fea02f2ca23bb0946',
  measurementId: 'G-M4KZDXWP95',
}
const firebaseApp = initializeApp(firebaseConfig)
const firebaseAnalytics = isSupported().then((yes) =>
  yes ? getAnalytics(firebaseApp) : null
)

export const log = (
  eventName: string,
  eventParams?: {
    [key: string]: any
  }
) => {
  firebaseAnalytics.then((analytics) => {
    if (analytics != null) {
      logEvent(analytics, eventName, eventParams)
    }
  })
}
