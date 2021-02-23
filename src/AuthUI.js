import AuthService from "./AuthService";
import User from "./User";
import emitter from "./EventEmitter";

class AuthUI {
    constructor() {
        this.auth = document.getElementById('auth');

        this.loginForm = document.getElementById('loginForm');
        this.loginUsername = document.getElementById('loginUsername');
        this.loginPassword = document.getElementById('loginPassword');

        this.registerForm = document.getElementById('registerForm');
        this.registerUsername = document.getElementById('registerUsername');
        this.registerEmail = document.getElementById('registerEmail');
        this.registerPassword = document.getElementById('registerPassword');

        this.loginFormSubmit = this.loginFormSubmit.bind(this);
        this.registerFormSubmit = this.registerFormSubmit.bind(this);
        this.render = this.render.bind(this);

        this.registration = document.getElementById('registration');
        this.login = document.getElementById('login');

        this.loginBtn = document.getElementById('btn-login')
        this.regBtn = document.getElementById('btn-reg')
    }

    render() {
        console.log("User.jwtToken" + User.jwtToken)
        if (User.jwtToken) {
            this.registerForm.classList.add('hide');
            this.loginForm.classList.add('hide');
            this.auth.style.display = 'none'
            // this.authorized.classList.remove('hide');
        } else {
            this.loginForm.classList.remove('hide');
            // this.authorized.classList.add('hide');
        }


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
        this.registration.onclick = this.registrationClick;
        this.login.onclick = this.loginClick;

        this.loginBtn.onclick = this.loginClick
        this.regBtn.onclick = this.registrationClick
        emitter.subscribe('loggedIn', this.render)

    }

    registrationClick(e) {
        e.preventDefault();
        document.getElementById('auth').style.cssText = 'display: block'
        document.getElementById('loginForm').classList.add('hide');
        document.getElementById('registerForm').classList.remove('hide')
    }

    loginClick(e) {
        e.preventDefault()
        document.getElementById('auth').style.cssText = 'display: block'
        document.getElementById('registerForm').classList.add('hide')
        document.getElementById('loginForm').classList.remove('hide')
    }

}

export default new AuthUI();