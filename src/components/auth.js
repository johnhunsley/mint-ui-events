export default {

  getToken () {
    return localStorage.token
  },
  loggedIn () {
    return !!this.getCookieToken()
  },
  login (token) {
    localStorage.token = token
  },
  logout () {
    delete localStorage.token
  },
  getCookieToken () {
    console.log(document.cookie)
    return document.cookie
  }
}
