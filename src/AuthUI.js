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

        this.btnRight = document.getElementById('loginButtonsContainer')
        this.loginBtn = document.getElementById('loginButton')
        this.regBtn = document.getElementById('registrationButton')

        this.userName = document.getElementById('userName')

        this.loginFormSubmit = this.loginFormSubmit.bind(this);
        this.registerFormSubmit = this.registerFormSubmit.bind(this);
        this.registrationClick = this.registrationClick.bind(this);
        this.loginClick = this.loginClick.bind(this);
        this.showName = this.showName.bind(this);
        this.logout = this.logout.bind(this);
        this.render = this.render.bind(this);
    }

    render() {
        if (User.jwtToken) {
            this.registerForm.classList.add('hide');
            this.loginForm.classList.add('hide');
            this.auth.style.display = 'none';
            this.showName();
        } else {
            this.showName();
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

    loginClick(e) {
        e.preventDefault()
        this.auth.style.cssText = 'display: block'
        this.registerForm.classList.add('hide')
        this.loginForm.classList.remove('hide')
    }

    registerFormSubmit(e) {
        e.preventDefault();
        AuthService.register({
            registerUsername: this.registerUsername.value,
            registerEmail: this.registerEmail.value,
            registerPassword: this.registerPassword.value
        })
    }

    registrationClick(e) {
        e.preventDefault();
        this.auth.style.cssText = 'display: block'
        this.loginForm.classList.add('hide');
        this.registerForm.classList.remove('hide')
    }

    logout() {
        User.clearLocalStorage();
        emitter.emit('unauthorised');
    }

    showName() {
        if (User.username) {
            this.btnRight.classList.add('hide')
            this.userName.style.display = 'flex';
            this.userName.innerHTML = `<p class="name">Hello, ${User.username}</p><button id="logoutButton">Logout</button>`;
            document.getElementById('logoutButton').addEventListener('click', this.logout);
        } else {
            this.btnRight.classList.remove('hide');
            this.userName.style.display = 'none';
        }
    }

    registerListeners() {
        this.loginForm.addEventListener('submit', this.loginFormSubmit);
        this.registerForm.addEventListener('submit', this.registerFormSubmit);
        this.registration.onclick = this.registrationClick;
        this.login.onclick = this.loginClick;

        this.loginBtn.onclick = this.loginClick;
        this.regBtn.onclick = this.registrationClick;

        emitter.subscribe('loggedIn', this.render);
        emitter.subscribe('unauthorised', this.render);

        if (User.jwtToken) {
            emitter.emit('loggedIn');
        }
    }
}

export default new AuthUI();
