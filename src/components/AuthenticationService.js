/**
 * Created by J00074Hunsle on 30/06/2017.
 */
import auth0 from 'auth0-js'
import EventEmitter from 'EventEmitter'

export default class AuthService {

  constructor () {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.setSession = this.setSession.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
  }

  auth0 = new auth0.WebAuth({
    domain: 'johnhunsley.eu.auth0.com',
    clientID: 'uU2uuuQR1JX2lJCvhuko33oAq5rZs6Ga',
    redirectUri: 'http://localhost:8081/callback',
    audience: 'http://localhost:8080/events',
    responseType: 'token id_token',
    scope: 'openid profile email phone'
  })

  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  login () {
    this.auth0.authorize()
  }

  handleAuthentication (router) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        // var jwtDecode = require('jwt-decode')
        // var decoded = jwtDecode(authResult.accessToken)
        // console.log(decoded)
        router.push('/client')
      } else if (err) {
        console.log(err)
      }
    })
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    this.authNotifier.emit('authChange', { authenticated: true })
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  getToken () {
    return localStorage.getItem('id_token')
  }
}
