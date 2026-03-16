import { createStore } from 'vuex';

const store = createStore({
    state: {
        token: localStorage.getItem('token') || '',
        refreshToken: localStorage.getItem('refreshToken') || '',
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
        totalPhotographers: 0, // Stores the total number of photographers
        selectedCategory: '', // Stores the currently selected category for filtering
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
        setRefreshToken(state, refreshToken) {
            state.refreshToken = refreshToken;
            localStorage.setItem('refreshToken', refreshToken);
        },
        clearRefreshToken(state) {
            state.refreshToken = null;
            localStorage.removeItem('refreshToken');
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
        setTotalPhotographers(state, total) {
            state.totalPhotographers = total;
        },
        setSelectedCategory(state, category) {
            state.selectedCategory = category;
        },
    },
    actions: {
        login({ commit }, { user, token, refreshToken }) {
            commit('setUser', user);
            commit('setToken', token);
            commit('setRefreshToken', refreshToken);
            commit('setIsLogedIn', true);
        },
        logout({ commit }) {
            commit('clearUser');
            commit('clearToken');
            commit('clearRefreshToken');
            commit('setIsLogedIn', false);
        },
    },
    getters: {
        isAuthenticated: state => !!state.token && !!state.user,
        user: state => state.user,
        token: state => state.token,
        refreshToken: state => state.refreshToken,
        isLogedIn: state => state.isLogedIn,
        allPhotographers: state => state.photographers,
        photographersPage: state => state.photographersPage, // Getter for current page
        photographersPageSize: state => state.photographersPageSize, // Getter for page size
        totalPhotographers: state => state.totalPhotographers,
        selectedCategory: state => state.selectedCategory,
        getPhotographerByEmail: state => email => state.photographers.find(p => p.email === email),
    }
});

export default store;