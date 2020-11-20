import config from '../config.js';
// import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    getAll,
    getToken,
    getUser,
    token
};

var token;

function getToken() {
    if (token && token.length > 0) {
        return token;
    } else {
        return 'Bearer ' + getUser().access_token
    }
}

function getUser() {
    var userJsonStr = sessionStorage.getItem('user');
    var user = JSON.parse(userJsonStr);
    return user
}

function login(username, pwd) {
    return new Promise((resolve, reject) => {
        sessionStorage.setItem('user', JSON.stringify(username));
        return resolve();
    });
}

function logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(response.ok, data)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}