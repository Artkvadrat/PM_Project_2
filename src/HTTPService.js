import User from "./User";
import emitter from './EventEmitter';

const END_POINT = 'https://radiant-temple-07706.herokuapp.com';

export default class HTTPService {
    static async request({method = 'GET', path, body}) {
        const url = `${END_POINT}${path}`;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(User.jwtToken && { Authorization: `Bearer ${User.jwtToken}` }),
            },
            ...(body && { body: JSON.stringify(body) }),
        };

        return fetch(url, options)
            .then((res) => {
                if([401,403].includes(res.status)) {
                    User.clearLocalStorage();
                    emitter.emit('unauthorised');
                    throw new Error('Unauthorised');
                }

                return res.json();
            })
            .catch(console.log)
    }
}
