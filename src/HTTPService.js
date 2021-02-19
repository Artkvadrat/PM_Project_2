import User from "./User";

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
                if(res.status >= 200 && res.status < 300) return res.json();
                else throw res
            })
            .catch(console.log)
    }
}
