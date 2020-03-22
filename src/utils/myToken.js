const TOKEN_KEY = 'heimamm';

export function setToken(value) {
    window.localStorage.setItem(TOKEN_KEY, value);
}

export function getToken() {
    return window.localStorage.getItem(TOKEN_KEY);
}

export function deleteToken() {
    window.localStorage.removeItem(TOKEN_KEY)
}