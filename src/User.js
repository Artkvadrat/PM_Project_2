export default class User {
    static get jwtToken() {
        return window.localStorage.getItem('jwtToken')
    }

    static set jwtToken(value) {
        window.localStorage.setItem('jwtToken', value);
    }
}
