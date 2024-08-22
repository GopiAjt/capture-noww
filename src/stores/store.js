//src/stores/store.js
import { createStore } from 'vuex';

const store = createStore({
    state: {
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('user')) || null, // Parse the user data from localStorage
        isLogedIn: !!localStorage.getItem('token'), // Initialize isLogedIn based on token presence
        photographers: [],
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            state.isLogedIn = true;
            localStorage.setItem('user', JSON.stringify(user)); // Store user as a JSON string in localStorage
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
        // Photographers mutations
        setPhotographers(state, photographers) {
            state.photographers = photographers;
        },
        addPhotographer(state, photographer) {
            state.photographers.push(photographer);
        },
        updatePhotographer(state, updatedPhotographer) {
            const index = state.photographers.findIndex(p => p.email === updatedPhotographer.email);
            if (index !== -1) {
                state.photographers[index] = updatedPhotographer;
            }
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
        isLogedIn: state => state.isLogedIn,
        allPhotographers: state => state.photographers,
        getPhotographerByEmail: state => email => state.photographers.find(p => p.email === email),
    }
});

export default store;
