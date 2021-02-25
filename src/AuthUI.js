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

        this.registration = document.getElementById('registration');
        this.login = document.getElementById('login');

        this.btnRight = document.getElementById('btn-right')
        this.loginBtn = document.getElementById('btn-login')
        this.regBtn = document.getElementById('btn-reg')

        this.userName = document.getElementById('user-name')

        this.loginFormSubmit = this.loginFormSubmit.bind(this);
        this.registerFormSubmit = this.registerFormSubmit.bind(this);
        this.render = this.render.bind(this);
    }

    render() {
        if (User.jwtToken) {
            this.registerForm.classList.add('hide');
            this.loginForm.classList.add('hide');
            this.auth.style.display = 'none';
            this.showName(User.username)
        } else {
            this.loginForm.classList.remove('hide');
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

        this.loginBtn.onclick = this.loginClick;
        this.regBtn.onclick = this.registrationClick;

        emitter.subscribe('loggedIn', this.render);

        if (User.jwtToken) {
            emitter.emit('loggedIn');
        }
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

    showName(name) {
        this.btnRight.classList.add('hide')
        this.userName.style.display = 'block'
        this.userName.innerHTML = `<p class="name">Hello, ${name}</p>`
    }
}

export default new AuthUI();
