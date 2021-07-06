import firebase from 'firebase/app'
import 'firebaseui/dist/firebaseui.css'
import { useEffect } from 'react'

async function githubLogin() {
  const firebaseui = await import('firebaseui')
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.GithubAuthProvider.PROVIDER_ID,
      },
    ],
  }
  if (firebaseui.auth.AuthUI.getInstance()) {
    const ui = firebaseui.auth.AuthUI.getInstance()
    ui.start('#firebaseui-auth-container', uiConfig)
  } else {
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
  }
}

const GitHubSignInButton = () => {
  useEffect(() => {
    githubLogin()
  })

  return <div id='firebaseui-auth-container' />
}

export default GitHubSignInButton
