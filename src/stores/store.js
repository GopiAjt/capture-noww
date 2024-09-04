import { createStore } from 'vuex';

const store = createStore({
    state: {
        token: localStorage.getItem('token') || '',
        user: (() => {
            try {
                return JSON.parse(localStorage.getItem('user'));
            } catch (e) {
                console.error('Error parsing user data from localStorage:', e);
                return null;
            }
        })(),
        isLogedIn: !!localStorage.getItem('token'),
        photographers: [], // Stores the list of photographers
        photographersPage: 0, // Stores the current page number
        photographersPageSize: 10, // Stores the page size
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            state.isLogedIn = true;
            localStorage.setItem('user', JSON.stringify(user));
        },
        clearUser(state) {
            state.user = null;
            state.isLogedIn = false;
            localStorage.removeItem('user');
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        clearToken(state) {
            state.token = null;
            localStorage.removeItem('token');
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
        // New mutations for pagination state
        setPhotographersPage(state, page) {
            state.photographersPage = page;
        },
        setPhotographersPageSize(state, pageSize) {
            state.photographersPageSize = pageSize;
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
        photographersPage: state => state.photographersPage, // Getter for current page
        photographersPageSize: state => state.photographersPageSize, // Getter for page size
        getPhotographerByEmail: state => email => state.photographers.find(p => p.email === email),
    }
});

export default store;