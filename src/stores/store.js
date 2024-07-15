// store/index.js
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
        },
        clearUser(state) {
            state.user = null;
        }
    },
    actions: {
        login({ commit }, user) {
            commit('setUser', user);
        },
        logout({ commit }) {
            commit('clearUser');
        }
    },
    getters: {
        isAuthenticated: state => !!state.user,
        user: state => state.user
    }
});

export default store;