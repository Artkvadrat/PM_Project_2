export default class User {
    static get jwtToken() {
        return window.localStorage.getItem('jwtToken')
    }

    static set jwtToken(value) {
        window.localStorage.setItem('jwtToken', value);
    }

    static get username() {
        return window.localStorage.getItem('username')
    }

    static set username(value) {
        return window.localStorage.setItem('username', value)
    }
}
