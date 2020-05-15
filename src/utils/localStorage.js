const MEETUPER_KEY = 'meetup_token';

export default {
    getToken() {
        return window.localStorage.getItem(MEETUPER_KEY);
    },
    setToken(newToken) {
        window.localStorage.setItem(MEETUPER_KEY, newToken);
    },
    removeToken() {
        window.localStorage.removeItem(MEETUPER_KEY);
    }
};
