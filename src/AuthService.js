import User from "./User";
import HTTPService from "./HTTPService";

export default class AuthService {
    static async login({loginUsername, loginPassword}) {
        HTTPService.request({
            method: 'POST',
            path: '/auth/local',
            body: {
                identifier: loginUsername,
                password: loginPassword,
            },
        }).then((data) => {
            if(data.jwt) User.jwtToken = data.jwt;
        });
    }
    static async register({registerUsername, registerEmail, registerPassword}) {
        HTTPService.request({
            method: 'POST',
            path: '/auth/local/register',
            body: {
                username: registerUsername,
                email: registerEmail,
                password: registerPassword,
            },
        }).then((data) => {
            if(data.jwt) User.jwtToken = data.jwt;
        });
    }
}
