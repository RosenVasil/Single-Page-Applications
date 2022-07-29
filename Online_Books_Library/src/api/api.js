import { clearUserData, getUserData, setUserData } from "../util.js";

const host = 'http://localhost:3030';

async function request(url, options) {
    try {
        const res = await fetch(host + url, options);

        if (res.ok == false) {
            if (res.status == 403) {
                clearUserData
            }
            const error = await res.json();
            throw new Error(error.message);
        }

        if (res.status == 204) {
            return res;
        } else {
            return res.json();
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();

    if(userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    return options;
}

export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function put(url, data) {
    return request(url, createOptions('put', data));
}

export async function del(url) {
    return request(url, createOptions('delete'));
}

export async function login(email, password) {
    const result = await post('/users/login', { email, password });

    const userData = {
        id: result._id,
        email: result.email,
        accessToken: result.accessToken
    };
    setUserData(userData);
    return result;
}

export async function register(email, password) {
    const result = await post('/users/register', { email, password });

    const userData = {
        id: result._id,
        email: result.email,
        accessToken: result.accessToken
    };
    setUserData(userData);
    return result;
}

export function logout() {
    get('/users/logout');
    clearUserData();
}