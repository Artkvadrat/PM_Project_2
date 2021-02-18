export default class User {
    static get jwtToken() {
        const token = window.localStorage.getItem('jwtToken')
        return token === "undefined" || token === "" ? undefined : token
    }

    static set jwtToken(value) {
        window.localStorage.setItem('jwtToken', value);
    }
}
