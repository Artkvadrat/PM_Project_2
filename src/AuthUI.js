import AuthService from "./AuthService";

class AuthUI {
    constructor() {
        this.loginForm = document.getElementById('loginForm');
        this.loginUsername = document.getElementById('loginUsername');
        this.loginPassword = document.getElementById('loginPassword');

        this.registerForm = document.getElementById('registerForm');
        this.registerUsername = document.getElementById('registerUsername');
        this.registerEmail = document.getElementById('registerEmail');
        this.registerPassword = document.getElementById('registerPassword');

        this.loginFormSubmit = this.loginFormSubmit.bind(this);
        this.registerFormSubmit = this.registerFormSubmit.bind(this);
    }

    loginFormSubmit(e) {
        e.preventDefault();
        AuthService.login({
            loginUsername: this.loginUsername.value,
            loginPassword: this.loginPassword.value
        })
    }

    registerFormSubmit(e) {
        e.preventDefault();
        AuthService.register({
            registerUsername: this.registerUsername.value,
            registerEmail: this.registerEmail.value,
            registerPassword: this.registerPassword.value
        })
    }

    registerListeners() {
        this.loginForm.addEventListener('submit', this.loginFormSubmit);
        this.registerForm.addEventListener('submit', this.registerFormSubmit);
    }
}

export default new AuthUI();
