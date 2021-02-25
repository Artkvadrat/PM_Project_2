import User from "./User";
import HTTPService from "./HTTPService";
import emitter from "./EventEmitter"

export default class AuthService {
    static async login({loginUsername, loginPassword}) {
        return HTTPService.request({
            method: 'POST',
            path: '/auth/local',
            body: {
                identifier: loginUsername,
                password: loginPassword,
            },
        }).then((data) => {
            User.jwtToken = data.jwt;
            User.username = data.user.username;
            emitter.emit('loggedIn');
        })
    }

    static async register({registerUsername, registerEmail, registerPassword}) {
        return HTTPService.request({
            method: 'POST',
            path: '/auth/local/register',
            body: {
                username: registerUsername,
                email: registerEmail,
                password: registerPassword,
            },
        }).then((data) => {
            User.jwtToken = data.jwt;
            User.username = data.user.username;
            emitter.emit('loggedIn');
        });
    }
}
