import { createStore } from 'vuex';

const store = createStore({
    state: {
        token: null,
        user: null,
        isLogedIn: false
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            state.isLogedIn = true; // Update isLogedIn state when user is set
        },
        clearUser(state) {
            state.user = null;
            state.isLogedIn = false; // Update isLogedIn state when user is cleared
        },
        setToken(state, token) {
            state.token = token;
        },
        clearToken(state) {
            state.token = null;
        },
        setIsLogedIn(state, status) {
            state.isLogedIn = status;
        }
    },
    actions: {
        login({ commit }, { user, token }) {
            commit('setUser', user);
            commit('setToken', token);
            commit('setIsLogedIn', true); // Update isLogedIn state when login action is called
        },
        logout({ commit }) {
            commit('clearUser');
            commit('clearToken');
            commit('setIsLogedIn', false); // Update isLogedIn state when logout action is called
        }
    },
    getters: {
        isAuthenticated: state => !!state.user,
        user: state => state.user,
        token: state => state.token,
        isLogedIn: state => state.isLogedIn
    }
});

export default store;