import { createStore } from 'vuex';

const store = createStore({
    state: {
        token: localStorage.getItem('token') || '',
        user: localStorage.getItem('user') || '',
        isLogedIn: !!localStorage.getItem('token') // Initialize isLogedIn based on token presence
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            state.isLogedIn = true;
            localStorage.setItem('user', user); // Store user in localStorage
        },
        clearUser(state) {
            state.user = null;
            state.isLogedIn = false;
            localStorage.removeItem('user'); // Remove user from localStorage
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token); // Store token in localStorage
        },
        clearToken(state) {
            state.token = null;
            localStorage.removeItem('token'); // Remove token from localStorage
        },
        setIsLogedIn(state, status) {
            state.isLogedIn = status;
        },
    },
    actions: {
        login({ commit }, { user, token }) {
            commit('setUser', user);
            commit('setToken', token);
            commit('setIsLogedIn', true);
        },
        logout({ commit }) {
            commit('clearUser');
            commit('clearToken');
            commit('setIsLogedIn', false);
        },
    },
    getters: {
        isAuthenticated: state => !!state.token && !!state.user,
        user: state => state.user,
        token: state => state.token,
        isLogedIn: state => state.isLogedIn
    }
});

export default store;
